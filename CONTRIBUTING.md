# Contributing

## Workflow

To work on new versions of `react-verification-input` follow the correct instructions depending on whether the changes should be released on the `beta` channel first. The process is mostly the same with the main difference being the base branch (`develop` vs. `master`).

### Release on `beta` channel

1. Create a new branch from `develop`.
1. Commit and push changes to new branch.
1. Create a pull request to merge from your branch into `develop`.
1. Wait for CI to complete and fix unit tests if they fail.
1. Add label `release: major`, `release: minor` or `release: patch` depending on the type of release.
1. Merge pull request, which will start a GitHub Action. If you added a label in the previous step the version number will be bumped accordingly and a pre-release will be drafted. (Nothing will happen if no label was added to the pull request.)
1. Describe changes in description of pre-release draft.
1. Publish pre-release, which will start a GitHub Action. The package will be automatically published to NPM on the `beta` channel.

### Release on `latest` channel

> Note: If you want to release changes already released on the `beta` channel, just create a pull request to merge `develop` into `master` (make sure not to merge any undesired changes!) and continue with step 4 below.

1. Create a new branch from `master`.
1. Commit and push changes to new branch.
1. Create a pull request to merge from your branch into `master`.
1. Wait for CI to complete and fix unit tests if they fail.
1. Add label `release: major`, `release: minor` or `release: patch` depending on the type of release.
1. Merge pull request, which will start a GitHub Action. If you added a label in the previous step the version number will be bumped accordingly and a release will be drafted. (Nothing will happen if no label was added to the pull request.)
1. Describe changes in description of release draft.
1. Publish release, which will start a GitHub Action. The package will be automatically published to NPM on the `latest` channel.
