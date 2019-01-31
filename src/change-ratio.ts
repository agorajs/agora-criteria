import { Graph, Δ, Node, Point, length } from "agora-graph";
import { CriteriaFunction } from "./interfaces";

/**
 * TODO check if the edge distance order has changed, apply a levenshtein strategy on it :)
 * @param initialGraph
 * @param updatedGraph
 *
 * @deprecated have no idea of what it is anymore
 */
export const changeRatio: CriteriaFunction = function(
  initialGraph,
  updatedGraph
) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  if (initialNodes.length !== updatedNodes.length) {
    console.error(
      "criteria", // family
      "change-ratio", // type
      "abording", // action
      "not the same number of nodes" // reason
    );
    throw "Criteria change-ratio abording : not same number of nodes";
  }
  const nodesLength = initialNodes.length;

  let diffChange = 0;
  let displacement = [];

  // TODO : corriger cette abomination
  let refNode: Point = { x: 0, y: 0 };
  for (let i = 0; i < nodesLength; i++) {
    const node1 = initialNodes[i];
    const upNode1 = updatedNodes[i];
    for (let j = i + 1; j < nodesLength; j++) {
      const node2 = initialNodes[j];
      const upNode2 = updatedNodes[j];

      const initialDist = length(Δ(node1, node2));
      if (initialDist !== 0)
        diffChange += length(Δ(upNode1, upNode2)) / initialDist;
    }
  }

  return { value: diffChange / ((nodesLength * (nodesLength - 1)) / 2) };
};
