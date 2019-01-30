"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * CUSTOM ?
 * Evaluates the updatedGraph using the orthogonal ordering criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.orthogonalOrdering = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    if (initialNodes.length !== updatedNodes.length) {
        console.error("criteria", // family
        "orthogonal-ordering", // type
        "abording", // action
        "not the same number of nodes" // reason
        );
        throw "Criteria orthogonal-ordering abording : not same number of nodes";
    }
    var nodesLength = initialNodes.length;
    var counter = 0;
    for (var origin_1 = 0; origin_1 < nodesLength; origin_1++) {
        for (var dest = origin_1 + 1; dest < nodesLength; dest++) {
            var initNodeOrigin = initialNodes[origin_1];
            var initNodeDest = initialNodes[dest];
            var upNodeOrigin = updatedNodes[origin_1];
            var upNodeDest = updatedNodes[dest];
            if (Math.sign(initNodeDest.x - initNodeOrigin.x) ===
                Math.sign(upNodeDest.x - upNodeOrigin.x) &&
                Math.sign(initNodeDest.y - initNodeOrigin.y) ===
                    Math.sign(upNodeDest.y - upNodeOrigin.y)) {
                counter++;
            }
        }
    }
    return { value: counter / ((nodesLength * (nodesLength - 1)) / 2) };
};
exports.OrthogonalOrderingCustomCriteria = {
    criteria: exports.orthogonalOrdering,
    name: "orthogonal-ordering/custom",
    short: "oo_c"
};
exports.default = exports.OrthogonalOrderingCustomCriteria;
