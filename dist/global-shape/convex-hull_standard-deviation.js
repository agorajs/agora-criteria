"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = __importStar(require("d3-polygon"));
var _ = __importStar(require("lodash"));
var agora_graph_1 = require("agora-graph");
var utils_1 = require("../utils");
/**
 * TODO: SSS12
 */
exports.shapePreservation = function (initial, updated) {
    // STEP 1 : retrieve convex hull
    var initialHull = d3.polygonHull(convertNodes(initial.nodes));
    var updatedHull = d3.polygonHull(convertNodes(updated.nodes));
    // STEP 1.1 : check for errors
    if (initialHull === null || updatedHull === null)
        return {
            value: -1,
            error: 'could not compute initial or updated convex hull'
        };
    // DO STEP 2-3-4-5
    var initialDistances = calculateConvexHullDistances(initialHull);
    var updatedDistances = calculateConvexHullDistances(updatedHull);
    var d = [];
    for (var i = 0; i < initialDistances.length; i++) {
        d.push(updatedDistances[i] / initialDistances[i]);
    }
    var mean_d = _.mean(d);
    var value = _.sumBy(d, function (d_a) { return Math.pow((d_a - mean_d), 2); });
    return { value: value, initial: initialDistances, updated: updatedDistances };
};
function calculateConvexHullDistances(hull) {
    // STEP 2 get center of the hull and set as center
    var center = d3.polygonCentroid(hull);
    var centeredHull = _.map(hull, function (pos) { return [
        pos[0] - center[0],
        pos[1] - center[1]
    ]; });
    // STEP 3 create radian lines from center each 10 degrees.
    var rays = [];
    for (var angle = 0; angle < 360; angle += 10) {
        rays.push({
            angle: angle,
            length: 1,
            theta: agora_graph_1.round(angle * (Math.PI / 180), -14)
        });
    }
    // STEP 4 convert point of the hull to polar coordinates (to know which line do i need to raytrace)
    var elements = _.map(centeredHull, function (pos) { return [
        pos,
        agora_graph_1.toPolar({ x: pos[0], y: pos[1] })
    ]; });
    var lines = getLines(elements);
    var distances = [];
    _.forEach(rays, function (ray) {
        var line = getIntersectingLine(lines, ray);
        var cartesianRay = agora_graph_1.toCartesian(ray);
        var intersection = lineIntersection({ start: [0, 0], end: [cartesianRay.x, cartesianRay.y] }, { start: line.start[0], end: line.end[0] });
        if (intersection)
            distances.push(agora_graph_1.magnitude(intersection));
        else
            throw 'it is supposed to intersect :(';
    });
    return distances;
}
exports.calculateConvexHullDistances = calculateConvexHullDistances;
function getIntersectingLine(lines, ray) {
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (line.start[1] <= ray.angle && line.end[1] > ray.angle)
            return line;
    }
    // should never be in this case
    throw 'Cannot be here';
    return lines[0];
}
function getLines(elements) {
    var sorted = _.sortBy(elements, function (a) { return a[1].angle; });
    if (sorted.length === 0) {
        return [];
    }
    if (sorted.length === 1) {
        return [
            {
                start: [sorted[0][0], sorted[0][1].angle],
                end: [sorted[0][0], sorted[0][1].angle + 360]
            }
        ];
    }
    var lastEl = sorted[sorted.length - 1];
    var buffer = sorted[0];
    var lines = [
        {
            start: [lastEl[0], lastEl[1].angle - 360],
            end: [buffer[0], buffer[1].angle]
        }
    ];
    for (var i = 1; i < sorted.length; i++) {
        lines.push({
            start: [buffer[0], buffer[1].angle],
            end: [sorted[i][0], sorted[i][1].angle]
        });
        buffer = sorted[i];
    }
    lines.push({
        start: [buffer[0], buffer[1].angle],
        end: [sorted[0][0], sorted[0][1].angle + 360]
    });
    return lines;
}
function lineIntersection(line1, line2) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite)
    var denominator = (line2.end[1] - line2.start[1]) * (line1.end[0] - line1.start[0]) -
        (line2.end[0] - line2.start[0]) * (line1.end[1] - line1.start[1]);
    if (denominator == 0) {
        return null;
    }
    var a = line1.start[1] - line2.start[1];
    var b = line1.start[0] - line2.start[0];
    var numerator1 = (line2.end[0] - line2.start[0]) * a - (line2.end[1] - line2.start[1]) * b;
    var numerator2 = (line1.end[0] - line1.start[0]) * a - (line1.end[1] - line1.start[1]) * b;
    a = numerator1 / denominator;
    b = numerator2 / denominator;
    // if we cast these lines infinitely in both directions, they intersect here:
    return {
        x: line1.start[0] + a * (line1.end[0] - line1.start[0]),
        y: line1.start[1] + a * (line1.end[1] - line1.start[1])
    };
}
function convertNodes(nodes) {
    // TODO: add node boxes
    return _.flatMap(nodes, function (n) {
        var t = agora_graph_1.top(n), l = agora_graph_1.left(n), r = agora_graph_1.right(n), b = agora_graph_1.bottom(n);
        return [[l, t], [r, t], [r, b], [l, b]];
    });
}
exports.GlobalShapeConvexHullStandardDeviationCriteria = utils_1.criteriaWrap({
    criteria: exports.shapePreservation,
    name: 'global-shape/convex-hull/standard-deviation',
    short: 'gs_ch_sd'
});
exports.default = exports.GlobalShapeConvexHullStandardDeviationCriteria;
