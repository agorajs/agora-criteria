"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/**
 * TODO: HLGS07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.lambda1 = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    var n = initialNodes.length;
    var nb = 0;
    for (var u_index = 0; u_index < initialNodes.length; u_index++) {
        var u = initialNodes[u_index];
        var u_prime = updatedNodes[u_index];
        if (u.x !== u_prime.x || u.y !== u_prime.y)
            nb++;
    }
    return { value: nb / n };
};
exports.NodeMovementMovedNodesCriteria = utils_1.criteriaWrap({
    criteria: exports.lambda1,
    name: 'node-movement/moved-nodes',
    short: 'nm_mn'
});
exports.default = exports.NodeMovementMovedNodesCriteria;
