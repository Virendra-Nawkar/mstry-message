import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    // here we tried to check the first wheather the db is connected or now and if already connected then using that db so that data connection dont get chocked up
    if (connection.isConnected) {
        console.log("Already conncted to Database")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

        connection.isConnected = db.connections[0].readyState;

        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("Database Connected Failed", error);

        process.exit(1)
    }
}

export default dbConnect;