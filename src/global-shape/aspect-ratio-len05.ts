import { CriteriaFunction, Criteria } from "../interfaces";
import { right, left, bottom, top } from "agora-graph";

/**
 * TODO: LEN05
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const aspectRatioLen: CriteriaFunction = function(
  initialGraph,
  updatedGraph
) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  if (initialNodes.length !== updatedNodes.length) {
    console.error(
      "criteria", // family
      "aspect-ratio-LEN05", // type
      "abording", // action
      "not the same number of nodes" // reason
    );
    throw "Criteria aspect-ratio-LEN05 abording : not same number of nodes";
  }

  const w = right(right(initialNodes)) - left(left(initialNodes));
  const h = bottom(bottom(initialNodes)) - top(top(initialNodes));
  const wp = right(right(updatedNodes)) - left(left(updatedNodes));
  const hp = bottom(bottom(updatedNodes)) - top(top(updatedNodes));

  return { value: wp > hp ? (wp * h) / (hp * w) : (hp * w) / (wp * h) };
};

export const GlobalShapeBoundingBoxAspectRatioCriteria: Criteria = {
  criteria: aspectRatioLen,
  name: "global-shape/bounding-box/aspect-ratio",
  short: "gs_bb_ar"
};
export default GlobalShapeBoundingBoxAspectRatioCriteria;
