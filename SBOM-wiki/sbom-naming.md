# Best Practices for Naming and Directory Conventions for SBOMs (Software Bill of Materials) in Open Source Projects

The [Software Bill of Materials (SBOM)](https://www.cisa.gov/sbom) plays a vital role in providing visibility & transparency into the software supply chain. Using SBOM standards such as [CycloneDX](https://cyclonedx.org/) and [SPDX](https://spdx.dev/) ensures interoperability, accurate dependency tracking, and efficient vulnerability management. Here are some best practices for naming and directory conventions when creating and managing SBOMs.

## Scope

This document only covers [SBOMs of Type Source and Build](https://www.cisa.gov/sites/default/files/2023-04/sbom-types-document-508c.pdf) as SBOMs of other types are typically not curated by the maintainers of Open Source software but instead by consumers of Open Source software. The audience for this document is open source projects distributing artifacts directly rather than distributing artifacts via an ecosystem such as Maven or NPM.

For Source and Build SBOMs, the contents of the SBOM describing the artifact will only include what is being distributed and will not contain information about prospective uses of the software during or after installation or running of the software. That information is captured in separate SBOM types (ie Deployment, Runtime).

In the context of this document, the “source” is defined as a snapshot of the source code made available to download, such as in a tgz archive.

The “build” is the artifacts that are built by the project and released. These could be tgz archives, but also other artifacts such as rpm, deb, or zip.

This document does not prescribe best practices to specific software ecosystems (Maven, PyPI, etc) which are likely to have specific requirements about how to distribute accompanying metadata alongside software distributions, however this should not preclude the use of all or part of this guidance for this use-case.

There may be instances where a release is also uploaded to an ecosystem. It is not expected that the SBOM generated for the releases would be uploaded to those ecosystems.

## Consistent Naming Conventions

For SBOMs which are distributed with source tarballs or pre-built binaries as a part of a defined release of the software, the requirements for “release” files is typically a flat list of files without directories (think GitHub or GitLab Release artifacts). To meet these requirements, no directory structures should be used.

Following [guidance](https://slsa.dev/spec/v1.0/distributing-provenance#relationship-between-artifacts-and-attestations) from SLSA provenance attestations of appending a corresponding extension to the filename of the artifact that is being described. For the [CycloneDX](https://cyclonedx.org/specification/overview/) and [SPDX](https://spdx.github.io/spdx-spec/v2.3/conformance/#44-standard-data-format-requirements) SBOM standards and their file extension formats the guidance is as follows:

| Standard + Format | Artifact Filename | SBOM Filename |
|-------------------|-------------------|---------------|
| CycloneDX JSON    | artifact-1.0.0.tar.gz | artifact-1.0.0.tar.gz.cdx.json|
| CycloneDX XML | artifact-1.0.0.tar.gz | artifact-1.0.0.tar.gz.cdx.xml |
| SPDX TAG:VALUE | artifact-1.0.0.tar.gz | artifact-1.0.0.tar.gz.spdx |
| SPDX JSON | artifact-1.0.0.tar.gz | artifact-1.0.0.tar.gz.spdx.json |
| SPDX XML | artifact-1.0.0.tar.gz | artifact-1.0.0.tar.gz.spdx.xml |
| SPDX YAML | artifact-1.0.0.tar.gz | artifact-1.0.0.tar.gz.spdx.yml (or .yaml) |
| SPDX RDF XML | artifact-1.0.0.tar.gz | Artifact-1.0.0.tar.gz.spdx.rdf (or .rdf.xml)

The .spdx.* and .cdx.* extensions are sourced from the [CycloneDX](https://cyclonedx.org/guides/sbom/extensibility/) and [SPDX](https://spdx.github.io/spdx-ntia-sbom-howto/) guidance on filename extensions for SBOM documents of the corresponding standard and format.

The JSON format files should be considered a mandatory requirement and are always available. The tool support for JSON documents is considered to be better than the other file format options. If other formats are desired, the JSON SBOM should also be available.

## Acknowledgements

The following community members helped contribute to this guidance

- Josh Bressers, Anchore
- Marius Biebel. hm.edu
- Ian Dunbar-Hall, Lockheed Martin
- Maximilian Huber, TNG Technology Consulting
- Dan Appelquist, Samsung (formerly, Snyk)
- Seth Larson, Python Software Foundation
