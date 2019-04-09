"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
// TODO: LEN05
exports.edgeRatioLen = function (initial, updated) {
    if (initial.nodes.length !== updated.nodes.length) {
        console.error("criteria", // family
        "edge-ratio-LEN05", // type
        "abording", // action
        "not the same number of nodes" // reason
        );
        throw "Criteria edge-ratio-LEN05 abording : not same number of nodes";
    }
    var min, max;
    for (var _i = 0, _a = updated.edges; _i < _a.length; _i++) {
        var edge = _a[_i];
        var u = updated.nodes[edge.source];
        var v = updated.nodes[edge.target];
        var norm_uv = agora_graph_1.norm(u, v);
        if (norm_uv === 0)
            continue;
        if (min === undefined || min > norm_uv)
            min = norm_uv;
        if (max === undefined || max < norm_uv)
            max = norm_uv;
    }
    if (max == undefined || min == undefined) {
        return { value: -1, error: "could not evaluate this criteria" };
    }
    return { value: max / min };
};
exports.EdgeLengthRatioCriteria = {
    criteria: exports.edgeRatioLen,
    name: "edge-length/ratio",
    short: "el_r"
};
exports.default = exports.EdgeLengthRatioCriteria;
