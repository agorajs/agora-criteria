"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
var utils_1 = require("../../utils");
/**
 * TODO: SSS*12
 * Evaluates the updatedGraph using the Change criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 */
exports.euclideanDistance = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
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
exports.NodeMovementDistanceMovedMeanEuclideanCriteria = utils_1.criteriaWrap({
    criteria: exports.euclideanDistance,
    name: 'node-movement/distance-moved/mean-euclidean',
    short: 'nm_dm_me'
});
exports.default = exports.NodeMovementDistanceMovedMeanEuclideanCriteria;
