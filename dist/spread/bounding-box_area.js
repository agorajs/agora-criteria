"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
var utils_1 = require("../utils");
/**
 * TODO: MELS95
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.area = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    var w = agora_graph_1.right(agora_graph_1.right(initialNodes)) - agora_graph_1.left(agora_graph_1.left(initialNodes));
    var h = agora_graph_1.bottom(agora_graph_1.bottom(initialNodes)) - agora_graph_1.top(agora_graph_1.top(initialNodes));
    var wp = agora_graph_1.right(agora_graph_1.right(updatedNodes)) - agora_graph_1.left(agora_graph_1.left(updatedNodes));
    var hp = agora_graph_1.bottom(agora_graph_1.bottom(updatedNodes)) - agora_graph_1.top(agora_graph_1.top(updatedNodes));
    return { value: (wp * hp) / (w * h) };
};
exports.SpreadBoundingBoxAreaCriteria = utils_1.criteriaWrap({
    criteria: exports.area,
    name: 'spread/bounding-box/area',
    short: 'sp_bb_a'
});
exports.default = exports.SpreadBoundingBoxAreaCriteria;
