import { CriteriaFunction } from '../interfaces';
/**
 * Evaluates the updatedGraph using the average node mouvement
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 */
export declare const change: CriteriaFunction;
