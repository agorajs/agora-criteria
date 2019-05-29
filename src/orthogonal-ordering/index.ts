import OrthogonalOrderingCriteria from './original';
import OrthogonalOrderingNumberInversionsCriteria from './number-of-inversions';
import OrthogonalOrderingNumberNormalizedInversionsCriteria from './normalized-number-of-inversions';
import OrthogonalOrderingKendallTauDistanceCriteria from './kendall-tau-distance';

export const OrthogonalOrdering = {
  Default: OrthogonalOrderingCriteria,
  NumberInversions: OrthogonalOrderingNumberInversionsCriteria,
  NormalizedNumberInversions: OrthogonalOrderingNumberNormalizedInversionsCriteria,
  KendallTauDistance: OrthogonalOrderingKendallTauDistanceCriteria
};
export default OrthogonalOrdering;
