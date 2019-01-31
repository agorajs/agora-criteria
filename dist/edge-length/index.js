"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var edge_ratio_len05_1 = __importDefault(require("./edge-ratio-len05"));
var edge_length_gh10_1 = __importDefault(require("./edge-length-gh10"));
exports.EdgeLength = {
    Ratio: edge_ratio_len05_1.default,
    RelativeStandardDeviation: edge_length_gh10_1.default
};
exports.default = exports.EdgeLength;
