
const {
    STACK,
    LEVELS,
    PACKAGES
} = require("./constants");

const LOG_URL = "http://4.224.186.213/evaluation-service/logs";

async function Log(stack, level, pkg, message) {

    try {

        if (stack !== STACK) {
            throw new Error("Invalid Stack");
        }

        if (!LEVELS.includes(level)) {
            throw new Error("Invalid Log Level");
        }

        if (!PACKAGES.includes(pkg)) {
            throw new Error("Invalid Package");
        }

        const response = await fetch(LOG_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                stack,
                level,
                package: pkg,
                message
            })
        });

        return await response.json();

    } catch (err) {
        console.error("Logging Failed:", err.message);
    }
}

module.exports = Log;