"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * TODO: SSS*12
 * Evaluates the updatedGraph using the orthogonal ordering criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.orthogonalOrderingSss = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    if (initialNodes.length !== updatedNodes.length) {
        console.error("criteria", // family
        "orthogonal-ordering-SSS*12", // type
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
            if (u.x > v.x && u_prime.x < v_prime.x)
                sum++;
            if (u.y > v.y && u_prime.y < v_prime.y)
                sum++;
        }
    }
    return { value: sum };
};
exports.OrthogonalOrderingNumberInversionsCriteria = {
    criteria: exports.orthogonalOrderingSss,
    name: "orthogonal-ordering/number-of-inversions",
    short: "oo_ni"
};
exports.default = exports.OrthogonalOrderingNumberInversionsCriteria;
