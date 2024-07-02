---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "SBOM-Everywhere"
  text: "SBOMs in open source projects"
  tagline: Adding SBOMs to Open Source Projects.
  actions:
    - theme: brand
      text: Getting started
      link: /getting-started
    - theme: brand
      text: Tooling Catalog
      link: https://sbom-catalog.openssf.org/catalog/
  image:
    src: thumbnail.webp
    alt: SBOM catalog

features:
  - title: SBOM Catalog
    details: Looking for the right SBOM tooling? Explore our interactive catalog.
    link: https://sbom-catalog.openssf.org/catalog/
  - title: SBOM Types
    details: What types of SBOMs are there and what do I need?
    link: /sbom-types
  - title: SBOM Naming
    details: Wondering were to put and how to name your SBOMs? Look here for best practices.
    link: /sbom-naming
  - title: Examples
    details: Looking for examples and references, how other Open Source Projects integrated SBOM.
    link: /example-implementation
  - title: SBOM in compliance
    details: Wondering who requires SBOM and want to see a list referencing the sources? Here's a list of laws, guidelines and requirements mandating SBOMs.
    link: /sbom-compliance
  - title: Working Groups
    details: Do you want to join, contribute or ask questions. Her is a list of working groups.
    link: sbom-everywhere-sig
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #43D3E0, #FCAF1A 80%);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #43D3E0 50%, #FCAF1A 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>