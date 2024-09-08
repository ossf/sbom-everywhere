The `@cyclonedx/yarn-plugin-cyclonedx` tool allows you to generate a
CycloneDX Software Bill of Materials (SBOM) for your [yarn](https://yarnpkg.com/)
projects. This SBOM provides details about the open-source dependencies, their
versions, and licenses used in your project.

To use this tool, ensure that you have `node >= 18` and `yarn >= 3 (berry)`. Install
the plugin into your yarn project using one of the following methods: zero-install,
cli-wrapper, or plugin.

The usage of the tool depends on the installation method. For example, with the
zero-install method, you can call it via dlx-wrapper: `yarn dlx @cyclonedx/yarn-plugin-cycloned