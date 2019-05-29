import _ from 'lodash';
import { Edge, delaunay, norm, Graph, round } from 'agora-graph';
import { criteriaWrap } from '../utils';

/**
 * TODO: GH10
 *
 * reference:  https://gitlab.com/graphviz/graphviz/blob/master/lib/sfdpgen/layout_similarity.c#L161-180
 * permalink reference : https://gitlab.com/graphviz/graphviz/blob/b0871968de2252653b001bf700ed98c240e8aad6/lib/sfdpgen/layout_similarity.c#L161-180
 *
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

  const initialSorted = _.sortBy(initialNodes, 'index');
  const updatedSorted = _.sortBy(updatedNodes, 'index');

  const r = (e: Edge) => {
    const initLength = norm(initialSorted[e.source], initialSorted[e.target]);
    const uLength = norm(updatedSorted[e.source], updatedSorted[e.target]);
    return uLength / initLength;
  };

  /* not used and supposedly wrong 
  const r_prime = (e: Edge) => {
    const initLength = norm(initialSorted[e.source], initialSorted[e.target]);
    const uLength = norm(updatedSorted[e.source], updatedSorted[e.target]);
    return initLength / uLength;
  }; */

  if (withDelaunay) {
    const delaunayEdges = delaunay(initialNodes);
    return { value: round(delta(delaunayEdges, r), -6) };
    /* this is how it should be done, but it is unclear about how do we manage r_prime calculation
    const delaunayEdgesPrime = delaunay(updatedNodes);
    return {
      value: round(
        (delta(delaunayEdges, r) + delta(delaunayEdgesPrime, r_prime)) / 2,
        -6
      )
    }; */
  }

  return { value: round(delta(initialGraph.edges, r), -6) };
};

function delta(edges: Edge[], r: (e: Edge) => number) {
  const meanR = _.meanBy(edges, r);

  return (
    Math.sqrt(_.sumBy(edges, e => Math.pow(r(e) - meanR, 2)) / edges.length) /
    meanR
  );
}

export const EdgeBasedRelativeStandardDeviationDelaunayCriteria = criteriaWrap({
  criteria: (initial, updated) => edgeLength(initial, updated, true),
  name: 'edge-based/relative-standard-deviation/delaunay',
  short: 'e_rsdd'
});

/**
 * @deprecated
 */
export const EdgeBasedRelativeStandardDeviationCriteria = criteriaWrap({
  criteria: (initial, updated) => edgeLength(initial, updated, false),
  name: 'edge-based/relative-standard-deviation',
  short: 'e_rsd'
});
export default EdgeBasedRelativeStandardDeviationDelaunayCriteria;
