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
exports.GlobalShapeConvexHullStandardShapePreservation = function (initial, updated) {
    // STEP 1 : retrieve convex hull
    var initialHull = d3.polygonHull(convertNodes(initial.nodes));
    var updatedHull = d3.polygonHull(convertNodes(updated.nodes));
    // STEP 1.1 : check for errors
    if (initialHull === null || updatedHull === null)
        return {
            value: -1,
            error: "could not compute initial or updated convex hull"
        };
    // DO STEP 2-3-4-5
    var initialDistances = calculateConvexHullDistances(initialHull);
    var updatedDistances = calculateConvexHullDistances(updatedHull);
    var d = [];
    for (var i = 0; i < initialDistances.length; i++) {
        d.push(initialDistances[i] / updatedDistances[i]);
    }
    var dMean = _.mean(d);
    var value = _.sumBy(d, function (dI) { return Math.pow((dI - dMean), 2); });
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
    elements.sort(function (a, b) { return a[1].angle - b[1].angle; });
    var buffer = elements[0];
    var rayIndex = 0;
    var distances = [];
    for (var cur = 1; cur < elements.length; cur++) {
        var polarPoint = elements[cur][1];
        var vectorPoint = elements[cur][0];
        // while it is before the current point we need to check if it is intersecting :)
        while (rays[rayIndex].angle < polarPoint.angle) {
            if (rays[rayIndex].angle < buffer[1].angle) {
                ++rayIndex;
                continue;
            }
            var cartesianRay = agora_graph_1.toCartesian(rays[rayIndex]);
            // calculating intersection
            var intersectionPoint = lineIntersection({ start: [0, 0], end: [cartesianRay.x, cartesianRay.y] }, { start: buffer[0], end: vectorPoint });
            //if they intersect
            if (intersectionPoint)
                distances.push(agora_graph_1.magnitude(intersectionPoint));
            else
                throw "it is supposed to intersect :(";
            ++rayIndex;
        }
        buffer = elements[cur];
    }
    // complete the circle
    var end = elements[0];
    // buffer = elements[last]
    var beginning = rayIndex; // where we start
    while (rays[rayIndex].angle < end[1].angle || rayIndex >= beginning) {
        var cartesianRay = agora_graph_1.toCartesian(rays[rayIndex]);
        var intersectionPoint = lineIntersection({ start: [0, 0], end: [cartesianRay.x, cartesianRay.y] }, { start: buffer[0], end: end[0] });
        //if they intersect
        if (intersectionPoint)
            distances.push(agora_graph_1.magnitude(intersectionPoint));
        else
            throw "it is supposed to intersect :(";
        rayIndex = (rayIndex + 1) % rays.length;
    }
    return distances;
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
function test() {
    console.log(calculateConvexHullDistances([[1, 1], [-1, 1], [-1, -1], [1, -1]]));
    console.log(calculateConvexHullDistances([[1, 0], [0, 1], [-1, 0], [0, -1]]));
}
exports.GlobalShapeConvexHullStandardShapePreservationCriteria = {
    criteria: exports.GlobalShapeConvexHullStandardShapePreservation,
    name: "global-shape/convex-hull/standard-shape-preservation",
    short: "gs_ch_ssp"
};
exports.default = exports.GlobalShapeConvexHullStandardShapePreservationCriteria;
