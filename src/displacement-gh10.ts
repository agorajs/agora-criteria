import { Graph, length, vector, magnitude } from "agora-graph";
import _ from "lodash";
import math from "mathjs";
import { CriteriaFunction } from "./interfaces";

/**
 * TODO: https://gitlab.com/graphviz/graphviz/blob/master/lib/sfdpgen/layout_similarity.c
 * TODO: https://github.com/prlz77/prlz77.cvtools/blob/master/procrustes_align.py
 * TODO: GH10
 *
 * https://stackoverflow.com/a/18927641
 * TODO : this is onhold because of procrutes and svd
 * @param initial
 * @param updated
 */
export const displacementGh: CriteriaFunction = function(initial, updated) {
  if (initial.nodes.length !== updated.nodes.length) {
    console.error(
      "criteria", // family
      "displacement-GH10", // type
      "abording", // action
      "not the same number of nodes" // reason
    );
    throw "Criteria displacement-GH10 abording : not same number of nodes";
  }

  initial.nodes.sort((a, b) => a.index - b.index);
  updated.nodes.sort((a, b) => a.index - b.index);

  const meanX_0 = {
    x: _.meanBy(initial.nodes, "x"),
    y: _.meanBy(initial.nodes, "y")
  };
  const meanX = {
    x: _.meanBy(updated.nodes, "x"),
    y: _.meanBy(updated.nodes, "y")
  };
  const X_0T = _.map(initial.nodes, n => [n.x - meanX_0.x, n.y - meanX_0.y]);
  const X_0 = math.transpose(X_0T) as number[][];

  const XT = _.map(updated.nodes, n => [n.x - meanX.x, n.y - meanX.y]);
  const X = math.transpose(XT) as number[][];

  // console.log(normalement c'est ca :/)
  const answer =
    math.trace(math.multiply(X_0, X_0T)) -
    math.trace(
      math
        .chain(XT)
        .multiply(X_0)
        .multiply(X_0T)
        .multiply(X)
        .sqrt()
        .done()
    ) **
      2 *
      math.trace(math.multiply(XT, X));

  return { value: answer };
};
