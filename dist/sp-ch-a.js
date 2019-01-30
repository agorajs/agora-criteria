"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var d3_polygon_1 = __importDefault(require("d3-polygon"));
var lodash_1 = __importDefault(require("lodash"));
var agora_graph_1 = require("agora-graph");
// Spread::Convex Hull::Area -- Strobelt 2012 SSS*12
// TODO: SSS*12
var Spread = {
    ConvexHull: {
        area: function (initial, updated) {
            var initialHull = d3_polygon_1.default.polygonHull(convertNodes(initial.nodes));
            var updatedHull = d3_polygon_1.default.polygonHull(convertNodes(updated.nodes));
            if (initialHull === null || updatedHull === null)
                return {
                    value: -1,
                    error: "could not compute initial or updated convex hull"
                };
            var initialArea = d3_polygon_1.default.polygonArea(initialHull);
            var updatedArea = d3_polygon_1.default.polygonArea(updatedHull);
            return {
                value: updatedArea / initialArea,
                initial: initialArea,
                updated: updatedArea
            };
        }
    }
};
function convertNodes(nodes) {
    // TODO: add node boxes
    return lodash_1.default.flatMap(nodes, function (n) {
        var t = agora_graph_1.top(n), l = agora_graph_1.left(n), r = agora_graph_1.right(n), b = agora_graph_1.bottom(n);
        return [[l, t], [r, t], [r, b], [l, b]];
    });
}
exports.default = Spread;
