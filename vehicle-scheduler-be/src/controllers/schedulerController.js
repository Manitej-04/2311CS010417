const schedulerService = require("../services/schedulerService");

exports.getDepots = async (req, res) => {
    try {

        const depots = await schedulerService.getDepots();

        res.status(200).json({
            success: true,
            data: depots
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.getVehicles = async (req, res) => {
    try {

        const vehicles = await schedulerService.getVehicles();

        res.status(200).json({
            success: true,
            data: vehicles
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.schedule = async (req, res) => {
    try {

        const depotId = req.params.depotId;

        const schedule = await schedulerService.generateSchedule(depotId);

        res.status(200).json({
            success: true,
            data: schedule
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};