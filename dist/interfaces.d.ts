import { Graph } from 'agora-graph';
export interface Dictionary<T> {
    [key: string]: T;
}
export interface CriteraiResult extends Dictionary<any> {
    value: number;
}
export interface CriteriaFunction {
    (initial: Graph, updated: Graph): CriteraiResult;
}
export interface Criteria<S extends string = string, N extends string = string> {
    short?: S;
    name: N;
    criteria: CriteriaFunction;
}
export declare function isCriteria(object: any): object is Criteria;
export interface Manager {
    /**
     * Contains the list of the evaluated criterias
     */
    criterias: {
        [key: string]: Criteria;
    };
    /**
     * Add a new criteria to evaluate
     * @param Criteria name of the criteria
     */
    add(this: Manager, ...criterias: Criteria[]): void;
    /**
     * Deletes the criteria from the evaluation
     * @param name name of the criteria
     */
    delete(this: Manager, name: string): void;
    /**
     * Runs all/given criterias against the updatedGraphs
     * @param initial initial graph disposition
     * @param updatedGraphs list of new graph dispositions
     * @param list list of criteria names to evaluate, if null then all the criteria are evaluated
     */
    batch(this: Manager, initial: Graph, updatedGraphs: {
        [key: string]: Graph;
    }, list?: string[]): any[];
    /**
     * Runs the given criteria agains the updatedGraphs list
     * @param criteria the criteria to evaluate
     * @param initial the initial graph disposition
     * @param updatedGraphs list of new graph dispositions
     */
    execute(this: Manager, criteria: string | Criteria, initial: Graph, updatedGraphs: {
        [key: string]: Graph;
    }): {
        results: Dictionary<CriteraiResult>;
        time: number;
    };
    /**
     * Evaluates the criteria for the updated graph
     * @param criteria the criteria to evaluate
     * @param initial initial graph disposition
     * @param updated updated graph disposition
     */
    evaluate(this: Manager, criteria: string | Criteria, initial: Graph, updated: Graph): CriteraiResult;
}
