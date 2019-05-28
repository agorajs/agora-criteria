"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/**
 * TODO: SSS*12
 * Evaluates the updatedGraph using the orthogonal ordering criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.numberOfInversions = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
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
exports.OrthogonalOrderingNumberInversionsCriteria = utils_1.criteriaWrap({
    criteria: exports.numberOfInversions,
    name: 'orthogonal-ordering/number-of-inversions',
    short: 'oo_ni'
});
exports.default = exports.OrthogonalOrderingNumberInversionsCriteria;
