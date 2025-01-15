const express = require("express");
const router = express.Router();

router.get("/parameter", (req, res) => {
    const parameter = req.query.foo;
    
    if (!parameter) {
        return res.status(400).json({
            status: 400,
            message: "Please provide the 'foo' parameter. It should be equal to bar as an example." 
        });
    }

    if (parameter !== "bar") {
        return res.status(404).json({
            status: 404,
            message: `This ain't a foo bar, this a foo ${parameter}`,
        });
    }

    return res.status(200).json({
        status: 200,
        message: "Yes yes, foo bar.",
    });
});

router.get("/ip", (req, res) => {
    try {
        // Extract the real IP address
        const realIp =
            req.headers['cf-connecting-ip'] ||
            req.headers['x-real-ip'] ||
            req.headers['x-forwarded-for']?.split(',')[0] ||
            req.ip;

        // If no IP is found (extremely rare), throw an error
        if (!realIp) {
            throw new Error("Unable to determine the client's IP address.");
        }

        // Return the IP address
        res.status(200).json({
            status: 200,
            ip: realIp,
        });
    } catch (error) {
        // Catch any errors and respond with a 500 status
        res.status(500).json({
            status: 500,
            error: error.message || "An unexpected error occurred.",
        });
    }
});

router.get("/ua", (req, res) => {
    try {
        const userAgent = req.headers['user-agent'];

        if (!userAgent) {
            throw new Error("Unable to get UA.")
        }

        res.status(200).json({
            status: 200,
            userAgent,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            error: error.message || "Unknown error occured (you're probably a bot)",
        });
    }
});

router.get("/lang", (req, res) => {
    const acceptLang = req.headers['accept-language'];

    if (!acceptLang) {
        return res.status(400).json({
            status: 400,
            error: "No accept-language header was found.",
        });
    }

    res.status(200).json({
        status: 200,
        acceptLang,
    });
});

module.exports = router;