"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
var utils_1 = require("../utils");
// TODO: LEN05
exports.edgeRatioLen = function (initial, updated) {
    try {
        var ratioOfInitial = calculateEdgeRatio(initial);
        var ratioOfUpdated = calculateEdgeRatio(updated);
        return {
            value: ratioOfUpdated / ratioOfInitial,
            initial: ratioOfInitial,
            updated: ratioOfUpdated
        };
    }
    catch (error) {
        return { value: -1, error: error };
    }
};
function calculateEdgeRatio(graph) {
    var min, max;
    for (var _i = 0, _a = graph.edges; _i < _a.length; _i++) {
        var edge = _a[_i];
        var u = graph.nodes[edge.source];
        var v = graph.nodes[edge.target];
        var norm_uv = agora_graph_1.norm(u, v);
        if (norm_uv === 0)
            continue;
        if (min === undefined || min > norm_uv)
            min = norm_uv;
        if (max === undefined || max < norm_uv)
            max = norm_uv;
    }
    if (max == undefined || min == undefined)
        throw 'could not evaluate edge/ratio';
    return max / min;
}
exports.EdgeLengthRatioCriteria = utils_1.criteriaWrap({
    criteria: exports.edgeRatioLen,
    name: 'edge/ratio',
    short: 'e_r'
});
exports.default = exports.EdgeLengthRatioCriteria;
