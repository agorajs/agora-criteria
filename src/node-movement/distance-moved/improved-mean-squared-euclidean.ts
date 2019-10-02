import _ from 'lodash';
import { Graph, Point, Node, norm, round } from 'agora-graph';
import { criteriaWrap } from '../../utils';
import { CriteriaResult } from '../../interfaces';

interface IndexedPoint extends Point {
  index: number;
}

/**
 * scale to transform a to b
 * @param a first value
 * @param b second value
 */
const getScale = (a: number, b: number): number => b / a;

function getCenter(nodes: Node[], orientation: 'x' | 'y') {
  const min = _.minBy(nodes, orientation);
  const max = _.maxBy(nodes, orientation);

  if (!min || !max) {
    throw Error(`Criteria nm_dm_imse getCenter error either: ${min} or ${max}`);
  }

  return max[orientation] / 2 + min[orientation] / 2;
}

function getSpan(nodes: Node[], orientation: 'x' | 'y') {
  const min = _.minBy(nodes, orientation);
  const max = _.maxBy(nodes, orientation);

  if (!min || !max) {
    throw Error(`Criteria nm_dm_imse getSpan error either: ${min} or ${max}`);
  }

  return max[orientation] - min[orientation];
}

export function scaleChange(initial: Graph, updated: Graph): CriteriaResult {
  const nodesLength = initial.nodes.length;

  const scale = {
    x: getScale(getSpan(initial.nodes, 'x'), getSpan(updated.nodes, 'x')),
    y: getScale(getSpan(initial.nodes, 'y'), getSpan(updated.nodes, 'y'))
  };

  const initialCenteredNodes = _.sortBy(
    positionFromCenter(initial.nodes),
    'index'
  );
  const updatedCenteredNodes = _.sortBy(
    positionFromCenter(updated.nodes),
    'index'
  );

  return _.reduce<IndexedPoint, { value: number; displacement: number[] }>(
    initialCenteredNodes,
    ({ value, displacement }, { x, y, index }) => {
      const projected = {
        x: round(x * scale.x, -9),
        y: round(y * scale.y, -9)
      };

      const up = _.find(updatedCenteredNodes, ['index', index]);

      if (!up)
        throw Error(
          `Criteria nm_dm_imse : index ${index} does not exist in updated`
        );

      const diff = norm(projected, up);
      value += (diff * diff) / nodesLength;
      displacement.push(diff);

      return { value, displacement };
    },
    { value: 0, displacement: [] }
  );
}

function positionFromCenter(nodes: Node[]): IndexedPoint[] {
  const center_x = getCenter(nodes, 'x');
  const center_y = getCenter(nodes, 'y');

  return _.map(nodes, ({ index, x, y }) => ({
    index,
    x: x - center_x,
    y: y - center_y
  }));
}

export const NodeMovementDistanceMovedImprovedMeanSquaredEuclideanCriteria = criteriaWrap(
  {
    criteria: scaleChange,
    name: 'node-movement/distance-moved/improved-mean-squared-euclidean',
    short: 'nm_dm_imse'
  }
);
export default NodeMovementDistanceMovedImprovedMeanSquaredEuclideanCriteria;
