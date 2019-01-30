import { CriteriaFunction, Criteria } from "../interfaces";
import { right, left, bottom, top } from "agora-graph";

/**
 * TODO: MELS95
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const areaMels: CriteriaFunction = function(initialGraph, updatedGraph) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  if (initialNodes.length !== updatedNodes.length) {
    console.error(
      "criteria", // family
      "area-MELS95", // type
      "abording", // action
      "not the same number of nodes" // reason
    );
    throw "Criteria orthogonal-ordering abording : not same number of nodes";
  }

  const w = right(right(initialNodes)) - left(left(initialNodes));
  const h = bottom(bottom(initialNodes)) - top(top(initialNodes));
  const wp = right(right(updatedNodes)) - left(left(updatedNodes));
  const hp = bottom(bottom(updatedNodes)) - top(top(updatedNodes));

  return { value: (wp * hp) / (w * h) };
};

export const SpreadBoundingBoxAreaCriteria: Criteria = {
  criteria: areaMels,
  name: "spread/bounding-box/area",
  short: "sp_bb_a"
};

export default SpreadBoundingBoxAreaCriteria;
