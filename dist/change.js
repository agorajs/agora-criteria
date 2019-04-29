"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
/**
 * Evaluates the updatedGraph using the Change criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 * @deprecated
 */
exports.change = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    if (initialNodes.length !== updatedNodes.length) {
        console.error('criteria', // family
        'change', // type
        'abording', // action
        'not the same number of nodes' // reason
        );
        throw "Criteria change abording : not same number of nodes";
    }
    var nodesLength = initialNodes.length;
    var change = 0;
    var displacement = [];
    for (var index = 0; index < nodesLength; index++) {
        var node = initialNodes[index];
        var upNode = updatedNodes[index];
        var diff = agora_graph_1.length(agora_graph_1.Δ(node, upNode));
        change += diff;
        if (diff !== 0) {
            displacement.push({
                source: { x: node.x, y: node.y },
                target: { x: upNode.x, y: upNode.y }
            });
        }
    }
    return { value: change, displacement: displacement };
};
