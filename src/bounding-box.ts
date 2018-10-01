import { CriteriaFunction } from "./interfaces";

/**
 * Evaluates the bounding box of the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, initial: number, updated: number}}
 */
export const boundingBox: CriteriaFunction = function (initialGraph, updatedGraph): { value: number; initial: number; updated: number; } {
  const initialNodes = initialGraph.nodes
  const updatedNodes = updatedGraph.nodes

  if (initialNodes.length !== updatedNodes.length) {
    console.error(
      'criteria', // family
      'bounding-box', // type
      'abording', // action
      'not the same number of nodes' // reason
    )
    throw "Criteria bounding-box abording : not same number of nodes"
  }
  const nodesLength = initialNodes.length

  const boundingBox = {
    initial: {
      x: { min: initialNodes[0].x, max: 0 },
      y: { min: initialNodes[0].y, max: 0 }
    },
    updated: {
      x: { min: updatedNodes[0].x, max: 0 },
      y: { min: updatedNodes[0].y, max: 0 }
    }
  }

  for (let index = 0; index < nodesLength; index++) {
    const node = initialNodes[index]
    const upNode = updatedNodes[index]

    const evaluate = {
      initial: {
        x: { min: node.x - node.width / 2, max: node.x + node.width / 2 },
        y: { min: node.y - node.height / 2, max: node.y + node.height / 2 }
      },
      updated: {
        x: {
          min: upNode.x - upNode.width / 2,
          max: upNode.x + upNode.width / 2
        },
        y: {
          min: upNode.y - upNode.height / 2,
          max: upNode.y + upNode.height / 2
        }
      }
    }

    if (evaluate.initial.x.min < boundingBox.initial.x.min) {
      boundingBox.initial.x.min = evaluate.initial.x.min
    }
    if (evaluate.initial.x.max > boundingBox.initial.x.max) {
      boundingBox.initial.x.max = evaluate.initial.x.max
    }
    if (evaluate.initial.y.min < boundingBox.initial.y.min) {
      boundingBox.initial.y.min = evaluate.initial.y.min
    }
    if (evaluate.initial.y.max > boundingBox.initial.y.max) {
      boundingBox.initial.y.max = evaluate.initial.y.max
    }

    if (evaluate.updated.x.min < boundingBox.updated.x.min) {
      boundingBox.updated.x.min = evaluate.updated.x.min
    }
    if (evaluate.updated.x.max > boundingBox.updated.x.max) {
      boundingBox.updated.x.max = evaluate.updated.x.max
    }
    if (evaluate.updated.y.min < boundingBox.updated.y.min) {
      boundingBox.updated.y.min = evaluate.updated.y.min
    }
    if (evaluate.updated.y.max > boundingBox.updated.y.max) {
      boundingBox.updated.y.max = evaluate.updated.y.max
    }
  }

  const surface = {
    initial:
      (boundingBox.initial.x.max - boundingBox.initial.x.min) *
      (boundingBox.initial.y.max - boundingBox.initial.y.min),
    updated:
      (boundingBox.updated.x.max - boundingBox.updated.x.min) *
      (boundingBox.updated.y.max - boundingBox.updated.y.min)
  }

  return { value: surface.updated / surface.initial, ...surface }
}
