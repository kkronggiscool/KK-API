const { resolveInclude } = require("ejs");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("api");
});

router.get("/date", (req, res) => {
    try {
        const now = new Date();

        const formattedDate = new Intl.DateTimeFormat('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
        }).format(now);

        res.status(200).json({
            status: 200,
            message: "Success",
            date: formattedDate,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Failure",
        });
    }
});

router.get("/request-method", (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            method: "GET",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Somehow, we failed to retrieve the method."
        });
    }
});

router.post("/request-method", (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            method: "POST",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Somehow, we failed to retrieve the method."
        });
    }
});

router.put("/request-method", (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            method: "PUT",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Somehow, we failed to retrieve the method."
        });
    }
});

router.delete("/request-method", (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            method: "DELETE",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Somehow, we failed to retrieve the method."
        });
    }
});

module.exports = router;