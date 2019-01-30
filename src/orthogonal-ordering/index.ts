import OrthogonalOrderingCriteria from "./orthogonal-ordering-mels95";
import OrthogonalOrderingNumberInversionsCriteria from "./number-inversions-sss12";
import OrthogonalOrderingCustomCriteria from "./custom";
import OrthogonalOrderingKendallTauCriteria from "./lambda-2-hlsg07";

export const OrthogonalOrdering = {
  Default: OrthogonalOrderingCriteria,
  NumberInversions: OrthogonalOrderingNumberInversionsCriteria,
  Custom: OrthogonalOrderingCustomCriteria,
  KendallTau: OrthogonalOrderingKendallTauCriteria
};
export default OrthogonalOrdering;
