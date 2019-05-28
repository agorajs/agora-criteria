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
var dm_n_lmr98_1 = __importDefault(require("./dm-n-lmr98"));
var dm_h_hl03_1 = __importDefault(require("./dm-h-hl03"));
var dm_s_msth03_1 = __importDefault(require("./dm-s-msth03"));
var dm_ime_1 = __importDefault(require("./dm-ime"));
var mn_hlsg07_1 = __importDefault(require("./mn-hlsg07"));
var dm_sss12_1 = __importDefault(require("./dm-sss12"));
var knn_nnb16_1 = __importStar(require("./knn-nnb16"));
exports.NodeMouvement = {
    DistanceMoved: {
        Normalized: dm_n_lmr98_1.default,
        Hamiltonian: dm_h_hl03_1.default,
        Squared: dm_s_msth03_1.default,
        MeanEuclidian: dm_sss12_1.default,
        Custom: dm_ime_1.default
    },
    MovedNodes: mn_hlsg07_1.default,
    KNearestNeighbors: {
        default: knn_nnb16_1.default,
        setK: knn_nnb16_1.createKNearestNeighborsCriteria
    }
};
exports.default = exports.NodeMouvement;
