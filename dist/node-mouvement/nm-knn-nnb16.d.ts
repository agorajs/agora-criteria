import { Graph } from "agora-graph";
import { Criteria, CriteraiResult } from "../interfaces";
/**
 * TODO: NNB*16
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 */
export declare const kNearestNeighborsNNB: (initialGraph: Graph<number>, updatedGraph: Graph<number>, options: {
    k: number;
}) => CriteraiResult;
export declare function createKNearestNeighborsCriteria(k?: number): Criteria;
export declare const NodeMouvement8NearestNeighborsCriteria: Criteria;
export default NodeMouvement8NearestNeighborsCriteria;
