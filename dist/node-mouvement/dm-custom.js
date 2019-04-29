"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
var utils_1 = require("../utils");
function scaleChange(initial, updated) {
    var nodesLength = initial.nodes.length;
    var sizes = {
        in: {
            min: { x: initial.nodes[0].x, y: initial.nodes[0].y },
            max: { x: initial.nodes[0].x, y: initial.nodes[0].y }
        },
        up: {
            min: { x: updated.nodes[0].x, y: updated.nodes[0].y },
            max: { x: updated.nodes[0].x, y: updated.nodes[0].y }
        }
    };
    // determining the scale ratio
    for (var index = 0; index < nodesLength; index++) {
        var node = initial.nodes[index];
        var upNode = updated.nodes[index];
        if (sizes.in.min.x > node.x)
            sizes.in.min.x = node.x;
        if (sizes.in.max.x < node.x)
            sizes.in.max.x = node.x;
        if (sizes.in.min.y > node.y)
            sizes.in.min.y = node.y;
        if (sizes.in.max.y < node.y)
            sizes.in.max.y = node.y;
        if (sizes.up.min.x > upNode.x)
            sizes.up.min.x = upNode.x;
        if (sizes.up.max.x < upNode.x)
            sizes.up.max.x = upNode.x;
        if (sizes.up.min.y > upNode.y)
            sizes.up.min.y = upNode.y;
        if (sizes.up.max.y < upNode.y)
            sizes.up.max.y = upNode.y;
    }
    // there you go
    var ratio = {
        width: (sizes.up.max.x - sizes.up.min.x) / (sizes.in.max.x - sizes.in.min.x),
        height: (sizes.up.max.y - sizes.up.min.y) / (sizes.in.max.y - sizes.in.min.y)
    };
    var proPoints = [];
    var proj = {
        x: null,
        y: null
    };
    // calculating the shift
    for (var index = 0; index < nodesLength; index++) {
        var node = initial.nodes[index];
        var point = {
            x: node.x * ratio.width,
            y: node.y * ratio.height
        };
        var left = point.x - node.width / 2;
        var top_1 = point.y - node.height / 2;
        if (proj.x === null || left < proj.x)
            proj.x = left;
        if (proj.y === null || top_1 < proj.y)
            proj.y = top_1;
        proPoints.push(point);
    }
    if (proj.x === null || proj.y === null)
        throw 'Criteria scale-change projection error';
    var change = 0;
    var displacement = [];
    // applying the shift and calculating the displacement
    for (var index = 0; index < nodesLength; index++) {
        var upNode = updated.nodes[index];
        var pPoint = {
            x: proPoints[index].x - proj.x,
            y: proPoints[index].y - proj.y
        };
        var distancePoints = agora_graph_1.delta(upNode, pPoint);
        var diff = +(distancePoints.x * distancePoints.x +
            distancePoints.y * distancePoints.y).toFixed(9);
        change += diff;
        if (diff !== 0) {
            displacement.push({
                source: { x: upNode.x, y: upNode.y },
                target: pPoint
            });
        }
    }
    return { value: change / nodesLength, displacement: displacement };
}
exports.scaleChange = scaleChange;
exports.NodeMouvementDistanceMovedCustomCriteria = utils_1.criteriaWrap({
    criteria: scaleChange,
    name: 'node-mouvement/distance-moved/custom',
    short: 'nm_dm_c'
});
exports.default = exports.NodeMouvementDistanceMovedCustomCriteria;
