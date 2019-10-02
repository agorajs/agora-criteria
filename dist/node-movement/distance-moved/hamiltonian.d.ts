import { CriteriaFunction, Criteria } from '../../interfaces';
/**
 * TODO: HL03, HLSG07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export declare const costFunction: CriteriaFunction;
export declare const NodeMovementDistanceMovedHamiltonianCriteria: Criteria<"nm_dm_h", "node-movement/distance-moved/hamiltonian">;
export default NodeMovementDistanceMovedHamiltonianCriteria;
