import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import { urlencoded, json } from "express";

export default [
    morgan("dev"),
    cors(),
    urlencoded({ extended: false }),
    json(),
    compression(),
];
