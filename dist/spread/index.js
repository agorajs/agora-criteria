"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bounding_box_area_1 = __importDefault(require("./bounding-box_area"));
var bounding_box_area_normalized_1 = __importDefault(require("./bounding-box_area-normalized"));
var l1_metric_length_1 = __importDefault(require("./l1-metric-length"));
var convex_hull_area_1 = __importDefault(require("./convex-hull_area"));
exports.Spread = {
    BoundingBox: {
        Area: bounding_box_area_1.default,
        AreaNormalized: bounding_box_area_normalized_1.default,
        L1MetricLength: l1_metric_length_1.default
    },
    ConvexHull: {
        Area: convex_hull_area_1.default
    }
};
exports.default = exports.Spread;
