"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mn_hlsg07_1 = require("./node-mouvement/mn-hlsg07");
var kendall_tau_distance_1 = require("./orthogonal-ordering/kendall-tau-distance");
var area_normalized_1 = require("./spread/bounding-box/area-normalized");
var dm_h_hl03_1 = require("./node-mouvement/dm-h-hl03");
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
        value: 0.25 * mn_hlsg07_1.lambda1Hlsg(initialGraph, updatedGraph).value +
            0.25 * kendall_tau_distance_1.lambda2(initialGraph, updatedGraph).value +
            0.25 * area_normalized_1.areaNormalized(initialGraph, updatedGraph).value +
            0.25 * dm_h_hl03_1.changeHl(initialGraph, updatedGraph).value
    };
};
