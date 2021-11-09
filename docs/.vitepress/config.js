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
        rel: 'icon',
        // href: '/img/linktolink.png',//图片放在public文件夹下
      },
    ],
  ],
  // 主题配置
  themeConfig: {
    //   头部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about/' },
    ],
    //   侧边导航
    sidebar: [
      { text: '组件', link: '/components/', children: [
          { text: 'button', link: 'button.md' },
          { text: 'form', link: 'form.md' },
        ] },
    ]
  }
}