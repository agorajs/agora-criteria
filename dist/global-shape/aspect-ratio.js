"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
/**
 * checks how the aspect ratio has changed
 * @param initial
 * @param updated
 */
exports.aspectRatio = function (initial, updated) {
    if (initial.nodes.length !== updated.nodes.length) {
        console.error("criteria", // family
        "aspect-ratio", // type
        "abording", // action
        "not the same number of nodes" // reason
        );
        throw "Criteria aspect-ratio abording : not same number of nodes";
    }
    var initialSize = [
        agora_graph_1.round(agora_graph_1.bottom(agora_graph_1.bottom(initial.nodes)) - agora_graph_1.top(agora_graph_1.top(initial.nodes))),
        agora_graph_1.round(agora_graph_1.right(agora_graph_1.right(initial.nodes)) - agora_graph_1.left(agora_graph_1.left(initial.nodes)))
    ], updatedSize = [
        agora_graph_1.round(agora_graph_1.bottom(agora_graph_1.bottom(updated.nodes)) - agora_graph_1.top(agora_graph_1.top(updated.nodes))),
        agora_graph_1.round(agora_graph_1.right(agora_graph_1.right(updated.nodes)) - agora_graph_1.left(agora_graph_1.left(updated.nodes)))
    ];
    return {
        value: Math.max((initialSize[1] * updatedSize[0]) / (initialSize[0] * updatedSize[1]), (initialSize[0] * updatedSize[1]) / (initialSize[1] * updatedSize[0])),
        updated: updatedSize,
        initial: initialSize
    };
};
exports.GlobalShapeBoundingBoxAspectRatioPlusCriteria = {
    criteria: exports.aspectRatio,
    name: "global-shape/bounding-box/aspect-ratio-plus",
    short: "gs_bb_arplus"
};
exports.default = exports.GlobalShapeBoundingBoxAspectRatioPlusCriteria;
