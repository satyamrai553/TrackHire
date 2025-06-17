import { app } from "./app.js";
import {connectDB} from "./db/index.js";
import dotenv from "dotenv";


dotenv.config({
    path: "../.env"
});


connectDB().then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
});



