# github-actions  
## General information
/.github/workflows contains the currently used workflows  
/testing_workflows contains workflows that are currently beeing evaluated, tested, or kept to play around  

## Explanation for every workflow.yml file  

### label_pull_request.yml (Label Pull Request)

Whenever a pull request is opened, edited, synchronized, reopened  
this workflow gets triggered.  

It contains the following **Actions**:  
* Label pull request
  * Currently just echos something for testing
  * Could be used to add additional labels to pull requests (e.g. if review approved add ready for approval/merge label)
* Label pull request for RC
  * Currently uses TimonVS/pr-labeler-action with the "pr-labeler.yml" file defining the labels  
    and their matching according to our RC branch naming convention
  * Only run if merge target is master
  * Possible label values:
    * Leading to release: patch, minor, major
    * Leading to no release: no-release  
    
The labels get assigned based on our branch naming convention.  
*-patch, *-minor, *-major lead to patch, minor, major label
*-tests, *-documentation, *-configuration, *-force lead to no-release label  

### create_release.yml (Create Release)

Whenever a pull request is closed this action gets triggered.  
Additionally it has a gatekeeper by the check if the pull request was merged and the head_ref started with RC  

It contains the following **Actions**:
* checkout (provided by github actions)
  * checks out the current master  
* Build assets
  * TODO - Build package action has to be created
  * Should have params for all specific shop extensions/repos so 1 action can be used for all extensions/repos  
* Verify changelog
  * TODO - Verify changelog action has to be created
  * Should verify if the semver next tag (or one of them so it doesn't need to check current tag) is in the CHANGELOG.md  
    Check github-create-release-action on how to fetch CHANGELOG.md and look for h2 (##TAG)
* Tag and prepare release
  * uses K-Phoen/semver-release-action
  * Bumps the tag and creates an empty release depending on the label the merged PR had  
    (semver compliant - patch, minor, major)
* Upload release notes and package
  * uses serucee/github-create-release-action
  * Updates the previously created release (passed as param)
    * Adds release notes
    * TODO Upload created build artifact