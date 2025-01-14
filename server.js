import express, { request } from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import errorResponseHandler, { invalidPathHandler } from "./middleware/ErrorHandler.js";

//Routes
import router from "./routes/UserRoutes.js";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.get('/',(req,res) => {
    res.send("Server is running...")
})

app.use("/api/users", router)
const PORT = process.env.PORT || 3000;

app.use(invalidPathHandler);
app.use(errorResponseHandler);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));