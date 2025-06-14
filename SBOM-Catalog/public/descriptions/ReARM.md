[ReARM](https://rearmhq.com) is an abbreviation for "Reliza''s Artifact and Release Management". It is a DevSecOps and Supply Chain Security tool to organize product releases with their metadata, including various Bills of Materials (SBOMs / xBOMs). ReARM maintains xBOM documents per each release and supports Transparency Exchange API (TEA).

ReARM Community Edition is available under AGPL-3.0-only and hosted at [https://github.com/relizaio/rearm](https://github.com/relizaio/rearm).

Capabilities:
- Storage and retrieval of SBOMs / xBOMs for software and hardware, per release, including signatures and signing details
- Maintaining representation of organization''s products and components with branches and releases
- Automated creation of release versions and changelogs between releases
- Close integration with Dependency-Track for analysis of vulnerabilities and policies, including license policy
- Integration with various CI systems (including GitHub Actions, Azure DevOps, Jenkins, GitLab CI and others) to produce BOMs and upload them with other release metadata to ReARM
- Release approval logic (Commercial Edition only)
- Marketing release workflow (Commercial Edition only)