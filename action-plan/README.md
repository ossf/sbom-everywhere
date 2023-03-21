# Action Plan - DRAFT - 21 March 2023
## Map the SBOM Landscape
* Map of all things SBOM with pointers to others’ material
* Develop an SBOM landscape (to be published on GitHub as part of work stream deliverables). [OpenSSF Diagrammers Society](https://github.com/ossf/diagrammers-society)
  * Tools  ([Tooling Landscape Quotation - Google Docs](https://docs.google.com/document/d/1gLSMHJ-l09r73aBDAIG4ld4pbC85D5UgTaICKqmKXKg/edit)). 
  * Standards: SPDX, CycloneDX, SWID, new OWASP standards, (PURL?)
  * [Document SBOM user needs](https://docs.google.com/document/d/1vTTewezRcboak5r5ahPMwEzwUT3K_SFB3lMGthqZ4Zc/edit?pli=1) at a higher, feature level. (IBM has been creating use cases, OWASP above.) Use the combination of user needs, existing tooling and desired outcomes to create a matrix of scenarios for SBOM creator and SBOM consumer user needs. Identify gaps, and possible tools to close gaps.
* Allow OpenSSF member companies and open source projects to pinpoint what technology exists in the SBOM user needs matrix. 
  * Alignment to collaboratively build out tool(s) that address various identified needs
  * These tools can be consumed broadly and assist with tech standardisation when possible
## Establish an OpenSSF Tool Chain for SBOMs
* Based on the landscape, and use cases above, this goal evaluates of tools, especially libraries, focusing on SBOM generators, SBOM parsers
  * “Evaluation of OSS SBOM Generators” https://docs.google.com/document/d/1UeV0BhZHKBIJY8fi40hAly3jP_dH9u7Nao4Alw8fY0Y/edit#
  * CISA defined SBOM types for the SBOM LifeCycle. https://docs.google.com/document/d/1PsUhUQ_L-lNymD9p613zP0_MiT1Boag68TP3aiwZ4R8/edit#
* Evaluate how SBOM tooling fits into the larger “Sterling Toolchain” OpenSSF goals. Identify existing tools that OpenSSF member companies can contribute to this effort?
* To simplify generating SBOMs at different phases of the SBOM lifecycle, extend/improve existing OSS tools to generate SBOMs throughout the lifecycle. These tools can then be used as a starting point for SBOM generators and for SBOM consumers.
* Identify OpenSSF member companies that can dedicate resources to working with open source communities to create and maintain SBOMs
## Establishing SBOM Best Practices
* Capture the best practices around use of SBOMs in the ecosystem for various users/use cases. Leverage the SBOM Use cases from the Landscape and lessons learned from working with the open source community to create and maintain SBOMs
* High quality SBOMs best practices
* Best practices for aligning with stakeholders
* Uses that SBOMs can be put to (link to user needs)
* Document a journey
  *Extend sbom-scorecards and/or scorecards to provide clear evaluations of data present/absent, and quality of the SBOMs
  *This aligns with Software Security Mobilization Plan Goal 1 workstream 3: Develop digital, risk-based metrics dashboard. The dashboard should include for each open source project the associated SBOM quality. This will require defining SBOM quality in a quantifiable way that can be translated to machine readable scorecard elements. The Best Practices working group will enable the digital, risk-based metrics dashboard (leveraging the scorecards project).
## SBOM Education
*  Develop, adapt or link to an SBOM primer aimed at developers and decision makers who don’t know what we’re talking about
  * Personas (e.g.)
    * Developer: As a developer, I need to ___________, so that I can ______.
    * Decision maker: As a decision maker, I need to know  _________(e.g., understand strategy), so that I can make ______ (e.g., make a decision)
  * Training
  * As a developer, I need to understand how to navigate existing materials, so that I can leverage SBOM best practices in my code.
  * Provide guidance for people looking for education - based on the appropriate persona. (e.g. As a developer using ___language, I need to know ___ about SBOMs.)
  * Continue to develop different users/journeys to which various trainings apply.
* Empower the open source project community by developing educational materials in cooperation with the Best Practices Education SIG to promulgate the best practices and use of OpenSSF SBOM tool chain
*  Evaluate Linux Foundation training and content for inclusion in this plan.
* Explore that content is licensable if needed so that training can be used by others as well - e.g. member companies’ own education efforts. 
  * [Secure Software Development Fundamentals Courses - Open Source Security Foundation (openssf.org)](https://openssf.org/training/courses/)
  * [Securing Your Software Supply Chain with Sigstore Course - Open Source Security Foundation (openssf.org)](https://openssf.org/training/securing-your-software-supply-chain-with-sigstore-course/)
