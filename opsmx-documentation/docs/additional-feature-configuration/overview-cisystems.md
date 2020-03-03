#Steps to Add Continuous Integration to Spinnaker

## Continuous Integration Overview and Importance
* Continuous Integration (CI) is the process of automating the build and testing of code every time
a team member commits changes to version control.
* CI encourages developers to share their code and unit tests by merging their changes into a
shared version control repository after every small task completion.
* In Spinnaker, CI can listen to events, and collect artifacts by builds from Continuous Integration
(CI) systems. These can trigger pipelines, and the same artifacts can be used by image bakery to
produce images of the machines.

## Spinnaker Supported CI Systems
* Following are the list of CI systems, supported by Spinnaker currently
    1. Google Cloud Build
    2. Jenkins
    3. Travis CI
    4. Wercker