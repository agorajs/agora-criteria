import { CriteriaFunction, Criteria } from '../interfaces';
export declare const GlobalShapeConvexHullStandardShapePreservation: CriteriaFunction;
export declare function calculateConvexHullDistances(hull: [number, number][]): number[];
export declare const GlobalShapeConvexHullStandardShapePreservationCriteria: Criteria<"gs_ch_ssp", "global-shape/convex-hull/standard-shape-preservation">;
export default GlobalShapeConvexHullStandardShapePreservationCriteria;
