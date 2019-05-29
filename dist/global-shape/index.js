"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aspect_ratio_1 = __importDefault(require("./bounding-box/aspect-ratio"));
var improved_aspect_ratio_1 = __importDefault(require("./bounding-box/improved-aspect-ratio"));
var convex_hull_standard_deviation_1 = __importDefault(require("./convex-hull_standard-deviation"));
exports.GlobalShape = {
    BoundingBox: {
        AspectRatio: aspect_ratio_1.default,
        AspectRatioPlus: improved_aspect_ratio_1.default
    },
    ConvexHull: {
        StandardDeviation: convex_hull_standard_deviation_1.default
    }
};
exports.default = exports.GlobalShape;
