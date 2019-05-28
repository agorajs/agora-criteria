import OrthogonalOrderingCriteria from './original';
import OrthogonalOrderingNumberInversionsCriteria from './number-of-inversions';
import OrthogonalOrderingNumberInversionsNormalizedCriteria from './number-of-inversions-normalized';
import OrthogonalOrderingKendallTauDistanceCriteria from './kendall-tau-distance';

export const OrthogonalOrdering = {
  Default: OrthogonalOrderingCriteria,
  NumberInversions: OrthogonalOrderingNumberInversionsCriteria,
  NumberInversionsNormalized: OrthogonalOrderingNumberInversionsNormalizedCriteria,
  KendallTauDistance: OrthogonalOrderingKendallTauDistanceCriteria
};
export default OrthogonalOrdering;
