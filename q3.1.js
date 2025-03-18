const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per `window` (here, per minute)
    message: 'Too many requests from this IP, please try again after a minute'
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});