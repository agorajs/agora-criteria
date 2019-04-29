"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var edge_ratio_len05_1 = __importDefault(require("./edge-ratio-len05"));
var edge_length_gh10_1 = __importStar(require("./edge-length-gh10"));
exports.EdgeLength = {
    Ratio: edge_ratio_len05_1.default,
    RelativeStandardDeviationDelaunay: edge_length_gh10_1.default,
    RelativeStandardDeviation: edge_length_gh10_1.EdgeRelativeStandardDeviationCriteria
};
exports.default = exports.EdgeLength;
