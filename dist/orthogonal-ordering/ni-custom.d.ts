import { CriteriaFunction, Criteria } from '../interfaces';
/**
 * * CHANGE to ni custom
 * Evaluates the updatedGraph using the orthogonal ordering criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export declare const meanNumberInversions: CriteriaFunction;
export declare const OrthogonalOrderingNumberInversionsMeanCriteria: Criteria<"oo_ni_m", "orthogonal-ordering/number-of-inversions/mean">;
export default OrthogonalOrderingNumberInversionsMeanCriteria;
