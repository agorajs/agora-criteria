"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
var utils_1 = require("../utils");
/**
 * TODO: LMR98
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.aspectRatioLmr = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    var n = initialNodes.length;
    var sum = 0;
    for (var u_index = 0; u_index < initialNodes.length; u_index++) {
        var u = initialNodes[u_index];
        var u_prime = updatedNodes[u_index];
        sum += agora_graph_1.norm(u_prime, u);
    }
    var w = agora_graph_1.right(agora_graph_1.right(initialNodes)) - agora_graph_1.left(agora_graph_1.left(initialNodes));
    var h = agora_graph_1.bottom(agora_graph_1.bottom(initialNodes)) - agora_graph_1.top(agora_graph_1.top(initialNodes));
    var wp = agora_graph_1.right(agora_graph_1.right(updatedNodes)) - agora_graph_1.left(agora_graph_1.left(updatedNodes));
    var hp = agora_graph_1.bottom(agora_graph_1.bottom(updatedNodes)) - agora_graph_1.top(agora_graph_1.top(updatedNodes));
    var k = Math.max(w, h, wp, hp);
    return { value: sum / (k * Math.SQRT2 * n) };
};
exports.NodeMouvementDistanceMovedNormalizedCriteria = utils_1.criteriaWrap({
    criteria: exports.aspectRatioLmr,
    name: 'node-mouvement/distance-moved-normalized',
    short: 'nm_dm_n'
});
exports.default = exports.NodeMouvementDistanceMovedNormalizedCriteria;
