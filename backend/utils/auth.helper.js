const Host = require('../models/host.model');
const Volunteer = require('../models/Volunteer.model');

const getLoginData = async (user) => {
    let redirectTo = "";
    if (user.role === "host") {
        const host = await Host.findOne({ where: { userId: user.id } });
        redirectTo = host ? "/host/dashboard" : "/host/addInfoPage";
    } else {
        const volunteer = await Volunteer.findOne({ where: { userId: user.id } });
        redirectTo = volunteer ? "/volunteer/dashboard" : "/volunteer/addInfoPage";
    }
    return { redirectTo };
};

module.exports = { getLoginData };