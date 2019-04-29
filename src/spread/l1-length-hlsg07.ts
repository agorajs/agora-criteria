import { Graph, round, top, bottom, left, right } from 'agora-graph';
import { CriteriaFunction, Criteria } from '../interfaces';
import { criteriaWrap } from '../utils';

/**
 * TODO : HLSG07
 * @param initial
 * @param updated
 */
export const l1Length: CriteriaFunction = function(
  initial,
  updated
): { value: number; initial: number; updated: number } {
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

export const SpreadBoundingBoxL1MetriclengthCriteria: Criteria = criteriaWrap({
  criteria: l1Length,
  name: 'spread/bounding-box/l1-metric-length',
  short: 'sp_bb_l1ml'
});

export default SpreadBoundingBoxL1MetriclengthCriteria;
