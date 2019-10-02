import { CriteriaFunction, Criteria } from '../../interfaces';
/**
 * TODO: SSS*12
 * Evaluates the updatedGraph using the Change criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 */
export declare const euclideanDistance: CriteriaFunction;
export declare const NodeMovementDistanceMovedMeanEuclideanCriteria: Criteria<"nm_dm_me", "node-movement/distance-moved/mean-euclidean">;
export default NodeMovementDistanceMovedMeanEuclideanCriteria;
