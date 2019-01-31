"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aspect_ratio_len05_1 = __importDefault(require("./aspect-ratio-len05"));
var aspect_ratio_1 = __importDefault(require("./aspect-ratio"));
var gs_ch_ssp_1 = __importDefault(require("./gs-ch-ssp"));
exports.GlobalShape = {
    BoundingBox: {
        AspectRatio: aspect_ratio_len05_1.default,
        AspectRatioPlus: aspect_ratio_1.default
    },
    ConvexHull: {
        StandardShapePreservation: gs_ch_ssp_1.default
    }
};
exports.default = exports.GlobalShape;
