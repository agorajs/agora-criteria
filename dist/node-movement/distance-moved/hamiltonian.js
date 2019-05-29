"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
var utils_1 = require("../../utils");
/**
 * TODO: HL03, HLSG07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.costFunction = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    var sum = 0;
    for (var u_index = 0; u_index < initialNodes.length; u_index++) {
        var u = initialNodes[u_index];
        var u_prime = updatedNodes[u_index];
        sum += agora_graph_1.normX(u_prime, u) + agora_graph_1.normY(u_prime, u);
    }
    return { value: sum };
};
exports.NodeMovementDistanceMovedHamiltonianCriteria = utils_1.criteriaWrap({
    criteria: exports.costFunction,
    name: 'node-mouvement/distance-moved/hamiltonian',
    short: 'nm_dm_h'
});
exports.default = exports.NodeMovementDistanceMovedHamiltonianCriteria;
