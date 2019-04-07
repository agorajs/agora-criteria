import _ from "lodash";
import { vector, Edge, delaunay, length, norm } from "agora-graph";
import { CriteriaFunction, Criteria } from "../interfaces";

// TODO: LEN05
export const edgeRatioLen: CriteriaFunction = function (initial, updated) {
  if (initial.nodes.length !== updated.nodes.length) {
    console.error(
      "criteria", // family
      "edge-ratio-LEN05", // type
      "abording", // action
      "not the same number of nodes" // reason
    );
    throw "Criteria edge-ratio-LEN05 abording : not same number of nodes";
  }

  let min, max;
  for (const edge of updated.edges) {
    const u = updated.nodes[edge.source];
    const v = updated.nodes[edge.target];
    let norm_uv = norm(u, v);

    if (norm_uv === 0) continue;

    if (min === undefined || min > norm_uv) min = norm_uv;
    if (max === undefined || max < norm_uv) max = norm_uv;
  }

  if (max == undefined || min == undefined) {
    return { value: -1, error: "could not evaluate this criteria" };
  }
  return { value: max / min };
};

export const EdgeLengthRatioCriteria: Criteria = {
  criteria: edgeRatioLen,
  name: "edge-length/ratio",
  short: "el_r"
};
export default EdgeLengthRatioCriteria;
