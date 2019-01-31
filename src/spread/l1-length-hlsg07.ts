import { Graph, round, top, bottom, left, right } from "agora-graph";
import { CriteriaFunction, Criteria } from "../interfaces";

/**
 * TODO : HLSG07
 * @param initial
 * @param updated
 */
export const l1Length: CriteriaFunction = function(
  initial,
  updated
): { value: number; initial: number; updated: number } {
  if (initial.nodes.length !== updated.nodes.length) {
    console.error(
      "criteria", // family
      "l1-length", // type
      "abording", // action
      "not the same number of nodes" // reason
    );
    throw "Criteria l1-length abording : not same number of nodes";
  }

  const initialResult = Math.max(
    round(bottom(bottom(initial.nodes)) - top(top(initial.nodes))),
    round(right(right(initial.nodes)) - left(left(initial.nodes)))
  );
  const updatedResult = Math.max(
    round(bottom(bottom(updated.nodes)) - top(top(updated.nodes))),
    round(right(right(updated.nodes)) - left(left(updated.nodes)))
  );

  return {
    value: initialResult !== 0 ? updatedResult / initialResult : -1,
    initial: initialResult,
    updated: updatedResult
  };
};

export const SpreadBoundingBoxL1MetriclengthCriteria: Criteria = {
  criteria: l1Length,
  name: "spread/bounding-box/l1-metric-length",
  short: "sp_bb_l1ml"
};

export default SpreadBoundingBoxL1MetriclengthCriteria;
