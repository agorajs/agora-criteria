import _ from 'lodash';
import { Graph, Point, Node, norm, round } from 'agora-graph';
import { criteriaWrap } from '../utils';
import { CriteriaResult } from '../interfaces';

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
    throw `Criteria nm_dm_c getSpan error either: ${min} or ${max}`;
  }

  return max[orientation] / 2 + min[orientation] / 2;
}

function getSpan(nodes: Node[], orientation: 'x' | 'y') {
  const min = _.minBy(nodes, orientation);
  const max = _.maxBy(nodes, orientation);

  if (!min || !max) {
    throw `Criteria nm_dm_c getSpan error either: ${min} or ${max}`;
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

  console.log(initialCenteredNodes, updatedCenteredNodes);

  return _.reduce<IndexedPoint, { value: number; displacement: number[] }>(
    initialCenteredNodes,
    ({ value, displacement }, { x, y, index }) => {
      const projected = {
        x: round(x * scale.x, -9),
        y: round(y * scale.y, -9)
      };

      const up = _.find(updatedCenteredNodes, ['index', index]);

      if (!up)
        throw `Criteria nm_dm_c : index ${index} does not exist in updated`;

      const diff = norm(projected, up);
      value += diff;
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

export const NodeMouvementDistanceMovedCustomCriteria = criteriaWrap({
  criteria: scaleChange,
  name: 'node-mouvement/distance-moved/custom',
  short: 'nm_dm_c'
});
export default NodeMouvementDistanceMovedCustomCriteria;
