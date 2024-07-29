require('dotenv').config();
const express = require('express');
const app = express();
const reservationRouter = require('./routes/reservationRouter');
const guestRouter = require('./routes/guestRouter');

const { default: mongoose } = require('mongoose');


//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/api/reserve', reservationRouter);
app.use('/api/record', guestRouter);

//connect to db
mongoose.connect(process.env.URL)
    .then((result) => {
        app.listen(process.env.PORT, () => {
            console.log('Server is connected to db and listening on port '+ process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });



