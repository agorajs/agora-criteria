"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
var utils_1 = require("../utils");
/**
 * TODO: MSTH03
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.changeSquareMsth = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    var sum = 0;
    for (var u_index = 0; u_index < initialNodes.length; u_index++) {
        var u = initialNodes[u_index];
        var u_prime = updatedNodes[u_index];
        sum += Math.pow(agora_graph_1.normX(u_prime, u), 2) + Math.pow(agora_graph_1.normY(u_prime, u), 2);
    }
    return { value: sum };
};
exports.NodeMouvementDistanceMovedSquaredCriteria = utils_1.criteriaWrap({
    criteria: exports.changeSquareMsth,
    name: 'node-mouvement/distance-moved/squared',
    short: 'nm_dm_s'
});
exports.default = exports.NodeMouvementDistanceMovedSquaredCriteria;
