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
export declare const EdgeBasedRelativeStandardDeviationDelaunayCriteria: import("../interfaces").Criteria<"eb_rsdd", "edge-based/relative-standard-deviation/delaunay">;
export declare const EdgeBasedRelativeStandardDeviationCriteria: import("../interfaces").Criteria<"eb_rsd", "edge-based/relative-standard-deviation">;
export default EdgeBasedRelativeStandardDeviationDelaunayCriteria;
//# sourceMappingURL=relative-standard-deviation-delaunay.d.ts.map