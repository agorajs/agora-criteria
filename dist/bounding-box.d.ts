import { CriteriaFunction } from "./interfaces";
/**
 * Evaluates the bounding box of the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, initial: number, updated: number}}
 */
export declare const boundingBox: CriteriaFunction;
