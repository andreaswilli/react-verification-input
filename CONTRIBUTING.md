# Contributing

## Workflow

To work on a new version of `react-verification-input` follow these instructions:

1. Create a new branch. Base your work off of the `master` branch, except if you want to release to the `beta` channel first (see [release channels](#release-channels)). In which case you should use the `develop` branch as a base.
1. Commit and push changes to new branch.
1. Don't forget to update the README / docs if necessary.
1. Regenerate docs by running `yarn docs` and commit these changes as well.
1. Create a pull request to merge from your branch into `master` (or `develop`).
1. Wait for CI to complete and fix unit tests if they fail.
1. Add label `release: major`, `release: minor` or `release: patch` depending on the type of release.
1. Merge pull request, which will start a GitHub Action. If you added a label in the previous step the version number will be bumped accordingly and a release will be drafted. (Nothing will happen if no label was added to the pull request.)
1. Describe changes in description of release draft.
1. Publish release, which will start a GitHub Action. The package will be automatically published to NPM on the `latest` (or `beta`) channel.

## Release Channels

On NPM we have two release channels:

- `latest`: Stable releases, most new features as well as bugfixes will go on this channel.
- `beta`: Experimental releases, can be more unstable.
