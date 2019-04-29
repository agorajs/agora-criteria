import { Graph } from 'agora-graph';
import { Criteria } from '../interfaces';
/**
 * TODO: GH10
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export declare const edgeLength: (initialGraph: Graph<number>, updatedGraph: Graph<number>, withDelaunay?: boolean) => {
    value: number;
};
export declare const EdgeRelativeStandardDeviationDelaunayCriteria: Criteria<"e_rsd_d", "edge/relative-standard-deviation/delaunay">;
export declare const EdgeRelativeStandardDeviationCriteria: Criteria<"e_rsd", "edge/relative-standard-deviation">;
export default EdgeRelativeStandardDeviationDelaunayCriteria;
