import express from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";


const port = process.env.SERVICE_PORT || 5000;
const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.disable('x-powered-by');
app.use(cors({
    origin: '*',
    credential: true
}));