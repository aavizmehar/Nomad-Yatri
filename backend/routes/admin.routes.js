const { Router } = require('express');
const { verifyJWT, authorizeRoles } = require('../middleware/auth.middleware');
const { 
   getAdminStats,
    getAllUsers,
    getAllProgramsAdmin,
    toggleProgramVisibility,
    adminDeleteUser
} = require('../controllers/admin.controller');

const router = Router();

// Secure all routes
router.use(verifyJWT);
router.use(authorizeRoles('admin'));

// Routes
router.route("/dashboard-stats").get(getAdminStats);
router.route("/users").get(getAllUsers);
router.route("/users/:id").delete(adminDeleteUser);
router.route("/programs").get(getAllProgramsAdmin);
router.route("/programs/:programId/toggle").patch(toggleProgramVisibility);

module.exports = router;