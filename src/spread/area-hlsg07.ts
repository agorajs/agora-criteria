import { CriteriaFunction, Criteria } from '../interfaces';
import { right, left, bottom, top } from 'agora-graph';
import { criteriaWrap } from '../utils';

/**
 * TODO: HLSG07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const AreaNormalized: CriteriaFunction = function(
  initialGraph,
  updatedGraph
) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  const w = right(right(initialNodes)) - left(left(initialNodes));
  const h = bottom(bottom(initialNodes)) - top(top(initialNodes));
  const wp = right(right(updatedNodes)) - left(left(updatedNodes));
  const hp = bottom(bottom(updatedNodes)) - top(top(updatedNodes));

  return { value: 1 - (w * h) / (wp * hp) };
};

export const SpreadBoundingBoxAreaNormalizedCriteria = criteriaWrap({
  criteria: AreaNormalized,
  name: 'spread/bounding-box/area-normalized',
  short: 'sp_bb_an'
});

export default SpreadBoundingBoxAreaNormalizedCriteria;
