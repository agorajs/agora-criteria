import { CriteriaFunction } from '../../interfaces';
import { right, left, bottom, top } from 'agora-graph';
import { criteriaWrap } from '../../utils';

/**
 * TODO: HLSG07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const lambda3: CriteriaFunction = function(initialGraph, updatedGraph) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  const w = right(right(initialNodes)) - left(left(initialNodes));
  const h = bottom(bottom(initialNodes)) - top(top(initialNodes));
  const wp = right(right(updatedNodes)) - left(left(updatedNodes));
  const hp = bottom(bottom(updatedNodes)) - top(top(updatedNodes));

  return { value: 1 - (w * h) / (wp * hp) };
};

export const SpreadBoundingBoxNormalizedAreaCriteria = criteriaWrap({
  criteria: lambda3,
  name: 'spread/bounding-box/normalized-area',
  short: 'sp_bb_na'
});

export default SpreadBoundingBoxNormalizedAreaCriteria;
