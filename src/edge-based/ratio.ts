import { norm, Graph } from 'agora-graph';
import { CriteriaFunction } from '../interfaces';
import { criteriaWrap } from '../utils';

// TODO: LEN05
export const edgeRatioLen: CriteriaFunction = function(initial, updated) {
  let ratioOfInitial = calculateEdgeRatio(initial);
  let ratioOfUpdated = calculateEdgeRatio(updated);
  return {
    value: ratioOfUpdated / ratioOfInitial,
    initial: ratioOfInitial,
    updated: ratioOfUpdated
  };
};

function calculateEdgeRatio(graph: Graph): number {
  let min, max;
  for (const edge of graph.edges) {
    const u = graph.nodes[edge.source];
    const v = graph.nodes[edge.target];
    let norm_uv = norm(u, v);

    if (norm_uv === 0) continue;

    if (min === undefined || min > norm_uv) min = norm_uv;
    if (max === undefined || max < norm_uv) max = norm_uv;
  }

  if (max == undefined || min == undefined)
    throw 'could not evaluate edge-based/ratio';
  return max / min;
}

export const EdgeBasedRatioCriteria = criteriaWrap({
  criteria: edgeRatioLen,
  name: 'edge-based/ratio',
  short: 'eb_r'
});
export default EdgeBasedRatioCriteria;
