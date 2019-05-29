import { CriteriaFunction } from '../interfaces';
/**
 * TODO: HLGS 07
 * Evaluates the updatedGraph using the orthogonal ordering criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export declare const lambda2: CriteriaFunction;
export declare const OrthogonalOrderingKendallTauDistanceCriteria: import("../interfaces").Criteria<"oo_ktd", "orthogonal-ordering/kendall-tau-distance">;
export default OrthogonalOrderingKendallTauDistanceCriteria;
