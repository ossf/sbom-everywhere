# OpenSSF SBOM Catalog Contributing Guide

If you are interested in adding entries to the catalog, or modifying functionality of the catalog, please review this guide.

## How to run the tool locally

Run the comamnds
```
npm install
npm run dev
```

Visiting the URL specified in the output will show you the current version of the site.

## How to add your tool
If you know of a tool or project that should be listed here, please open a pull request. There are three things to consider while adding a new tool:

### 1. Add a new entry
The public/data.yaml contains all the information a user can search on the page. Add a new entry to the list of tools. Please follow the following convention regarding the values. Please also refer to the tool's source, where the features are documented.

##### Name
The name of the tool. This should be distinct in the list and is used as an identifier.

##### Publisher
The publisher refers to the company or institution maintaining the tool. It should be spelled similarly each time so users can find all tools from the same publisher.

##### Standards
A list of Standards a tool can produce. Currently, the three standards which are recognized by the [NTIA](https://www.ntia.gov/sites/default/files/publications/sbom_formats_survey-version-2021_0.pdf) are supported:
- SPDX
- CycloneDx
- SWID

##### Abilities
Abilities describe the capabilities of the tool. In what part of the software development lifecycle can the tool be used? The following abilities are supported:
- **Compare**   - *Can compare two SBOMs*
- **Consume**   - *Can use a provided SBOM in some form*
- **Convert**   - *Can Convert between formats (SPDX, CycloneDX), versions or file-formats (json, xml)*
- **Edit**      - *Can somehow edit the contents of a SBOM*
- **Generate**  - *Can automatically generate a SBOM*
- **Merge**     - *Can merge several SBOMs*
- **Validate**  - *Can validate a SBOM against the file schema or requirements like defined by the NTIA*

##### Type
SBOMs may contain different forms of the minimum information sourced from different
product artifacts. The following types are supported as published by the [NTIA](https://www.cisa.gov/resources-tools/resources/types-software-bill-materials-sbom). Because many tools specifically support the scanning of container images, the category **Container** is added additionally. Even if container scans can be considered *Analyzed*:
- Design
- Source
- Build
- Analyzed
- Deployed
- Runtime
- Container

### 2. Add a description
You can add a detailed description to the /public/descriptions folder. The description should be written in markdown and named after the tool (the Same name as in the data.yaml). It should contain detailed information about the tools and features claimed in the data section. Feel free to add links to the GitHub repository or supplier.

### 3. Add a logo
You can add a logo to the /public/logos folder. The logo should be named after the tool (the Same name as in the data.yaml). It should be a PNG file with a transparent background and 200px x 200px.

The logo will be displayed on the page in the Map View, the List View, and the details section. You can add Logos for all categories and also for the Publisher.

If you add a Logo, we assume your project and/or company are OK with that. The logo should be used under the fair use policy. If you want to remove your logo, please open an issue, and we will remove it.

## Shoutout

A shoutout goes to D3JS for providing such a great library to visualize and interact with data. I stand on the shoulders of giants with this tooling. Also, thanks go to the people from vue.js, who just provide a great JavaScript framework.

Special thanks to [Mike Bostock](https://observablehq.com/@d3/zoomable-circle-packing?intent=fork) for sharing their examples and snippets used under the [ISC License](https://choosealicense.com/licenses/isc/) to provide the different views in the landscape.

<details><summary>ISC License</summary>
Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
</details>
