"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
//TODO: MELS 95
exports.orthogonalOrdering = function (initialGraph, updatedGraph) {
    for (var u_index = 0; u_index < initialGraph.nodes.length; u_index++) {
        var u = initialGraph.nodes[u_index];
        var u_prime = updatedGraph.nodes[u_index];
        for (var v_index = 0; v_index < initialGraph.nodes.length; v_index++) {
            var v = initialGraph.nodes[v_index];
            var v_prime = updatedGraph.nodes[v_index];
            if (u.x < v.x !== u_prime.x < v_prime.x ||
                u.y < v.y !== u_prime.y < v_prime.y ||
                (u.x === v.x) !== (u_prime.x === v_prime.x) ||
                (u.y === v.y) !== (u_prime.y === v_prime.y))
                return { value: 0 };
        }
    }
    return { value: 1 };
};
exports.OrthogonalOrderingCriteria = utils_1.criteriaWrap({
    criteria: exports.orthogonalOrdering,
    name: 'orthogonal-ordering/original',
    short: 'oo_o'
});
exports.default = exports.OrthogonalOrderingCriteria;
