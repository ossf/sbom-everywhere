import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base: "/sbom-everywhere/",
  title: "SBOM-Everywhere Wiki",
  description: "Information and advice about using SBOM in open source projects.",
  themeConfig: {
    search: {
      provider: "local"
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Basics', link: '/basics' },
      { text: 'About us', link: '/about-us'}
    ],

    sidebar: [
      {
        text: 'Essentials',
        items: [
          { text: 'Basics', link: '/basics' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Glossary', link: '/glossery' },
          { text: 'FAQ', link: '/faq' }
        ]
      },
      {
        text: 'Cataloges',
        items: [
          { text: 'SBOM Tools', link: 'https://sbom-catalog.openssf.org/catalog/' },
          { text: 'SBOM Compliance', link: '/sbom-compliance' },
          { text: 'SBOM working groups', link: '/sbom-working-groups'},
          { text: 'SBOM Example Integrations', link: '/example-integrations' }
        ]
      },
      {
        text: 'Guidance',
        items: [
          { text: 'SBOM Types', link: '/sbom-types' },
          { text: 'SBOM Naming', link: '/sbom-naming' },
          { text: 'About us', link: '/about-us'}
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ossf/sbom-everywhere' }
    ]
  }
})
