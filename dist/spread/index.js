"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var area_mels95_1 = __importDefault(require("./area-mels95"));
var area_hlsg07_1 = __importDefault(require("./area-hlsg07"));
var l1_length_hlsg07_1 = __importDefault(require("./l1-length-hlsg07"));
var sp_ch_a_1 = __importDefault(require("./sp-ch-a"));
exports.Spread = {
    BoundingBox: {
        Area: area_mels95_1.default,
        AreaNormalized: area_hlsg07_1.default,
        L1MetricLength: l1_length_hlsg07_1.default
    },
    ConvexHull: {
        Area: sp_ch_a_1.default
    }
};
exports.default = exports.Spread;
