const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect('mongodb://localhost/survey', {useMongoClient: true});

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = 5000;
app.listen(PORT);