"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * TODO: HLGS07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.lambda1Hlsg = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    var n = initialNodes.length;
    if (initialNodes.length !== updatedNodes.length) {
        console.error("criteria", // family
        "lambda-1-HLGS07", // type
        "abording", // action
        "not the same number of nodes" // reason
        );
        throw "Criteria lambda-1-HLGS07 abording : not same number of nodes";
    }
    var nb = 0;
    for (var u_index = 0; u_index < initialNodes.length; u_index++) {
        var u = initialNodes[u_index];
        var u_prime = updatedNodes[u_index];
        if (u.x !== u_prime.x || u.y !== u_prime.y)
            nb++;
    }
    return { value: nb / n };
};
exports.NodeMouvementMovedNodesCriteria = {
    criteria: exports.lambda1Hlsg,
    name: "node-mouvement/moved-nodes",
    short: "nm_mn"
};
exports.default = exports.NodeMouvementMovedNodesCriteria;
