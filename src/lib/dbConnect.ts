import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already conncted to Database")
        return
    }

    try {
        await mongoose.connect();
    } catch (error) {
        
    }
}