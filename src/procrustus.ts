import { Graph, length, vector, magnitude } from "agora-graph";
import _ from 'lodash'
import math from "mathjs";
import { CriteriaFunction } from "./interfaces";

// gasner 2008 (displacement)
export const procrustus: CriteriaFunction = function (initial, updated) {
  if (initial.nodes.length !== updated.nodes.length) {
    console.error(
      'criteria', // family
      'ratio-edges', // type
      'abording', // action
      'not the same number of nodes' // reason
    )
    throw "Criteria procrustus abording : not same number of nodes"
  }

  initial.nodes.sort((a, b) => a.index - b.index)
  updated.nodes.sort((a, b) => a.index - b.index)



  const meanX_0 = {
    x: _.meanBy(initial.nodes, 'x'), y: _.meanBy(initial.nodes, 'y')
  }
  const meanX = {
    x: _.meanBy(updated.nodes, 'x'), y: _.meanBy(updated.nodes, 'y')
  }
  const X_0T = _.map(initial.nodes, (n) => [n.x - meanX_0.x, n.y - meanX_0.y])
  const X_0 = math.transpose(X_0T) as number[][]


  const XT = _.map(updated.nodes, (n) => [n.x - meanX.x, n.y - meanX.y])
  const X = math.transpose(XT) as number[][]


  // console.log(normalement c'est ca :/)
  const answer = math.trace(math.multiply(X_0, X_0T)) -
    (math.trace(math.chain(XT)
      .multiply(X_0)
      .multiply(X_0T)
      .multiply(X).sqrt().done()
    ) ** 2) *
    math.trace(math.multiply(XT, X))


  return { value: answer }
}
