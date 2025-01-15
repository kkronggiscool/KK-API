const express = require("express");
const path = require("path");
const rateLimit = require("express-rate-limit");
const PORT = 58832

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'ejs'));
app.set('trust proxy', process.env.NODE_ENV === 'production' ? '127.0.0.1' : 'loopback');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const rate_limiter = rateLimit({
    windowMs: 3000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Stop rate limitng us the server is gonna die 😭"
    },
    skipSuccessfulRequests: false,
});

app.use(rate_limiter);

app.get("/", rate_limiter, (req, res) => {
    res.redirect("/api")
});

const mainAPI = require("./routes/api");
const MoreApiRoutes = require("./routes/moreApi")
app.use("/api", rate_limiter, mainAPI);
app.use("/api", rate_limiter, MoreApiRoutes);

app.listen(PORT, () => {
    console.log(`kk api: http://localhost:${PORT}`);
});