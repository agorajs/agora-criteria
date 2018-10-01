import _ from 'lodash'
import { vector, Edge, delaunay, length } from 'agora-graph'
import { CriteriaFunction } from './interfaces';

// Gasner 2008 (delta_distance)
export const ratioEdges: CriteriaFunction = function (initial, updated) {
  if (initial.nodes.length !== updated.nodes.length) {
    console.error(
      'criteria', // family
      'ratio-edges', // type
      'abording', // action
      'not the same number of nodes' // reason
    )
    throw "Criteria ratio-edges abording : not same number of nodes"
  }

  const delaunayEdges = delaunay(initial.nodes)
  const initialSorted = _.sortBy(initial.nodes, 'index')
  const updatedSorted = _.sortBy(updated.nodes, 'index')

  const r = (e: Edge) => {
    const initLenght = length(vector(
      initialSorted[e.source],
      initialSorted[e.target]))
    const updatedLenght = length(vector(
      updatedSorted[e.source],
      updatedSorted[e.target]))
    return updatedLenght / initLenght
  }

  const meanR = _.meanBy(delaunayEdges, r)

  return {
    value: Math.sqrt(_.sumBy(delaunayEdges, (e) => Math.pow(r(e) - meanR, 2)) / delaunayEdges.length)
      / meanR
  }
}
