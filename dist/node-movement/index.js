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
var euclidean_normalized_1 = __importDefault(require("./distance-moved/euclidean-normalized"));
var hamiltonian_1 = __importDefault(require("./distance-moved/hamiltonian"));
var squared_euclidean_1 = __importDefault(require("./distance-moved/squared-euclidean"));
var improved_mean_squared_euclidean_1 = __importDefault(require("./distance-moved/improved-mean-squared-euclidean"));
var moved_nodes_1 = __importDefault(require("./moved-nodes"));
var mean_euclidean_1 = __importDefault(require("./distance-moved/mean-euclidean"));
var k_nearest_neighbors_1 = __importStar(require("./k-nearest-neighbors"));
exports.NodeMovement = {
    DistanceMoved: {
        EuclideanNormalized: euclidean_normalized_1.default,
        Hamiltonian: hamiltonian_1.default,
        SquaredEuclidean: squared_euclidean_1.default,
        MeanEuclidean: mean_euclidean_1.default,
        ImprovedMeanSquaredEuclidean: improved_mean_squared_euclidean_1.default
    },
    MovedNodes: moved_nodes_1.default,
    KNearestNeighbors: {
        default: k_nearest_neighbors_1.default,
        setK: k_nearest_neighbors_1.createKNearestNeighborsCriteria
    }
};
exports.default = exports.NodeMovement;
