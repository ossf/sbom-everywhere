# OSSF SBOM Everywhere SIG

Home of the OpenSSF SBOM Everywhere SIG. We're glad you're here!

## Get Involved

*   Official communications occur on the [openssf-sig-sbom](https://lists.openssf.org/g/openssf-sig-sbom) mailing list
    * [Manage your subscriptions to Open SSF mailing lists](https://lists.openssf.org/g/main/subgroups)
*   We have a [Slack Channel](https://openssf.slack.com/archives/C03GKSYFRC0) for discussion various SBOM related activities

### Meeting times

*   Every other Tuesday @ 11:05am EST. The invite is available on the [OpenSSF Community Calendar](https://calendar.google.com/calendar/u/0/r?cid=czYzdm9lZmhwNWk5cGZsdGI1cTY3bmdwZXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ).
*   [Meeting Minutes](https://docs.google.com/document/d/193ODRga1F49WKPYYR79SNi9b27mChBqpOf5iiWJcMso/edit#heading=h.xqitfd6hs1gc) can be found in this Google Document. Feel free to add agenda items, please put your name next to items you add.

## Current Projects

### SBOM Catalog
To provide a better overview of the available tooling and their capabilities, this group maintains an SBOM Catalog which can be found under the following link:

[https://sbom-catalog.openssf.org/](https://sbom-catalog.openssf.org/)

If you want to get involved, please see the document [here](/SBOM-Catalog/contribute.md)

#### TODO
More data needs to be added to the catalog

### Establishing SBOM Best Practices for open source projects

The goal of this project is to understand what open source projects need to start publishing SBOMs

[https://docs.google.com/document/d/15_FKO8D03VSYDTNsMQZtn1aRfgVmModF-NM6VBnlrZA/](Draft document)

#### TODO
This document needs to be better defined to construct a plan to help open source projects

### Best Practices for Naming and Directory Conventions for SBOMs (Software Bill of Materials) in Open Source Projects

This document describes where to put an SBOM to be distributed and how to name it. It currently has a very narrow scope.

#### TODO
It needs to be expanded to cover other use cases

[https://github.com/ossf/sbom-everywhere/blob/main/reference/sbom_naming.md](Reference doument)

## Motivation

- The initial motivation for the formation of the OSSF SBOM Everywhere SIG is born from OpenSSF's [The Open Source Software Security Mobilization Plan](reference/mobilization_plan.pdf).  SBOM standardization and consensus from within the open source community is integral to adoption of universal constructs that reveal themselves via the exploration of use cases beyond a compliance check box.

## Objective

### The 3 overarching goals from the White House meeting
- Securing OSS Production: focus on preventing security defects and
  vulnerabilities in code and open source packages in the first place
- Improving Vulnerability Discovery & Remediation: improving the process
  for finding defects and fixing them
- Shorten Ecosystem Patching Response Time: Shorten the response time for
  distributing and implementing fixes.

### The goals for this group as defined in the mobilization plan
- The requirements needed to build use cases using SBOMs are clearly
  understood, documented and implemented in current SBOM specifications
- There are “friction free” open source tools that generate SBOMs that meet
  these requirements
- There is readily accessible education, awareness and implementation
  guidance and 3rd party support




## Scope

The mobilization plan defines scope as
_By focusing on tools and advocacy, we can remove the barriers to
generation, consumption, and overall adoption of SBOMs everywhere, we can
improve the security posture of the entire open source ecosystem:
producers, consumers, and maintainers._



### Formatting Specifications

For the purposes of establishing ubiquity to ensure sustainability for SBOM related tooling, and future solutions for consumption, “supported” formats must be defined. At this time there are two supported formats that will be in scope for the purposes of this group: [CycloneDX](https://cyclonedx.org) and [SPDX](https://spdx.dev).

Utilization of these specifications would likely be discretionary and interchangeable depending on the use case and SBOM type and the requirements of individual organizations and internal tooling.

This group's interpretation is
- [Use cases](https://docs.google.com/document/d/15X0TspuxUg19YScqNK1tl5kYpJV2xOrcuSx6CwanYZ0/edit#)
- Defining types of SBOMs
  - Source
  - Binary analysis
  - Build
  - Deploy Runtime
- Generation
  - Formats - clearly define expectations
- Consumption
  - How do we track and encourage the consumption of the artifacts
  - something about tools
- Adoption (how do we encourage others to create and use SBOMs)
  - Something about producers, consumers, and maintainers
  - Where does the burden lie on accountability and enforcement?
  - something about tools
    - Tools are everywhere, what do we do with this?
  - something about advocacy
- Attestation?
  - Not part of tooling, this needs to be a policy decision in these
    conversations, don't worry about the technical details (yet)
  - Where does this fit in? Producers, consumers, ???
  - https://github.com/in-toto/attestation
- Compliance (regulated industry)

The Federal Government exists at every point of the Software Delivery Lifecycle, hence their minimum requirements are good guides to establish a baseline scope.
  - Cybersecurity Supply Chain Risk Management Practices for Systems and Organizations [NIST SP 800-161 Rev. 1](https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final)
  - [Executive Order 14028](https://www.nist.gov/itl/executive-order-14028-improving-nations-cybersecurity/software-security-supply-chains)
  - ![](https://www.nist.gov/sites/default/files/styles/2800_x_2800_limit/public/images/2021/07/09/software-verification-timeline.png)
  - [Minimum Standards for Federal Government End Users](https://www.nist.gov/itl/executive-order-improving-nations-cybersecurity/recommended-minimum-standard-vendor-or-developer)


## Prior Work
### NTIA
- [NTIA SBOM Resources](https://ntia.gov/SBOM)
- [Software Bill of Materials Elements and Considerations](https://www.regulations.gov/docket/NTIA-2021-0001/document)
- [Plan to Congress on Declassification and Clearances related to The Communications Supply Chain Risk Information Partnership](https://ntia.gov/files/ntia/publications/ntia_plan_on_declassification_and_clearances_re_c-scrip.pdf)

NTIA's legwork has been a guiding source having done the most comprehensive research to date.

### CISA
 - [CISA SBOM Resources](https://www.cisa.gov/sbom)

### OWASP SCVS
 - [OWASP SCVS Resources](https://owasp.org/scvs)

  #### Tickets related to BOM Maturity model:
  - [OWASP/Software-Component-Verification-Standard#34](https://github.com/OWASP/Software-Component-Verification-Standard/issues/34)
  - [OWASP/Software-Component-Verification-Standard#35](https://github.com/OWASP/Software-Component-Verification-Standard/issues/35)
  - [OWASP/Software-Component-Verification-Standard#36](https://github.com/OWASP/Software-Component-Verification-Standard/issues/36)

## Governance

The [CHARTER.md](CHARTER.md) outlines the scope and governance of our group activities.