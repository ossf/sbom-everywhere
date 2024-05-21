The [CycloneDX Editor Validator Tool](https://github.com/Festo-se/cyclonedx-editor-validator) is designed as a command-line tool to perform various actions on CycloneDX SBOMs. It allows you to modify, merge and validate your SBOMs.
The documentation is provided as [GitHub pages](https://festo-se.github.io/cyclonedx-editor-validator/). Tne tool can be installed via [pypi](https://pypi.org/project/cyclonedx-editor-validator/).

## Key Features and Capabilities:
- Amend: Adds missing auto-generatable information to an existing SBOM.
- Merge: Merges two or more SBOMs into one.
- Validate: Validates an SBOM against a given specification. The tool is deployed with the default CycloneDX schema and a custom schema, but a path to schema can also be provided.
- Set: Using the command-line or a json, you can set properties on specified components in an SBOM, e.g. when information in an automtically created SBOM is missing or not correct.
- Build-public: Remove components and information with namespace internal and resolves the dependencies.
- CI-/CD-Integration: As this is a command-line tool, it can be integrated into your pipelines and the validation even provide a report, which can be used by the [`warnings-ng-plugin`](https://github.com/jenkinsci/warnings-ng-plugin) from Jenkins or a [`code-quality-report`](https://docs.gitlab.com/ee/ci/testing/code_quality.html#implement-a-custom-tool) as required by GitLab.
