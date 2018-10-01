import { Δ, length, Edge, Point } from 'agora-graph'
import { CriteriaFunction } from './interfaces';

/**
 * Evaluates the updatedGraph using the Change criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 */
export const change: CriteriaFunction = function (initialGraph, updatedGraph): { value: number; displacement: Edge<Point>[]; } {
  const initialNodes = initialGraph.nodes
  const updatedNodes = updatedGraph.nodes

  if (initialNodes.length !== updatedNodes.length) {
    console.error(
      'criteria', // family
      'change', // type
      'abording', // action
      'not the same number of nodes' // reason
    )
    throw "Criteria change abording : not same number of nodes"
  }
  const nodesLength = initialNodes.length

  let change = 0
  let displacement = []

  for (let index = 0; index < nodesLength; index++) {
    const node = initialNodes[index]
    const upNode = updatedNodes[index]

    const diff = length(Δ(node, upNode))
    change += diff
    if (diff !== 0) {
      displacement.push({
        source: { x: node.x, y: node.y },
        target: { x: upNode.x, y: upNode.y }
      })
    }
  }

  return { value: change, displacement: displacement }
}
