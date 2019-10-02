import { Graph } from 'agora-graph';
import { Criteria } from './interfaces';

export function criteriaWrap<S extends string, N extends string>({
  name,
  criteria,
  short
}: Criteria<S, N>): Criteria<S, N> {
  return {
    name,
    short,
    criteria: (initial: Graph, updated: Graph) => {
      if (initial.nodes.length !== updated.nodes.length) {
        //* ignoring console because it's captured by the exception
        /*
       console.error(
        'criteria', // family
        criteria.short, // type
        'abording', // action
        'not the same number of nodes' // reason
      ); */

        throw Error(
          `Criteria ${short ? short : name} abording : not same number of nodes`
        );
      }
      return criteria(initial, updated);
    }
  };
}
