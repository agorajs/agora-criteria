"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
/**
 * TODO: HLGS07
 * Evaluates the updatedGraph using the orthogonal ordering criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.orthogonalOrderingHlgs = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    var n = initialNodes.length;
    if (initialNodes.length !== updatedNodes.length) {
        console.error("criteria", // family
        "orthogonal-ordering-HLGS07", // type
        "abording", // action
        "not the same number of nodes" // reason
        );
        throw "Criteria orthogonal-ordering abording : not same number of nodes";
    }
    var sum = 0;
    for (var u_index = 0; u_index < initialNodes.length; u_index++) {
        var u = initialNodes[u_index];
        var u_prime = updatedNodes[u_index];
        for (var v_index = 0; v_index < initialNodes.length; v_index++) {
            var v = initialNodes[v_index];
            var v_prime = updatedNodes[v_index];
            if (iv(u, v, u_prime, v_prime))
                sum++;
        }
    }
    return { value: sum / (n * (n - 1)) };
};
function iv(u, v, u_prime, v_prime) {
    return ((agora_graph_1.left(u) > agora_graph_1.left(v) && agora_graph_1.left(u_prime) < agora_graph_1.left(v_prime)) ||
        (agora_graph_1.left(u) < agora_graph_1.left(v) && agora_graph_1.left(u_prime) > agora_graph_1.left(v_prime)) ||
        (agora_graph_1.top(u) > agora_graph_1.top(v) && agora_graph_1.top(u_prime) < agora_graph_1.top(v_prime)) ||
        (agora_graph_1.top(u) < agora_graph_1.top(v) && agora_graph_1.top(u_prime) > agora_graph_1.top(v_prime)));
}
