const User = require('../models/User.model');
const Host = require('../models/Host.model');
const Volunteer = require('../models/Volunteer.model');
const Program = require('../models/Program.model');
const Application = require('../models/Application.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require("../utils/asyncHandler");

// 1. Get Summary Stats (Overview)
const getAdminStats = asyncHandler(async (req, res) => {
    const counts = await Promise.all([
        User.count(),
        Host.count(),
        Volunteer.count(),
        Program.count(),
        Application.count()
    ]);

    return res.status(200).json(
        new ApiResponse(200, {
            totalUsers: counts[0],
            totalHosts: counts[1],
            totalVolunteers: counts[2],
            totalPrograms: counts[3],
            totalApplications: counts[4]
        }, "Stats fetched successfully")
    );
});

// 2. Get All Users with Profiles
const getAllUsers = asyncHandler(async (req, res) => {
    const { role, sortBy = 'createdAt', order = 'DESC' } = req.query;
    
    const where = {};
    if (role && role !== 'all') {
        where.role = role;
    }

    const users = await User.findAll({
        where,
        order: [[sortBy, order.toUpperCase()]],
        attributes: { exclude: ['password', 'refreshToken'] },
        include: [
            { model: Host, attributes: ['propertyName', 'location', 'contact'] },
            { model: Volunteer, attributes: ['name', 'contact'] }
        ]
    });
    return res.status(200).json(new ApiResponse(200, users, "Users and profiles fetched"));
});

// 3. Get All Programs (Including Host details)
const getAllProgramsAdmin = asyncHandler(async (req, res) => {
    const { sortBy = 'createdAt', order = 'DESC' } = req.query;

    const programs = await Program.findAll({
        order: [[sortBy, order.toUpperCase()]],
        include: {
            model: Host,
            attributes: ['propertyName', 'contact']
        }
    });
    return res.status(200).json(new ApiResponse(200, programs, "All programs fetched"));
});

// 4. Manage Access: Disable/Enable Program
const toggleProgramVisibility = asyncHandler(async (req, res) => {
    const { programId } = req.params;
    const program = await Program.findByPk(programId);

    if (!program) throw new ApiError(404, "Program not found");

    program.isActive = !program.isActive;
    await program.save();

    return res.status(200).json(
        new ApiResponse(200, program, `Program visibility set to: ${program.isActive}`)
    );
});

// 5. Delete a User (Cascades to Host/Volunteer/Applications)
const adminDeleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) throw new ApiError(404, "User not found");

    await user.destroy(); 
    return res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
});

// 6. Delete a Program
const adminDeleteProgram = asyncHandler(async (req, res) => {
    const { programId } = req.params;
    const program = await Program.findByPk(programId);
    if (!program) throw new ApiError(404, "Program not found");

    await program.destroy();
    return res.status(200).json(new ApiResponse(200, null, "Program deleted successfully"));
});

module.exports = {
    getAdminStats,
    getAllUsers,
    getAllProgramsAdmin,
    toggleProgramVisibility,
    adminDeleteUser,
    adminDeleteProgram
};