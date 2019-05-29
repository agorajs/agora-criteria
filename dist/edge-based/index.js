"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var relative_standard_deviation_delaunay_1 = __importStar(require("./relative-standard-deviation-delaunay"));
var ratio_1 = __importDefault(require("./ratio"));
exports.EdgeBased = {
    Ratio: ratio_1.default,
    RelativeStandardDeviationDelaunay: relative_standard_deviation_delaunay_1.default,
    RelativeStandardDeviation: relative_standard_deviation_delaunay_1.EdgeBasedRelativeStandardDeviationCriteria
};
exports.default = exports.EdgeBased;
