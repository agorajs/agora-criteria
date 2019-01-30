"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lambda_1_hlsg07_1 = require("./lambda-1-hlsg07");
var lambda_2_hlsg07_1 = require("./lambda-2-hlsg07");
var area_hlsg07_1 = require("./area-hlsg07");
var change_hl03_1 = require("./change-hl03");
/**
 * TODO: HLSG07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.nHlsg = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    if (initialNodes.length !== updatedNodes.length) {
        console.error("criteria", // family
        "degree-layout-adjustment-HLSG07", // type
        "abording", // action
        "not the same number of nodes" // reason
        );
        throw "Criteria degree-layout-adjustment-HLSG07 abording : not same number of nodes";
    }
    return {
        value: 0.25 * lambda_1_hlsg07_1.lambda1Hlsg(initialGraph, updatedGraph).value +
            0.25 * lambda_2_hlsg07_1.orthogonalOrderingHlgs(initialGraph, updatedGraph).value +
            0.25 * area_hlsg07_1.areaHlsg(initialGraph, updatedGraph).value +
            0.25 * change_hl03_1.changeHl(initialGraph, updatedGraph).value
    };
};
