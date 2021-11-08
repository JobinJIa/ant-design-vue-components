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
  external: ['vue', 'ant-design-vue', 'moment'],
  output: {
    globals: {
      vue: 'Vue',
      'ant-design-vue': 'antDesignVue',
      moment: 'Moment'
    },
    exports: 'named'
  },
}

const getDtsConfig = (type, name) => {
  return {
    tsConfigFilePath: buildTsConfig,
    outputDir,
    staticImport: true,
    insertTypesEntry: true,
    cleanVueFileName: true,
    logDiagnostics: true,
    copyDtsFiles: false,
    beforeWriteFile: (filePath, content) => {
      return {
        filePath,
        content,
      }
    }
  }
}

const getBuildConfig = (formant, name) => {
  const config = defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      emptyOutDir: false,
      lib: {
        entry: path.resolve(entryDir, name),
        name: 'index',
        fileName: () => 'index.js',
        formats: [`${formant}`]
      },
      outDir: path.resolve(outputDir),
    }
  })
  config.plugins.push(dts(getDtsConfig(formant, name)))
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
      outDir: path.resolve(outputDir)
    }
  })
  await build(esAll)
  const libAll = defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      emptyOutDir: false,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name,
        fileName: 'index',
        formats: ['umd']
      },
      outDir: path.resolve(outputDir)
    }
  })
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
