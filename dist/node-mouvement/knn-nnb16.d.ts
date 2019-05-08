import { Graph } from 'agora-graph';
import { CriteriaResult } from '../interfaces';
/**
 * TODO: NNB*16
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 */
export declare const kNearestNeighborsNNB: (initialGraph: Graph<number>, updatedGraph: Graph<number>, options: {
    k: number;
}) => CriteriaResult;
export declare function createKNearestNeighborsCriteria(k?: number): import("../interfaces").Criteria<string, string>;
export declare const NodeMouvement8NearestNeighborsCriteria: import("../interfaces").Criteria<string, string>;
export default NodeMouvement8NearestNeighborsCriteria;
