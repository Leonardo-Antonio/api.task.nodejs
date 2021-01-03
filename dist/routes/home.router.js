"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_controller_1 = require("../controller/home.controller");
const router = express_1.Router();
router.get("/", home_controller_1.HomeController.Index);
exports.default = router;
