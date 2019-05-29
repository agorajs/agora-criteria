"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
var utils_1 = require("../../utils");
/**
 * TODO : LEN05
 * @param initial
 * @param updated
 */
exports.l1MetricLength = function (initial, updated) {
    var initialResult = Math.max(agora_graph_1.round(agora_graph_1.bottom(agora_graph_1.bottom(initial.nodes)) - agora_graph_1.top(agora_graph_1.top(initial.nodes))), agora_graph_1.round(agora_graph_1.right(agora_graph_1.right(initial.nodes)) - agora_graph_1.left(agora_graph_1.left(initial.nodes))));
    var updatedResult = Math.max(agora_graph_1.round(agora_graph_1.bottom(agora_graph_1.bottom(updated.nodes)) - agora_graph_1.top(agora_graph_1.top(updated.nodes))), agora_graph_1.round(agora_graph_1.right(agora_graph_1.right(updated.nodes)) - agora_graph_1.left(agora_graph_1.left(updated.nodes))));
    return {
        value: initialResult !== 0 ? updatedResult / initialResult : -1,
        initial: initialResult,
        updated: updatedResult
    };
};
exports.SpreadBoundingBoxL1MetricLengthCriteria = utils_1.criteriaWrap({
    criteria: exports.l1MetricLength,
    name: 'spread/bounding-box/l1-metric-length',
    short: 'sp_bb_l1ml'
});
exports.default = exports.SpreadBoundingBoxL1MetricLengthCriteria;
