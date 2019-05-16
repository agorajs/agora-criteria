import { Graph } from 'agora-graph';
/**
 * TODO: GH10
 *
 * reference:  https://gitlab.com/graphviz/graphviz/blob/master/lib/sfdpgen/layout_similarity.c#L161-180
 * permalink reference : https://gitlab.com/graphviz/graphviz/blob/b0871968de2252653b001bf700ed98c240e8aad6/lib/sfdpgen/layout_similarity.c#L161-180
 *
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export declare const edgeLength: (initialGraph: Graph<number>, updatedGraph: Graph<number>, withDelaunay?: boolean) => {
    value: number;
};
export declare const EdgeRelativeStandardDeviationDelaunayCriteria: import("../interfaces").Criteria<"e_rsd_d", "edge/relative-standard-deviation/delaunay">;
export declare const EdgeRelativeStandardDeviationCriteria: import("../interfaces").Criteria<"e_rsd", "edge/relative-standard-deviation">;
export default EdgeRelativeStandardDeviationDelaunayCriteria;
