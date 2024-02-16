# Establishing SBOM Best Practices
## The problem
It is not clear to open source projects what the benefits to generating SBOMs is, and the time and knowledge needed to generate them is substantial. Open source projects are often short on free cycles, the process of initial SBOM tooling setup and long term SBOM generation are not free processes. What benefit a project receives from this additional work is not yet clear.

SBOM benefits for software consumers is more obvious, but is likely not enough of a story to justify the additional effort for open source projects without some sort of assistance and reward structure.

Additionally, there is little applicable guidance for open source projects that do want to generate and distribute SBOM documents. Questions that need to be defined include: What tooling can generate the SBOM? What SBOM formats should be generated? How do these documents get distributed?

The answers to these questions will vary based on ecosystem, language, and developer preference.

## Proposed plan

Rather than trying to tell open source projects how to generate and distribute SBOMs, the SBOM Everywhere group wants to take a hands on approach. There are too many unknowns in this space today to give suitable advice. Without experience in actually generating SBOM documents as part of a project, we will be giving out untested guidance. The best way to uncover these unknowns will be to help projects generate and distribute SBOMs.

In order to work alongside open source projects and uncover these unknowns, we propose creating an SBOM strike team able to help projects setup SBOM tooling.
This team will learn lessons on how to best bootstrap SBOM tooling. These lessons should be documented in a public location to benefit any interested party in the future.

Part of the Strike Team documentation should be to show how to generate and distribute SBOMs, but also document the benefits to projects that have been partnered with.

### Action Items
1) Create SBOM strike team
    - The purpose of this team will be to begin working on the below tasks.
    - Strike team members will be expected to commit multiple hours per week.
    - Strike team members should be able to work with and communicate to open source projects.
1) Capture the best practices around use of SBOMs in the ecosystem for
various users/use cases
    - Leverage the SBOM Use cases from the various SBOM Everywhere sources, then capture lessons learned from working with the open source community to create and maintain SBOMs.
    - Identify target projects, languages, and ecosystems to document. This can be done as part of the larger SBOM Everywhere group, but fundamentally the people that are part of the strike team should have final say on who to partner with.
    - Create documents explaining how to generation SBOM documents in various formats for existing languages and ecosystem. These documents should be generated based on untested assumptions prior to reaching out to open source projects. Documents will be expected to be updated on a regular basis as lessons are learned.
    - Best practices document should be aligned with target stakeholders, the strike team members as well as the open source project members
1) Identify and reach out to target group(s) with the expectation the SBOM strike team will do a significant amount of work around SBOM generation
    - The expectation for the target projects should be reviewing and approving PRs. Target projects should not be expected to implement any tools or code.
    - Some project help will be needed for strike team members to understand current development environment and workflow.
1) Document the journey
    - As work is done for the target groups, all lessons learned should be clearly captured. The target audience fo these documents will be other strike team members as well as other open source projects that intend to implement SBOM generation.
        - Extend sbom-scorecards and/or scorecards to provide clear evaluations of data present/absent, and quality of the SBOMs.
1) Align projects with Software Security Mobilization Plan Goal 1 workstream 3:
  Develop digital, risk-based metrics dashboard.
      - The dashboard should include for each open source project the associated SBOM quality.
      - This will require defining SBOM quality in a quantifiable way that can be translated to machine readable scorecard elements.
      - The Best Practices working group will enable the digital, risk-based metrics dashboard (leveraging the scorecards project).

### Plan needs
- SBOM Strike Team staffing
  - This will need to be 2-4 people at a minimum, more strike team members will mean we can engage with more projects.
  - Strike team will be expected to contribute at least 4 hours a week to SBOM Everywhere efforts.
- Identify potential open source projects that could be willing to work with our strike team to generate and distribute SBOMs for their projects
    - The projects should be aware this is fundamentally a learning exercise for the strike team.
    - Strike team member should have substantial input and the final say for this list.

