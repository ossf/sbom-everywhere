# Tooling

## Specifications
We will continue to examine SPDX and CycloneDX as the core specifications as it pertains to tooling.  Note that not all this tooling is open source, and some is a paid SaaS.  Given the state of the SBOM everywhere effort is at the level of defined represented in this commit, it may be pre-mature to be offering solutions to satisfy any preconcieved notions of an end state compliance framework.  So, buyer beware.
### SPDX Tooling:
SPDX maintains a [list of tools](https://spdx.dev/tools-community/) for generation and interaction with SBOMs using the SPDX specification.

SPDX also presents the following metadata structure for each of the tools, which is as follows:

TODO: add the tools from the link?
| Tool | Classification | Functionality | Location | Installation Instructions | How to use | Versions Supported | 
| --- | --- | --- | --- | --- | --- | --- |

***


### CycloneDX Tooling:
 CycloneDX maintains a comprehensive list of tools that operate on the CycloneDX SBOM format.  Their [tool center](https://cyclonedx.org/tool-center/) is comprehensive and a mix of use case specific tools.


## A Note on Dependencies
 That being said, there are clear benefits to begin understanding the capabalities around source dependency relationships and comparision to vulnerability feeds from NIST, GitHub, MITRE, Red Hat, etc.  In addition, to understanding exploitability. 

 The "Common Vulnerability Scoring System" (CVSS) no longer is sufficient for understanding the sever