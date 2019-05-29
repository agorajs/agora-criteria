"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/**
 * TODO : US
 * Evaluates the updatedGraph using the orthogonal ordering criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.normalizedNumberOfInversions = function (initialGraph, updatedGraph) {
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
    return {
        value: sum / (initialNodes.length * (initialNodes.length - 1))
    };
};
exports.OrthogonalOrderingNumberNormalizedInversionsCriteria = utils_1.criteriaWrap({
    criteria: exports.normalizedNumberOfInversions,
    name: 'orthogonal-ordering/normalized-number-of-inversions',
    short: 'oo_nni'
});
exports.default = exports.OrthogonalOrderingNumberNormalizedInversionsCriteria;
