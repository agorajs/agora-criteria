"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
/**
 * TODO: MELS95
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.areaMels = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    if (initialNodes.length !== updatedNodes.length) {
        console.error("criteria", // family
        "area-MELS95", // type
        "abording", // action
        "not the same number of nodes" // reason
        );
        throw "Criteria orthogonal-ordering abording : not same number of nodes";
    }
    var w = agora_graph_1.right(agora_graph_1.right(initialNodes)) - agora_graph_1.left(agora_graph_1.left(initialNodes));
    var h = agora_graph_1.bottom(agora_graph_1.bottom(initialNodes)) - agora_graph_1.top(agora_graph_1.top(initialNodes));
    var wp = agora_graph_1.right(agora_graph_1.right(updatedNodes)) - agora_graph_1.left(agora_graph_1.left(updatedNodes));
    var hp = agora_graph_1.bottom(agora_graph_1.bottom(updatedNodes)) - agora_graph_1.top(agora_graph_1.top(updatedNodes));
    return { value: (wp * hp) / (w * h) };
};
exports.SpreadBoundingBoxAreaCriteria = {
    criteria: exports.areaMels,
    name: "spread/bounding-box/area",
    short: "sp_bb_a"
};
exports.default = exports.SpreadBoundingBoxAreaCriteria;
