import { CriteriaFunction } from "./interfaces";
import { right, left, bottom, top } from "agora-graph";

/**
 * TODO: HLSG07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const areaHlsg: CriteriaFunction = function(initialGraph, updatedGraph) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  if (initialNodes.length !== updatedNodes.length) {
    console.error(
      "criteria", // family
      "area-HLSG07", // type
      "abording", // action
      "not the same number of nodes" // reason
    );
    throw "Criteria orthogonal-ordering abording : not same number of nodes";
  }

  const w = right(right(initialNodes)) - left(left(initialNodes));
  const h = bottom(bottom(initialNodes)) - top(top(initialNodes));
  const wp = right(right(updatedNodes)) - left(left(updatedNodes));
  const hp = bottom(bottom(updatedNodes)) - top(top(updatedNodes));

  return { value: 1 - (w * h) / (wp * hp) };
};
