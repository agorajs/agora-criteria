"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
/**
 * TODO check if the edge distance order has changed, apply a levenshtein strategy on it :)
 * @param initialGraph
 * @param updatedGraph
 */
exports.changeRatio = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    if (initialNodes.length !== updatedNodes.length) {
        console.error('criteria', // family
        'change-ratio', // type
        'abording', // action
        'not the same number of nodes' // reason
        );
        throw "Criteria change-ratio abording : not same number of nodes";
    }
    var nodesLength = initialNodes.length;
    var diffChange = 0;
    var displacement = [];
    // TODO : corriger cette abomination
    var refNode = { x: 0, y: 0 };
    for (var i = 0; i < nodesLength; i++) {
        var node1 = initialNodes[i];
        var upNode1 = updatedNodes[i];
        for (var j = i + 1; j < nodesLength; j++) {
            var node2 = initialNodes[j];
            var upNode2 = updatedNodes[j];
            var initialDist = agora_graph_1.length(agora_graph_1.Δ(node1, node2));
            if (initialDist !== 0)
                diffChange += agora_graph_1.length(agora_graph_1.Δ(upNode1, upNode2)) / initialDist;
        }
    }
    return { value: diffChange / (nodesLength * (nodesLength - 1) / 2) };
};
