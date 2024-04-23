**[Tern](https://github.com/tern-tools/tern)** is a robust software composition analysis tool and Python library, designed for generating Software Bills of Materials (SBOMs) for container images and Dockerfiles. Here's an overview of its capabilities and usage:

### Features
- **SBOM Generation**: Tern creates detailed SBOMs, offering a layer-by-layer view of container contents in formats like human-readable, CycloneDx, SPDX, and more.
- **Language and Scripts**: It is primarily written in Python3, supplemented with shell scripts.

### Operation
1. **Initial Analysis**: Tern starts by analyzing the first layer of a container image, gathering details like distribution type, package format, and package managers.
2. **Layer-by-Layer Analysis**: It then executes scripts in a chroot environment to collate information about installed packages in each layer. This process continues through all subsequent layers of the image.
3. **Report Generation**: Upon completion, Tern generates a comprehensive report detailing the packages and their metadata. If a Dockerfile is provided, the report aligns Dockerfile lines with corresponding file system layers.

### Usage
- **For Container Insight**: It helps in better understanding the makeup of containers, assisting in infrastructure, integration, and deployment decisions.
- **GitHub Action**: There's an available GitHub Action for scanning Docker container images to identify the Base OS and installed packages.

### Getting Started on Linux
- Requirements include a Linux OS with kernel version >= 4.0, Git, attr, Python 3.6 or newer, Pip, jq, and skopeo.

### Capabilities
- **CLI Options**: The CLI has evolved, with current options available on Tern's PyPI project page.
- **Docker Support**: Tern supports Docker containers built using image manifest version 2, schema 2, and is compatible with Docker version 19.03.0 or later.

### Generating Reports
- **For Docker Images**: Use `tern report -i [image_name]` to inspect local Docker images and produce an SBOM.
- **From Dockerfiles**: Tern can analyze Dockerfiles, building the image and then discarding it after analysis, with the command `tern report -d [Dockerfile_path]`.
- **Locking Dockerfiles**: Tern can also create more reproducible, locked versions of Dockerfiles using `tern lock Dockerfile`.