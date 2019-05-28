import { CriteriaFunction } from '../../interfaces';
import { bottom, right, top, left, round } from 'agora-graph';
import { criteriaWrap } from '../../utils';

/**
 * checks how the aspect ratio has changed
 * @param initial
 * @param updated
 */
export const improvedAspectRatio: CriteriaFunction = function(
  initial,
  updated
) {
  const initialSize = [
      round(bottom(bottom(initial.nodes)) - top(top(initial.nodes))),
      round(right(right(initial.nodes)) - left(left(initial.nodes)))
    ],
    updatedSize = [
      round(bottom(bottom(updated.nodes)) - top(top(updated.nodes))),
      round(right(right(updated.nodes)) - left(left(updated.nodes)))
    ];

  return {
    value: Math.max(
      (initialSize[1] * updatedSize[0]) / (initialSize[0] * updatedSize[1]),
      (initialSize[0] * updatedSize[1]) / (initialSize[1] * updatedSize[0])
    ),
    updated: updatedSize,
    initial: initialSize
  };
};

export const GlobalShapeBoundingBoxImprovedAspectRatioCriteria = criteriaWrap({
  criteria: improvedAspectRatio,
  name: 'global-shape/bounding-box/improved-aspect-ratio',
  short: 'gs_bb_iar'
});
export default GlobalShapeBoundingBoxImprovedAspectRatioCriteria;
