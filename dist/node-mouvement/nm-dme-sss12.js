"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
/**
 * TODO: SSS*12
 * Evaluates the updatedGraph using the Change criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 */
exports.euclidianDistanceSss = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    if (initialNodes.length !== updatedNodes.length) {
        console.error("criteria", // family
        "euclidian-distance-sss*12", // type
        "abording", // action
        "not the same number of nodes" // reason
        );
        throw "Criteria change abording : not same number of nodes";
    }
    var nodesLength = initialNodes.length;
    var change = 0;
    var displacement = [];
    for (var index = 0; index < nodesLength; index++) {
        var node = initialNodes[index];
        var upNode = updatedNodes[index];
        var diff = agora_graph_1.norm(node, upNode);
        change += diff;
        if (diff !== 0) {
            displacement.push({
                source: { x: node.x, y: node.y },
                target: { x: upNode.x, y: upNode.y }
            });
        }
    }
    return { value: change / nodesLength, displacement: displacement };
};
exports.NodeMouvementDistanceMovedMeanEuclidianCriteria = {
    criteria: exports.euclidianDistanceSss,
    name: "node-mouvement/distance-moved/mean-euclidian",
    short: "mn_dm_me"
};
exports.default = exports.NodeMouvementDistanceMovedMeanEuclidianCriteria;
