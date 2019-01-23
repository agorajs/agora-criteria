import _ from "lodash";

import { Manager, Criteria, isCriteria, CriteraiResult } from "./interfaces";
export * from "./aspect-ratio";
export * from "./bounding-box";
export * from "./change-ratio";
export * from "./change";
export * from "./l1-length-hlsg07";
export * from "./orthogonal-ordering";
export * from "./displacement-gh10";
export * from "./edge-ratio-len05";
export * from "./scale-change";

export const manager: Manager = {
  criterias: {},
  add(name, f, short) {
    const obj: Criteria = { name: name, criteria: f };

    if (short) {
      obj.short = short;
    }

    if (!this.criterias[name]) this.criterias[name] = obj;
    else console.error("criterias", "add", "lol");
  },

  delete(name) {
    if (this.criterias[name]) delete this.criterias[name];
    else console.error("criterias", "delete", "lol");
  },

  batch(initial, updatedGraphs, list): any[] {
    if (!list) {
      list = _.map(this.criterias, c => {
        return c.name;
      });
    }

    console.group("criterias");

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
    if (typeof criteria === "string") {
      if (this.criterias[criteria]) criteria = this.criterias[criteria];
      throw "Criteria does not exist";
    }

    if (!isCriteria(criteria)) throw criteria + " is not a criterai";

    const results: { [key: string]: CriteraiResult } = {};
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
    if (typeof criteria === "string") {
      if (this.criterias[criteria]) criteria = this.criterias[criteria];
      else throw "Criteria not added";
    }

    if (isCriteria(criteria)) return criteria.criteria(initial, updated);
    throw "Error while evaluating (should not happen though)";
  }
};

export default manager;
