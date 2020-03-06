"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var agora_graph_1 = require("agora-graph");
var utils_1 = require("../utils");
/**
 * TODO: GH10
 *
 * reference:  https://gitlab.com/graphviz/graphviz/blob/master/lib/sfdpgen/layout_similarity.c#L161-180
 * permalink reference : https://gitlab.com/graphviz/graphviz/blob/b0871968de2252653b001bf700ed98c240e8aad6/lib/sfdpgen/layout_similarity.c#L161-180
 *
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.edgeLength = function (initialGraph, updatedGraph, withDelaunay) {
    if (withDelaunay === void 0) { withDelaunay = true; }
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    var initialSorted = lodash_1.default.sortBy(initialNodes, 'index');
    var updatedSorted = lodash_1.default.sortBy(updatedNodes, 'index');
    var r = function (e) {
        // if source is equal to target, consider as same length
        if (e.source === e.target)
            return 1;
        var initLength = agora_graph_1.norm(initialSorted[e.source], initialSorted[e.target]);
        var uLength = agora_graph_1.norm(updatedSorted[e.source], updatedSorted[e.target]);
        return uLength / initLength;
    };
    /* not used and supposedly wrong
    const r_prime = (e: Edge) => {
      const initLength = norm(initialSorted[e.source], initialSorted[e.target]);
      const uLength = norm(updatedSorted[e.source], updatedSorted[e.target]);
      return initLength / uLength;
    }; */
    if (withDelaunay) {
        var delaunayEdges = agora_graph_1.delaunay(initialNodes);
        return { value: agora_graph_1.round(delta(delaunayEdges, r), -6) };
        /* this is how it should be done, but it is unclear about how do we manage r_prime calculation
        const delaunayEdgesPrime = delaunay(updatedNodes);
        return {
          value: round(
            (delta(delaunayEdges, r) + delta(delaunayEdgesPrime, r_prime)) / 2,
            -6
          )
        }; */
    }
    return { value: agora_graph_1.round(delta(initialGraph.edges, r), -6) };
};
function delta(edges, r) {
    var meanR = lodash_1.default.meanBy(edges, r);
    return (Math.sqrt(lodash_1.default.sumBy(edges, function (e) { return Math.pow(r(e) - meanR, 2); }) / edges.length) /
        meanR);
}
exports.EdgeBasedRelativeStandardDeviationDelaunayCriteria = utils_1.criteriaWrap({
    criteria: function (initial, updated) { return exports.edgeLength(initial, updated, true); },
    name: 'edge-based/relative-standard-deviation/delaunay',
    short: 'eb_rsdd'
});
exports.EdgeBasedRelativeStandardDeviationCriteria = utils_1.criteriaWrap({
    criteria: function (initial, updated) { return exports.edgeLength(initial, updated, false); },
    name: 'edge-based/relative-standard-deviation',
    short: 'eb_rsd'
});
exports.default = exports.EdgeBasedRelativeStandardDeviationDelaunayCriteria;
