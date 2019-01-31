"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var agora_graph_1 = require("agora-graph");
/**
 * TODO: GH10
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.edgeLengthGh = function (initialGraph, updatedGraph) {
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    if (initialNodes.length !== updatedNodes.length) {
        console.error("criteria", // family
        "edge-length-GH10", // type
        "abording", // action
        "not the same number of nodes" // reason
        );
        throw "Criteria edge-length-GH10 abording : not same number of nodes";
    }
    var delaunayEdges = agora_graph_1.delaunay(initialNodes);
    var delaunayEdgesPrime = agora_graph_1.delaunay(updatedNodes);
    var initialSorted = lodash_1.default.sortBy(initialNodes, "index");
    var updatedSorted = lodash_1.default.sortBy(updatedNodes, "index");
    var r = function (e) {
        var initLength = agora_graph_1.norm(initialSorted[e.source], initialSorted[e.target]);
        var uLenght = agora_graph_1.norm(updatedSorted[e.source], updatedSorted[e.target]);
        return uLenght / initLength;
    };
    var r_prime = function (e) {
        var initLength = agora_graph_1.norm(initialSorted[e.source], initialSorted[e.target]);
        var uLength = agora_graph_1.norm(updatedSorted[e.source], updatedSorted[e.target]);
        return initLength / uLength;
    };
    return {
        value: (delta(delaunayEdges, r) + delta(delaunayEdgesPrime, r_prime)) / 2
    };
};
function delta(edges, r) {
    var meanR = lodash_1.default.meanBy(edges, r);
    return (Math.sqrt(lodash_1.default.sumBy(edges, function (e) { return Math.pow(r(e) - meanR, 2); }) / edges.length) /
        meanR);
}
exports.EdgeLengthRelativeStandardDeviationCriteria = {
    criteria: exports.edgeLengthGh,
    name: "edge-length/relative-standard-deviation",
    short: "el_rsd"
};
exports.default = exports.EdgeLengthRelativeStandardDeviationCriteria;
