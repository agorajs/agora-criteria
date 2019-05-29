import OrthogonalOrderingCriteria from './original';
import OrthogonalOrderingNumberInversionsCriteria from './number-of-inversions';
import OrthogonalOrderingNormalizedNumberInversionsCriteria from './normalized-number-of-inversions';
import OrthogonalOrderingKendallTauDistanceCriteria from './kendall-tau-distance';

export const OrthogonalOrdering = {
  Default: OrthogonalOrderingCriteria,
  NumberInversions: OrthogonalOrderingNumberInversionsCriteria,
  NormalizedNumberInversions: OrthogonalOrderingNormalizedNumberInversionsCriteria,
  KendallTauDistance: OrthogonalOrderingKendallTauDistanceCriteria
};
export default OrthogonalOrdering;
