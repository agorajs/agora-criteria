import _ from 'lodash';

import { Manager, isCriteria, CriteriaResult, Criteria } from './interfaces';
import EdgeBased from './edge-based';
import GlobalShape from './global-shape';
import NodeMovement from './node-movement';
import OrthogonalOrdering from './orthogonal-ordering';
import Spread from './spread';

export { EdgeBased, GlobalShape, NodeMovement, OrthogonalOrdering, Spread };

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
    const results: object[] = [];
    _.forEach(list, name => {
      results.push({
        name: name,
        ...this.execute(name, initial, updatedGraphs)
      });
    });

    return results;
  },

  execute(criteria, initial, updatedGraphs) {
    if (typeof criteria === 'string') {
      if (this.criterias[criteria]) criteria = this.criterias[criteria];
      throw Error("Cannot execute a criteria that wasn't added : " + criteria);
    }

    if (!isCriteria(criteria))
      throw Error(
        criteria + ' cannot be used as a criteria, the structure does not match'
      );

    const results: { [key: string]: CriteriaResult } = {};

    const start = new Date();
    _.forEach(updatedGraphs, (updated, name) => {
      results[name] = this.evaluate(criteria, initial, updated);
    });
    const diff: number = new Date().getTime() - start.getTime();

    return { results: results, time: diff };
  },

  evaluate(criteria, initial, updated) {
    if (typeof criteria === 'string') {
      if (this.criterias[criteria]) criteria = this.criterias[criteria];
      else
        throw Error(
          "Cannot execute a criteria that wasn't added : " + criteria
        );
    }

    if (isCriteria(criteria)) return criteria.criteria(initial, updated);
    throw Error(
      criteria + ' cannot be used as a criteria, the structure does not match'
    );
  }
};

export default manager;
