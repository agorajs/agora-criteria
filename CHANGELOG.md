# Changelog

## [2.1.1] (March 6, 2020)

... building dists

## [2.1.0] (March 6, 2020)

### ✨ Features:

- `eb_rsd` undeprecated, fix errors when edges the edge source is the same as its target.

## [2.0.2] (October 2, 2019)

- 📝 Documentation: add [CHANGELOG.md](./CHANGELOG.md)

## [2.0.1] (October 2, 2019)

- Removed unnecessary dist files

## [2.0.0] (October 2, 2019)

### 📝 Documentation:

- add [README.md](./README.md)

### ✨ Features:

- `Error` objects are now throwed instead of strings
- Throwed errors are also more expressive
- Node movement algorithms shortname are now correctly prefixed with `nm` instead of `mn`
- 🔇 Remove unnecessary console logging

### 💥 Breaking Changes:

> Criteria functions have been renamed to better reflect the scientific paper.

- `OrthogonalOrdering.Default` is now named `OrthogonalOrdering.Original`
- `GlobalShape.AspectRatioPlus` is now named `GlobalShape.ImprovedAspectRatio`
- 🔥 removed old files:
  - src/change-ratio.ts
  - src/change.ts
  - src/displacement-gh10.ts
  - src/n-hlsg07.ts

### Dependencies

- ➖ unused mathjs has been removed
- ⬆️ `lodash` has been upgraded to `4.17.15`
- ⬆️ `agora-graph` has been upgraded to `1.1.1` and is now imported from github.com/agorajs/agora-graph
- ⬆️ `typescript` has been upgraded to `3.6.3`

[2.1.1]: https://github.com/agorajs/agora-criteria/compare/2.1.0...2.1.1
[2.1.0]: https://github.com/agorajs/agora-criteria/compare/2.0.2...2.1.0
[2.0.2]: https://github.com/agorajs/agora-criteria/compare/2.0.1...2.0.2
[2.0.1]: https://github.com/agorajs/agora-criteria/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/agorajs/agora-criteria/compare/1.0.2...2.0.0
