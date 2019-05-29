"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var agora_graph_1 = require("agora-graph");
var utils_1 = require("../../utils");
/**
 * scale to transform a to b
 * @param a first value
 * @param b second value
 */
var getScale = function (a, b) { return b / a; };
function getCenter(nodes, orientation) {
    var min = lodash_1.default.minBy(nodes, orientation);
    var max = lodash_1.default.maxBy(nodes, orientation);
    if (!min || !max) {
        throw "Criteria nm_dm_imse getSpan error either: " + min + " or " + max;
    }
    return max[orientation] / 2 + min[orientation] / 2;
}
function getSpan(nodes, orientation) {
    var min = lodash_1.default.minBy(nodes, orientation);
    var max = lodash_1.default.maxBy(nodes, orientation);
    if (!min || !max) {
        throw "Criteria nm_dm_imse getSpan error either: " + min + " or " + max;
    }
    return max[orientation] - min[orientation];
}
function scaleChange(initial, updated) {
    var nodesLength = initial.nodes.length;
    var scale = {
        x: getScale(getSpan(initial.nodes, 'x'), getSpan(updated.nodes, 'x')),
        y: getScale(getSpan(initial.nodes, 'y'), getSpan(updated.nodes, 'y'))
    };
    var initialCenteredNodes = lodash_1.default.sortBy(positionFromCenter(initial.nodes), 'index');
    var updatedCenteredNodes = lodash_1.default.sortBy(positionFromCenter(updated.nodes), 'index');
    return lodash_1.default.reduce(initialCenteredNodes, function (_a, _b) {
        var value = _a.value, displacement = _a.displacement;
        var x = _b.x, y = _b.y, index = _b.index;
        var projected = {
            x: agora_graph_1.round(x * scale.x, -9),
            y: agora_graph_1.round(y * scale.y, -9)
        };
        var up = lodash_1.default.find(updatedCenteredNodes, ['index', index]);
        if (!up)
            throw "Criteria nm_dm_imse : index " + index + " does not exist in updated";
        var diff = agora_graph_1.norm(projected, up);
        value += (diff * diff) / nodesLength;
        displacement.push(diff);
        return { value: value, displacement: displacement };
    }, { value: 0, displacement: [] });
}
exports.scaleChange = scaleChange;
function positionFromCenter(nodes) {
    var center_x = getCenter(nodes, 'x');
    var center_y = getCenter(nodes, 'y');
    return lodash_1.default.map(nodes, function (_a) {
        var index = _a.index, x = _a.x, y = _a.y;
        return ({
            index: index,
            x: x - center_x,
            y: y - center_y
        });
    });
}
exports.NodeMovementDistanceMovedImprovedMeanSquaredEuclideanCriteria = utils_1.criteriaWrap({
    criteria: scaleChange,
    name: 'node-mouvement/distance-moved/improved-mean-squared-euclidean',
    short: 'nm_dm_imse'
});
exports.default = exports.NodeMovementDistanceMovedImprovedMeanSquaredEuclideanCriteria;
