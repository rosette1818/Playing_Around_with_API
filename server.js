require('dotenv').config();
const express = require('express');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const SERVER_NAME = process.env.SERVER_NAME || 'local';

//Warning if the key is missing

if(!process.env.GLOBALGIVING_API_KEY) {
    console.warn('[warn] GLOBALGIVING_API_KEY is not set; program search will be unavailable');
}

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        server: SERVER_NAME,
        globalGivingKeyLoaded: Boolean(process.env.GLOBAL_GIVING_API_KEY),
        time: new Date().toISOString(),
    });
});

app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Not Found'});
});

app.listen(PORT, () =>{
    console.log(`Volunteer Bridge running at https://localhost:${PORT} (server: ${SERVER_NAME}`)
});