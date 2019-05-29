import { CriteriaFunction } from '../../interfaces';
import { right, left, bottom, top } from 'agora-graph';
import { criteriaWrap } from '../../utils';

/**
 * TODO: LEN05
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const aspectRatio: CriteriaFunction = function(
  initialGraph,
  updatedGraph
) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  const w = right(right(initialNodes)) - left(left(initialNodes));
  const h = bottom(bottom(initialNodes)) - top(top(initialNodes));
  const wp = right(right(updatedNodes)) - left(left(updatedNodes));
  const hp = bottom(bottom(updatedNodes)) - top(top(updatedNodes));

  return { value: wp > hp ? (wp * h) / (hp * w) : (hp * w) / (wp * h) };
};

export const GlobalShapeBoundingBoxAspectRatioCriteria = criteriaWrap({
  criteria: aspectRatio,
  name: 'global-shape/bounding-box/aspect-ratio',
  short: 'gs_bb_ar'
});
export default GlobalShapeBoundingBoxAspectRatioCriteria;
