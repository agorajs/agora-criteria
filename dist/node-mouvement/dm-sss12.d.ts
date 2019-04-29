import { CriteriaFunction, Criteria } from '../interfaces';
/**
 * TODO: SSS*12
 * Evaluates the updatedGraph using the Change criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 */
export declare const euclidianDistanceSss: CriteriaFunction;
export declare const NodeMouvementDistanceMovedMeanEuclidianCriteria: Criteria<"mn_dm_me", "node-mouvement/distance-moved/mean-euclidian">;
export default NodeMouvementDistanceMovedMeanEuclidianCriteria;
