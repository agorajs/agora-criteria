import d3 from "d3-polygon";
import _ from "lodash";
import { CriteriaFunction, CriteraiResult, Criteria } from "../interfaces";
import { Node, top, left, right, bottom } from "agora-graph";

// Spread::Convex Hull::Area -- Strobelt 2012 SSS*12
// TODO: SSS*12
export const SpreadConvexHullArea: CriteriaFunction = function(
  initial,
  updated
): CriteraiResult {
  const initialHull = d3.polygonHull(convertNodes(initial.nodes));
  const updatedHull = d3.polygonHull(convertNodes(updated.nodes));

  if (initialHull === null || updatedHull === null)
    return {
      value: -1,
      error: "could not compute initial or updated convex hull"
    };

  const initialArea = d3.polygonArea(initialHull);
  const updatedArea = d3.polygonArea(updatedHull);

  return {
    value: updatedArea / initialArea,
    initial: initialArea,
    updated: updatedArea
  };
};

function convertNodes(nodes: Node[]): [number, number][] {
  // TODO: add node boxes
  return _.flatMap(nodes, n => {
    const t = top(n),
      l = left(n),
      r = right(n),
      b = bottom(n);

    return [[l, t], [r, t], [r, b], [l, b]] as [number, number][];
  });
}

export const SpreadConvexHullAreaCriteria: Criteria = {
  criteria: SpreadConvexHullArea,
  name: "spread/convex-hull/area",
  short: "sp_ch_a"
};
export default SpreadConvexHullAreaCriteria;
