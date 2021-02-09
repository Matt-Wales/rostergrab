const express = require('express');
const path = require("path");
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

// Get a player's bio from MLB
app.get('/api/bio/:id', async (req, res) => {

    try {
        const result = await axios.get(`https://statsapi.mlb.com/api/v1/people/${req.params.id}`,
            [req.params.id]
        );

        res.status(200).json({
            player: result.data.people[0],
        });
    } catch (err) {
        console.log(err);
    }
});

// Get a pitcher's splits from MLB
app.get('/api/pitcher/:id', async (req, res) => {

    try {
        const result = await axios.get(`https://statsapi.mlb.com/api/v1/people/${req.params.id}/stats?stats=statSplits,statsSingleSeason&group=pitching&gameType=R&sitCodes=vl,vr&season=2020&language=en`,
            [req.params.id]
        );

        res.status(200).json({
            overall: result.data.stats[1],
            splits: result.data.stats[0],
        });
    } catch (err) {
        console.log(err);
    }
});

// Get a pitcher's pitch types from MLB
app.get('/api/pitch_types/pitcher/:id', async (req, res) => {

    try {
        const result = await axios.get(`https://baseballsavant.mlb.com/player/pitch_types?player_id=${req.params.id}&player_type=pitcher&season=2020`,
            [req.params.id]
        );

        res.status(200).json({
            pitches: result.data,
        });
    } catch (err) {
        console.log(err);
    }
});

// Get a hitter's splits from MLB
app.get('/api/hitter/:id', async (req, res) => {

    try {
        const result = await axios.get(`https://statsapi.mlb.com/api/v1/people/${req.params.id}/stats?stats=statSplits,statsSingleSeason&group=hitting&gameType=R&sitCodes=vl,vr&season=2020&language=en`,
            [req.params.id]
        );

        res.status(200).json({
            overall: result.data.stats[1],
            splits: result.data.stats[0],
        });
    } catch (err) {
        console.log(err);
    }
});

// Get a hitter's pitch types from MLB
app.get('/api/pitch_types/hitter/:id', async (req, res) => {

    try {
        const result = await axios.get(`https://baseballsavant.mlb.com/player/pitch_types?player_id=${req.params.id}&season=2020`,
            [req.params.id]
        );

        res.status(200).json({
            pitches: result.data,
        });
    } catch (err) {
        console.log(err);
    }
});

// Get a hitter's rolling xWOBA from MLB
app.get('/api/rolling/:id', async (req, res) => {

    try {
        const result = await axios.get(`https://baseballsavant.mlb.com/player-services/roll?playerId=${req.params.id}&count=50&type=xwoba_roll&year=2020`,
            [req.params.id]
        );

        res.status(200).json({
            rolling: result.data,
        });
    } catch (err) {
        console.log(err);
    }
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`Server is running successfully on port ${port.toString()}`);
});