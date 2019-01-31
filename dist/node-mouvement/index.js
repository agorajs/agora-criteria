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
var spread_lmr98_1 = __importDefault(require("./spread-lmr98"));
var change_hl03_1 = __importDefault(require("./change-hl03"));
var change_square_msth03_1 = __importDefault(require("./change-square-msth03"));
var lambda_1_hlsg07_1 = __importDefault(require("./lambda-1-hlsg07"));
var nm_dme_sss12_1 = __importDefault(require("./nm-dme-sss12"));
var nm_knn_nnb16_1 = __importStar(require("./nm-knn-nnb16"));
exports.NodeMouvement = {
    DistanceMoved: {
        Normalized: spread_lmr98_1.default,
        Hamiltonian: change_hl03_1.default,
        Squared: change_square_msth03_1.default,
        MeanEuclidian: nm_dme_sss12_1.default
    },
    MovedNodes: lambda_1_hlsg07_1.default,
    KNearestNeighbors: {
        default: nm_knn_nnb16_1.default,
        setK: nm_knn_nnb16_1.createKNearestNeighborsCriteria
    }
};
exports.default = exports.NodeMouvement;
