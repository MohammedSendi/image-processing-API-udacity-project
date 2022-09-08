"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = __importDefault(require("./routes"));
//import File from './file';
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = 3000; // Default port
// Add routes
app.use('/api', routes_1.default);
app.get('/', function (req, res) {
    res.send("<h1>Welcome to image-processing-api</h1><p>please visit <a href=\"/api\">/api</a> to test ");
});
// Start server
app.listen(port);
exports.default = app;
