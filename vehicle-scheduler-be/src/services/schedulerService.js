const api = require("../config/axiosConfig");
const Log = require("../../../logging-middleware");
const knapsack = require("../utils/knapsack");

/**
 * Fetch all depots
 */
exports.getDepots = async () => {
    try {

        await Log(
            "backend",
            "info",
            "service",
            "Fetching depots"
        );

        const response = await api.get("/depots");

        await Log(
            "backend",
            "info",
            "service",
            "Depots fetched successfully"
        );

        return response.data;

    } catch (err) {

        await Log(
            "backend",
            "error",
            "service",
            err.message
        );

        throw err;
    }
};


/**
 * Fetch all vehicles
 */
exports.getVehicles = async () => {
    try {

        await Log(
            "backend",
            "info",
            "service",
            "Fetching vehicles"
        );

        const response = await api.get("/vehicles");

        await Log(
            "backend",
            "info",
            "service",
            "Vehicles fetched successfully"
        );

        return response.data;

    } catch (err) {

        await Log(
            "backend",
            "error",
            "service",
            err.message
        );

        throw err;
    }
};


/**
 * Generate optimal maintenance schedule
 */
exports.generateSchedule = async (depotId) => {

    try {

        await Log(
            "backend",
            "info",
            "service",
            `Generating schedule for depot ${depotId}`
        );

        const depotResponse = await api.get("/depots");
        const vehicleResponse = await api.get("/vehicles");

        const depots = depotResponse.data.depots;
        const vehicles = vehicleResponse.data.vehicles;

        const depot = depots.find(d => d.ID == depotId);

        if (!depot) {

            await Log(
                "backend",
                "error",
                "service",
                "Depot not found"
            );

            throw new Error("Depot not found");
        }

        const result = knapsack(
            vehicles,
            depot.MechanicHours
        );

        await Log(
            "backend",
            "info",
            "service",
            `Optimal schedule generated for depot ${depotId}`
        );

        return {
            depotId: depot.ID,
            mechanicHours: depot.MechanicHours,
            totalImpact: result.totalImpact,
            selectedVehicles: result.selectedVehicles
        };

    } catch (err) {

        await Log(
            "backend",
            "error",
            "service",
            err.message
        );

        throw err;
    }
};