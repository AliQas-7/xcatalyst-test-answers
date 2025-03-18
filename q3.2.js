// To prevent mass assignment vulnerabilities in a user update API, 
// you should explicitly specify which fields can be updated. 
// This can be done by whitelisting the allowed fields and ignoring
//  any other fields that might be included in the request.
// Here is an example of how to implement this in an Express application:

const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per `window` (here, per minute)
    message: 'Too many requests from this IP, please try again after a minute'
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Mock user data
let user = {
    id: 1,
    username: 'Ali Qaish',
    email: 'qashdev7@gmail.com',
    role: 'user'
};

// User update API
app.put('/user/:id', (req, res) => {
    const allowedUpdates = ['username', 'email'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    updates.forEach(update => user[update] = req.body[update]);
    res.send(user);
});

app.get('/', (req, res) => {
    res.send('Xcatalyst test!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});