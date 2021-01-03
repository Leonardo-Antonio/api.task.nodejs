"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
// Routes
const home_router_1 = __importDefault(require("./routes/home.router"));
const users_router_1 = __importDefault(require("./routes/users.router"));
const task_router_1 = __importDefault(require("./routes/task.router"));
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.setting();
        this.middlewares();
        this.routers();
    }
    setting() {
        this.app.set("port", this.port || process.env.PORT);
        console.log(process.env.PORT);
    }
    middlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json()); // acepta respuetas json
    }
    routers() {
        this.app.use(home_router_1.default);
        this.app.use("/users", users_router_1.default);
        this.app.use("/tasks", task_router_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log("server on port", this.app.get('port'));
        });
    }
}
exports.App = App;
