import express, { Application } from "express";
import morgan from "morgan";
// Routes
import HomeRouter from "./routes/home.router";
import UserRouter from "./routes/users.router";
import TaskRouter from "./routes/task.router"

export class App {

    private app: Application

    constructor(private port?: number) {
        this.app = express();
        this.setting();
        this.middlewares();
        this.routers();
    }

    private setting(){
        this.app.set("port", this.port || process.env.PORT);
        console.log(process.env.PORT);
    }

    private middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json()); // acepta respuetas json
    }

    private routers(){
        this.app.use(HomeRouter);
        this.app.use("/users", UserRouter);
        this.app.use("/tasks", TaskRouter);
    }

    public async listen() {
        await this.app.listen(this.app.get('port'));
        console.log("server on port", this.app.get('port'));
    }

}