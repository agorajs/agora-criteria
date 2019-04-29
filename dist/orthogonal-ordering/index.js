"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var orthogonal_ordering_mels95_1 = __importDefault(require("./orthogonal-ordering-mels95"));
var number_inversions_sss12_1 = __importDefault(require("./number-inversions-sss12"));
var ni_custom_1 = __importDefault(require("./ni-custom"));
var lambda_2_hlsg07_1 = __importDefault(require("./lambda-2-hlsg07"));
exports.OrthogonalOrdering = {
    Default: orthogonal_ordering_mels95_1.default,
    NumberInversions: number_inversions_sss12_1.default,
    NumberInversionsMean: ni_custom_1.default,
    KendallTau: lambda_2_hlsg07_1.default
};
exports.default = exports.OrthogonalOrdering;
