const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const path = require('path')
const { name } = require('../package.json')
const fs = require('fs')
const dts = require('vite-plugin-dts')
const svgIconsPlugin = require('vite-plugin-svg-icons')

const entryDir = path.resolve(__dirname, '../packages/components')
const outputDir = path.resolve(__dirname, '../dist')
const buildTsConfig = path.resolve(__dirname, '../tsconfig.build.json')
const rootPth = path.resolve(__dirname, '../')
const alias = path.resolve(__dirname, '../packages/')

const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  root: rootPth,
  outDir: outputDir,
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    svgIconsPlugin.default({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      svgoOptions: true,
      // default
      symbolId: 'icon-[dir]-[name]',
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: alias
      }
    ]
  }
})

const rollupOptions = {
  external: ['vue', 'ant-design-vue', 'moment', 'lodash-es', '@ant-design/icons-vue'],
  output: {
    globals: {
      vue: 'Vue',
      'ant-design-vue': 'antDesignVue',
      moment: 'Moment',
      'lodash-es': '_',
      '@ant-design/icons-vue': 'iconsVue'
    },
    exports: 'named'
  },
}

const getDtsConfig = (type, name, dirName) => {
  return {
    tsConfigFilePath: buildTsConfig,
    outputDir,
    staticImport: true,
    insertTypesEntry: false,
    cleanVueFileName: true,
    logDiagnostics: true,
    copyDtsFiles: false,
    beforeWriteFile: (filePath, content) => {
      const path = filePath.replace('/packages/components', `/components/${dirName}`)
      return {
        filePath: path,
        content,
      }
    }
  }
}

const getBuildConfig = (format, name) => {
  const dirName = format === 'umd'? 'lib': format
  const config = defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      emptyOutDir: false,
      lib: {
        entry: path.resolve(entryDir, name),
        name: 'index',
        fileName: () => 'index.js',
        formats: [`${format}`]
      },
      outDir: path.resolve(outputDir, `components/${dirName}/${name}`),
    }
  })
  // config.plugins.push(dts(getDtsConfig(format, name, dirName)))
  return config
}

const buildSingle = async (name) => {
  await build(getBuildConfig('es', name))
  await build(getBuildConfig('umd', name))
}


const buildAll = async () => {
  const esAll = defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      emptyOutDir: false,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name,
        fileName: 'index',
        formats: ['es']
      },
      outDir: path.resolve(outputDir, 'components/es/')
    }
  })
  esAll.plugins.push(dts({
    tsConfigFilePath: buildTsConfig,
    outputDir,
    staticImport: true,
    insertTypesEntry: false,
    cleanVueFileName: true,
    logDiagnostics: true,
    copyDtsFiles: false,
    beforeWriteFile: (filePath, content) => {
      console.log(filePath);
      const path = filePath.replace('/packages/components', '/components/es')
      return {
        filePath: path,
        content,
      }
    }
  }))
  await build(esAll)
  const libAll = defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      emptyOutDir: false,
      cssCodeSplit: false,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name,
        fileName: 'index',
        formats: ['umd']
      },
      outDir: path.resolve(outputDir, 'components/lib/')
    }
  })
  libAll.plugins.push(dts({
    tsConfigFilePath: buildTsConfig,
    outputDir,
    staticImport: true,
    insertTypesEntry: false,
    cleanVueFileName: true,
    logDiagnostics: true,
    copyDtsFiles: false,
    beforeWriteFile: (filePath, content) => {
      const path = filePath.replace('/packages/components', '/components/lib')
      return {
        filePath: path,
        content,
      }
    }
  }))
  await build(libAll)
}

const buildComponent = async () => {
  await buildAll()
  //
  const components = fs.readdirSync(entryDir).filter(name => {
    const componentDir = path.resolve(entryDir, name)
    const isDir = fs.lstatSync(componentDir).isDirectory()
    return isDir && fs.readdirSync(componentDir).includes('index.ts')
  })

  for(const name of components) {
    await buildSingle(name)
  }
}

buildComponent()
