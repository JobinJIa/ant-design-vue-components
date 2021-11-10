module.exports = {
  title: 'Vben Components',
  description: 'Vben 组件库',
  base: '/', //  部署时的路径 默认 /  可以使用二级地址 /base/
  lang: 'zh-CN', //语言
  repo: 'vuejs/vitepress',
  head: [
    // 改变title的图标
    [
      'link',
      {
        rel: 'icon'
        // href: '/img/linktolink.png',//图片放在public文件夹下
      }
    ]
  ],
  // 主题配置
  themeConfig: {
    //   头部导航
    nav: [
      // { text: '首页', link: '/' },
      { text: 'Guide', link: '/', activeMatch: '^/$|^/components/' },
      { text: '关于', link: '/about/' }
    ],
    //   侧边导航
    sidebar: {
      '/components/': getGuideSidebar(),
      // '/config/': getConfigSidebar(),
      '/': getGuideSidebar()
    }
  }
}
function getGuideSidebar() {
  return [
    {
      text: 'Introduction',
      children: [
        { text: 'What is Vben Components?', link: '/' },
        { text: 'Getting Started', link: '/components/button' },
        { text: 'Configuration', link: '/components/form' }
        // { text: 'Asset Handling', link: '/guide/assets' },
        // { text: 'Markdown Extensions', link: '/guide/markdown' },
        // { text: 'Using Vue in Markdown', link: '/guide/using-vue' },
        // { text: 'Deploying', link: '/guide/deploy' }
      ]
    }
    // {
    //   text: 'Advanced',
    //   children: [
    //     { text: 'Frontmatter', link: '/guide/frontmatter' },
    //     { text: 'Theming', link: '/guide/theming' },
    //     { text: 'API Reference', link: '/guide/api' },
    //     {
    //       text: 'Differences from Vuepress',
    //       link: '/guide/differences-from-vuepress'
    //     }
    //   ]
    // }
  ]
}
