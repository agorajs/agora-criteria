"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moved_nodes_1 = require("./node-movement/moved-nodes");
var kendall_tau_distance_1 = require("./orthogonal-ordering/kendall-tau-distance");
var normalized_area_1 = require("./spread/bounding-box/normalized-area");
var hamiltonian_1 = require("./node-movement/distance-moved/hamiltonian");
/**
 *
 * TODO: HLSG07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @deprecated
 */
exports.nHlsg = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    if (initialNodes.length !== updatedNodes.length) {
        console.error('criteria', // family
        'degree-layout-adjustment-HLSG07', // type
        'abording', // action
        'not the same number of nodes' // reason
        );
        throw 'Criteria degree-layout-adjustment-HLSG07 abording : not same number of nodes';
    }
    return {
        value: 0.25 * moved_nodes_1.lambda1(initialGraph, updatedGraph).value +
            0.25 * kendall_tau_distance_1.lambda2(initialGraph, updatedGraph).value +
            0.25 * normalized_area_1.lambda3(initialGraph, updatedGraph).value +
            0.25 * hamiltonian_1.costFunction(initialGraph, updatedGraph).value
    };
};
