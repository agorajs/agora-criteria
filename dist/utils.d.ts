import { Criteria } from './interfaces';
export declare function criteriaWrap<S extends string, N extends string>({ name, criteria, short }: Criteria<S, N>): Criteria<S, N>;
