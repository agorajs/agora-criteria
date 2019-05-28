import _ from 'lodash';

import { Manager, isCriteria, CriteriaResult, Criteria } from './interfaces';
import EdgeLength from './edge';
import GlobalShape from './global-shape';
import NodeMovement from './node-movement';
import OrthogonalOrdering from './orthogonal-ordering';
import Spread from './spread';

export { EdgeLength, GlobalShape, NodeMovement, OrthogonalOrdering, Spread };

export const manager: Manager = {
  criterias: {},
  add(...criterias: Criteria[]) {
    _.forEach(criterias, c => {
      const { name } = c;

      if (!this.criterias[name]) this.criterias[name] = c;
      else console.error('criterias', 'add', name);
    });
  },

  delete(name) {
    if (this.criterias[name]) delete this.criterias[name];
    else console.error('criterias', 'delete', name);
  },

  batch(
    this: Manager,
    initial,
    updatedGraphs,
    list = _.keys(this.criterias)
  ): any[] {
    console.group('criterias');

    const results: object[] = [];
    _.forEach(list, name => {
      results.push({
        name: name,
        ...this.execute(name, initial, updatedGraphs)
      });
    });

    console.groupEnd();

    return results;
  },

  execute(criteria, initial, updatedGraphs) {
    if (typeof criteria === 'string') {
      if (this.criterias[criteria]) criteria = this.criterias[criteria];
      throw 'Criteria does not exist';
    }

    if (!isCriteria(criteria)) throw criteria + ' is not a criterai';

    const results: { [key: string]: CriteriaResult } = {};
    console.group(criteria.name);
    const start = new Date();
    _.forEach(updatedGraphs, (updated, name) => {
      results[name] = this.evaluate(criteria, initial, updated);
    });
    const diff: number = new Date().getTime() - start.getTime();
    console.groupEnd();

    return { results: results, time: diff };
  },

  evaluate(criteria, initial, updated) {
    if (typeof criteria === 'string') {
      if (this.criterias[criteria]) criteria = this.criterias[criteria];
      else throw 'criteria ' + criteria + ' was not added';
    }

    if (isCriteria(criteria)) return criteria.criteria(initial, updated);
    throw 'reached unreachable code (should not happen though)';
  }
};

export default manager;
