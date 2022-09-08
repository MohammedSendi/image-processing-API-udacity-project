"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var images_1 = __importDefault(require("./api/images"));
var routes = express_1.default.Router();
routes.use('/images', images_1.default);
routes.get('/', function (request, response) {
    // This could be done by serving views ... Just quick and dirty for now :-)
    response.send('<h1>Welcome to image-processing-api</h1><p>Listening at <code><a href="/api/images">/api/images</a></code></p><p>Examples:<ul><li><a href="/api/images?filename=encenadaport">/api/images?filename=encenadaport</a></li><li><a href="/api/images?filename=encenadaport&width=100&height=100">/api/images?filename=encenadaport&width=100&height=100</a></li></ul></p>');
});
exports.default = routes;
