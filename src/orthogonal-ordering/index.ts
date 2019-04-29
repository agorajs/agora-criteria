import OrthogonalOrderingCriteria from './orthogonal-ordering-mels95';
import OrthogonalOrderingNumberInversionsCriteria from './number-inversions-sss12';
import OrthogonalOrderingNumberInversionsMeanCriteria from './ni-custom';
import OrthogonalOrderingKendallTauCriteria from './lambda-2-hlsg07';

export const OrthogonalOrdering = {
  Default: OrthogonalOrderingCriteria,
  NumberInversions: OrthogonalOrderingNumberInversionsCriteria,
  NumberInversionsMean: OrthogonalOrderingNumberInversionsMeanCriteria,
  KendallTau: OrthogonalOrderingKendallTauCriteria
};
export default OrthogonalOrdering;
