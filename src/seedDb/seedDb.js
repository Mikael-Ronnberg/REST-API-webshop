require("dotenv").config();
const mongoose = require("mongoose");
const Item = require("../models/Item");
const { items } = require("./items");

const populateDbWithMockData = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGODB);
        console.log(`MongoDB connected: ${conn.connection.host}`);

        const itemRes = await Item.create(items);

        console.log("Database successfully populated with funny items");

        return itemRes;

    } catch (error) {
        console.error(error);
    } finally {
        process.exit(0);
    }
};

populateDbWithMockData();