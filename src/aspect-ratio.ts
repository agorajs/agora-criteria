import { CriteriaFunction } from './interfaces'
import { bottom, right, top, left, round } from 'agora-graph'

/**
 * checks how the aspect ratio has changed
 * @param initial
 * @param updated
 */
export const aspectRatio: CriteriaFunction = function (initial, updated) {
  if (initial.nodes.length !== updated.nodes.length) {
    console.error(
      'criteria', // family
      'change-ratio', // type
      'abording', // action
      'not the same number of nodes' // reason
    )
    throw "Criteria change-ratio abording : not same number of nodes"
  }

  const initialSize = [
    round(bottom(bottom(initial.nodes)) - top(top(initial.nodes))),
    round(right(right(initial.nodes)) - left(left(initial.nodes)))
  ],
    updatedSize = [
      round(bottom(bottom(updated.nodes)) - top(top(updated.nodes))),
      round(right(right(updated.nodes)) - left(left(updated.nodes)))
    ]


  return {
    value: Math.max(
      (initialSize[0] * updatedSize[0]) / (initialSize[1] * updatedSize[1]),
      (initialSize[0] * updatedSize[1]) / (initialSize[1] * updatedSize[0])),
    updated: updatedSize,
    initial: initialSize
  }
}
