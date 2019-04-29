import { Graph } from 'agora-graph';
import { Criteria, CriteriaFunction } from './interfaces';

export function criteriaWrap({ name, criteria, short }: Criteria): Criteria {
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

        throw `Criteria ${
          short ? short : name
        } abording : not same number of nodes`;
      }
      return criteria(initial, updated);
    }
  };
}
