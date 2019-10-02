"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var original_1 = __importDefault(require("./original"));
var number_of_inversions_1 = __importDefault(require("./number-of-inversions"));
var normalized_number_of_inversions_1 = __importDefault(require("./normalized-number-of-inversions"));
var kendall_tau_distance_1 = __importDefault(require("./kendall-tau-distance"));
exports.OrthogonalOrdering = {
    Original: original_1.default,
    NumberInversions: number_of_inversions_1.default,
    NormalizedNumberInversions: normalized_number_of_inversions_1.default,
    KendallTauDistance: kendall_tau_distance_1.default
};
exports.default = exports.OrthogonalOrdering;
