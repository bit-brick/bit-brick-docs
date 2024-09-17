import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Bit-Brick',
  tagline: 'Bit-Brick are cool',
  favicon: 'img/favicon.ico',
  // Set the production url of your site here
  url: 'https://docs.bit-brick.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'bit-brick', // Usually your GitHub org/user name.
  projectName: 'bit-brick-docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    
  },
  plugins: ['docusaurus-plugin-sass'],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/bit-brick/bit-brick-docs/tree/main/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: './src/css/custom.scss',
        },
      } satisfies Preset.Options,
    ],
  ],

  // themeConfig: {
  //   // Replace with your project's social card
  //   // image: 'img/docusaurus-social-card.jpg',
  //   // navbar: {
  //   //   title: 'Bit-Brick',
  //   //   logo: {
  //   //     alt: 'Bit-Brick Logo',
  //   //     src: 'img/logo.png',
  //   //     srcDark: 'img/logo_white.png',
  //   //     href: 'http://8.129.16.106:8080/',
  //   //     target: '_self',
  //   //   },
  //   //   items: [
  //   //     {
  //   //       to: '/',
  //   //       position: 'right',
  //   //       label: 'Documentation',
  //   //     },
  //   //     {
  //   //       label: 'About us',
  //   //       href: 'http://8.129.16.106:8080/about-us',
  //   //       position: 'right',
  //   //     },
  //   //     {
  //   //       label: ' Community',
  //   //       href: 'http://bbs.lacrimosa.cn/',
  //   //       position: 'right',
  //   //     },
  //   //     {
  //   //       href: 'https://github.com/bit-brick',
  //   //       label: 'GitHub',
  //   //       position: 'right',
  //   //     },
  //   //   ],
  //   // },
  //   // footer: {
  //   //   style: 'light',
  //   //   logo: {
  //   //     alt: 'Bit-Brick Logo',
  //   //     src: 'img/logo.png',
  //   //     srcDark: 'img/logo_white.png',
  //   //     href: 'http://8.129.16.106:8080/',
  //   //     target: '_self',
  //   //     width: 51,
  //   //     height: 51,
  //   //   },
      
  //   //   links: [
  //   //     {
  //   //       title: ' ',
  //   //       items: [
  //   //         {
  //   //           label: ' ',
  //   //           to: '/pi-one/docs/intro',
  //   //         },
  //   //       ],
  //   //     },
  //   //     {
  //   //       title: 'Follow us',
  //   //       items: [
  //   //         {
  //   //           label: 'Stack Overflow',
  //   //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
  //   //         },
  //   //         {
  //   //           label: 'Discord',
  //   //           href: 'https://discordapp.com/invite/docusaurus',
  //   //         },
  //   //         {
  //   //           label: 'Twitter',
  //   //           href: 'https://twitter.com/docusaurus',
  //   //         },
  //   //         {
  //   //           label: 'Youtube',
  //   //           href: 'https://twitter.com/docusaurus',
  //   //         },
  //   //         {
  //   //           label: 'Facebook',
  //   //           href: 'https://twitter.com/docusaurus',
  //   //         },
  //   //       ],
  //   //     },
  //   //     {
  //   //       title: 'About Bit-Brick',
  //   //       items: [
  //   //         {
  //   //           label: 'GitHub',
  //   //           href: 'https://github.com/bit-brick',
  //   //         },
  //   //         {
  //   //           label: 'About us',
  //   //           href: 'http://8.129.16.106:8080/about-us',
  //   //         },
  //   //         {
  //   //           label: ' Community',
  //   //           href: 'http://bbs.lacrimosa.cn/',
  //   //         },ß
  //   //       ],
  //   //     },
  //   //   ],
     
  //   //   copyright: `Copyright © ${new Date().getFullYear()} Bit-Brick`,
  //   // },
  //   // prism: {
  //   //   theme: prismThemes.github,
  //   //   darkTheme: prismThemes.dracula,
  //   // },
  // } satisfies Preset.ThemeConfig,
};

export default config;
