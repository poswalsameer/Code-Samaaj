import mongoose, { connection } from "mongoose";

export async function connectDatabase(){

    try {
        const dbConnectionResponse = await mongoose.connect(process.env.MONGODB_URL!);

        const connectionStatus = mongoose.connection;
        connectionStatus.on('connected', () => {
            console.log("MongoDB connected successfully");
        })

        connectionStatus.on('error', (error) => {
            console.log("MongoDB connection error while connecting to the database: ", error);
            process.exit();
        })

        // console.log(dbConnectionResponse);
    } 
    catch (error) {
        console.log("Something went wrong while connecting to the database: ", error);
    }

}