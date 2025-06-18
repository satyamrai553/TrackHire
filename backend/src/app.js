import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';



const app = express();

const allowedOrigins = process.env.CORS_ORIGIN.split(","); // Support multiple origins

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies & authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))
app.use(cookieParser())



//import routes
import healthCheckRouter from "./routes/healthCheck.routes.js"
import userRouter from "./routes/user.routes.js";
import adminRouter from './routes/admin.routes.js';
import jobRouter from './routes/job.routes.js';
import jobApplicationRouter from './routes/jobApplication.routes.js';



//routes
app.use("/api/v1/healthCheck", healthCheckRouter)
app.use("/api/v1/users", userRouter)
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/jobApplication', jobApplicationRouter);


export {
    app
}