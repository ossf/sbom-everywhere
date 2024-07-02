# Getting Started

## Select an SBOM-Generation Phase
Depending on the technology stack used, the phase of the software development lifecycle in which an SBOM is generated can significantly affect its quality. The different phases are explained in more detail in the [SBOM types](/sbom-types). For open-source projects, it is most beneficial to provide a source or a build SBOM, giving the consumer insights into the composition of a project build before it is compiled into an artifact. This provides access to details of the project composition that might otherwise remain hidden. While providing an SBOM based on the analysis of a build artifact can also be useful, such an SBOM can be produced by the user with their preferred tooling.

## Choose a Generation Methodology
Assuming the goal is to produce a source or build SBOM for a project, it should be decided whether the SBOM generation should be part of the build process (like a plugin added to the build tooling) or if a separate tool should be applied to the repository during the build.

### SBOM Generation in the Build Process
Adding SBOM generation directly to the build process might produce the best results. The SBOM is based on the build information directly and can therefore represent most of the complexity, such as traversing dependencies or dynamic dependency resolving with variables or version ranges. However, integrating SBOM generation into the build process can complicate changes. Additionally, if the project is composed of several technologies, each requiring its own build tooling and corresponding SBOM plugins, merging the SBOM generation results might be very challenging. Most build plugins only support one of the two SBOM standards, necessitating the choice of one standard or the integration of two SBOM plugins to cover SPDX and CycloneDX separately. This can also lead to additional complexity because these plugins can report different findings for the same project.

> In summary, integrating SBOM generation into the build process via plugins might produce the best results but can add a lot of additional complexities. However, only a few or none of these constraints may apply to a project.

### SBOM Generation with a Separate Tool
There are also tools that can be applied to the sources of a project without relying on a build integration. Tools like Syft, Trivy, or CdxGen can be used in this manner. While they are easier to integrate and operate within a project, they might not produce the best quality SBOM. Depending on the technology stack and build setup, it can be harder to resolve traversing dependencies, versions from version ranges or variables might be incorrect or missing, and license information might be wrong or missing (you can find some test reports [here](https://mariuxdeangelo.gitlab.io/website/#/post/20230924-SBOM-dependency-semantics-SPDX-and-CycloneDx)). On the plus side, they are easy to integrate, often support both SBOM standards (SPDX and CycloneDX), and can cover projects using several technologies in the same repository (no merging of SBOM data required).

> In summary, generating the SBOM with a separate tool is a good start and can be easier, but the results might be more accurate if derived from the build process. Nevertheless, the results might still be able to meet the requirements of the *NTIA minimum elements for an SBOM* (US regulations) or the requirements set by the *EU CRA* (EU regulations).

## Select an SBOM Tool
To select a tool, check out our tooling [catalog](/catalog/index.html).

## Integrate into Your Build
When integrating an SBOM generator into a project, it is important to ensure that each artifact gets its own SBOM. This is not an issue if the project produces only one artifact. However, if the project is, for example, a monorepository holding several products built for different platforms using diverging dependencies, it is important to provide separate SBOMs for each of them.

## Publish with Your Artifacts
An SBOM should be published along with its artifacts. It can also be considered to publish an SBOM inside an artifact to make it inseparable from the provided artifact. Further guidance is provided by the [SBOM naming](sbom-naming.md) document.