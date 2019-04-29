import _ from 'lodash';
import { Edge, delaunay, norm, Graph } from 'agora-graph';
import { CriteriaFunction, Criteria } from '../interfaces';

/**
 * TODO: GH10
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const edgeLength = function(
  initialGraph: Graph<number>,
  updatedGraph: Graph<number>,
  withDelaunay = true
) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  if (initialNodes.length !== updatedNodes.length) {
    console.error(
      'criteria', // family
      'edge-length-GH10', // type
      'abording', // action
      'not the same number of nodes' // reason
    );
    throw 'Criteria edge-length-GH10 abording : not same number of nodes';
  }

  const initialSorted = _.sortBy(initialNodes, 'index');
  const updatedSorted = _.sortBy(updatedNodes, 'index');

  const r = (e: Edge) => {
    const initLength = norm(initialSorted[e.source], initialSorted[e.target]);
    const uLenght = norm(updatedSorted[e.source], updatedSorted[e.target]);
    return uLenght / initLength;
  };

  const r_prime = (e: Edge) => {
    const initLength = norm(initialSorted[e.source], initialSorted[e.target]);
    const uLength = norm(updatedSorted[e.source], updatedSorted[e.target]);
    return initLength / uLength;
  };

  if (withDelaunay) {
    const delaunayEdges = delaunay(initialNodes);
    const delaunayEdgesPrime = delaunay(updatedNodes);

    return {
      value: (delta(delaunayEdges, r) + delta(delaunayEdgesPrime, r_prime)) / 2
    };
  }

  return {
    value:
      (delta(initialGraph.edges, r) + delta(updatedGraph.edges, r_prime)) / 2
  };
};

function delta(edges: Edge[], r: (e: Edge) => number) {
  const meanR = _.meanBy(edges, r);

  return (
    Math.sqrt(_.sumBy(edges, e => Math.pow(r(e) - meanR, 2)) / edges.length) /
    meanR
  );
}

export const EdgeRelativeStandardDeviationDelaunayCriteria: Criteria = {
  criteria: (initial, updated) => edgeLength(initial, updated, true),
  name: 'edge/relative-standard-deviation/delaunay',
  short: 'e_rsd_d'
};

export const EdgeRelativeStandardDeviationCriteria: Criteria = {
  criteria: (initial, updated) => edgeLength(initial, updated, false),
  name: 'edge/relative-standard-deviation',
  short: 'e_rsd'
};
export default EdgeRelativeStandardDeviationDelaunayCriteria;
