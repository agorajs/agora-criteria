"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
var lodash_1 = __importDefault(require("lodash"));
/**
 * TODO: NNB*16
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 */
exports.kNearestNeighborsNNB = function (initialGraph, updatedGraph, options) {
    var k = options.k;
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    if (initialNodes.length !== updatedNodes.length) {
        console.error("criteria", // family
        "nm-knn-nnb*12", // type
        "abording", // action
        "not the same number of nodes" // reason
        );
        throw "Criteria change abording : not same number of nodes";
    }
    var nodesLength = initialNodes.length;
    var n_k = n(k);
    var value = 0;
    for (var i = 0; i < nodesLength; i++) {
        var initialNode = initialNodes[i];
        var updatedNode = updatedNodes[i];
        value +=
            Math.pow((k -
                lodash_1.default.intersection(n_k(initialNodes, initialNode), n_k(updatedNodes, updatedNode)).length), 2);
    }
    return { value: value };
};
function n(k) {
    return function (nodes, node) {
        return lodash_1.default.sortBy(nodes, function (n) { return agora_graph_1.norm(node, n); })
            .filter(function (n) { return n.index != node.index; })
            .slice(0, k)
            .map(function (n) { return n.index; });
    };
}
function createKNearestNeighborsCriteria(k) {
    if (k === void 0) { k = 8; }
    return {
        criteria: function (initial, updated) {
            return exports.kNearestNeighborsNNB(initial, updated, { k: k });
        },
        name: "node-mouvement/distance-moved/" + k + "-nearest-neighbors",
        short: "mn_dm_" + k + "nn"
    };
}
exports.createKNearestNeighborsCriteria = createKNearestNeighborsCriteria;
exports.NodeMouvement8NearestNeighborsCriteria = createKNearestNeighborsCriteria();
exports.default = exports.NodeMouvement8NearestNeighborsCriteria;
