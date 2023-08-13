require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes');
const shoppingcartRoutes = require('./routes/shoppingcartRoutes');
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(`proccessing ${req.method} request to ${req.path}`);
    next();
});

app.use('/api/v1/shoppingcarts', shoppingcartRoutes);
app.use('/api/v1/items', itemRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
const run = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGODB);
        console.log(`MongoDB connected: ${conn.connection.host}`);

        app.listen(port, () => {
            console.log(`Server up and running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error(error);
    }
};

run();