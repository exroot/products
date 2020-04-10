import express, { Application } from "express";
import "reflect-metadata";
import morgan from "morgan";

export class App {
    protected app: Application;
    constructor(protected port?: number) {
        this.app = express();
        this.settup();
    }
    settup() {
        this.app.set("port", this.port || process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use(morgan("dev"));
    }
    async listen() {
        await this.app.listen(this.app.get("port"));
        console.log(`App running on port ${this.app.get("port")}`);
    }
}
