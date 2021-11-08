<script setup lang="ts">
  import { computed, defineComponent, unref, ref } from 'vue'
  import { useDebounceFn } from '@vueuse/core'
  import { Select } from 'ant-design-vue'
  import { cloneDeep } from 'lodash-es'
  import { FormSchema } from '../../packages/components/Form'

  const valueSelectA = ref<string[]>([])
  const valueSelectB = ref<string[]>([])
  const options = ref<any[]>([])
  for (let i = 1; i < 10; i++) options.value.push({ label: '选项' + i, value: `${i}` })

  const optionsA = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectB).indexOf(op.value) !== -1
      return op
    })
  })
  const optionsB = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectA).indexOf(op.value) !== -1
      return op
    })
  })

  const provincesOptions = [
    {
      id: 'guangdong',
      label: '广东省',
      value: '1',
      key: '1'
    },
    {
      id: 'jiangsu',
      label: '江苏省',
      value: '2',
      key: '2'
    }
  ]
  const citiesOptionsData = {
    guangdong: [
      {
        label: '珠海市',
        value: '1',
        key: '1'
      },
      {
        label: '深圳市',
        value: '2',
        key: '2'
      },
      {
        label: '广州市',
        value: '3',
        key: '3'
      }
    ],
    jiangsu: [
      {
        label: '南京市',
        value: '1',
        key: '1'
      },
      {
        label: '无锡市',
        value: '2',
        key: '2'
      },
      {
        label: '苏州市',
        value: '3',
        key: '3'
      }
    ]
  }

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段'
    },
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',

      colProps: {
        span: 8
      },
      // componentProps:{},
      // can func
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema)
        console.log('formModel:', formModel)
        return {
          placeholder: '自定义placeholder',
          onChange: (e: any) => {
            console.log(e)
          }
        }
      },
      renderComponentContent: () => {
        return {
          prefix: () => 'pSlot',
          suffix: () => 'sSlot'
        }
      }
    },
    {
      field: 'field2',
      component: 'Input',
      label: '带后缀',
      defaultValue: '111',
      colProps: {
        span: 8
      },
      componentProps: {
        onChange: (e: any) => {
          console.log(e)
        }
      },
      suffix: '天'
    },
    {
      field: 'field3',
      component: 'DatePicker',
      label: '字段3',
      colProps: {
        span: 8
      }
    },
    {
      field: 'field4',
      component: 'Select',
      label: '字段4',
      colProps: {
        span: 8
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
            key: '1'
          },
          {
            label: '选项2',
            value: '2',
            key: '2'
          }
        ]
      }
    },
    {
      field: 'field5',
      component: 'CheckboxGroup',
      label: '字段5',
      colProps: {
        span: 8
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1'
          },
          {
            label: '选项2',
            value: '2'
          }
        ]
      }
    },
    {
      field: 'field7',
      component: 'RadioGroup',
      label: '字段7',
      colProps: {
        span: 8
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1'
          },
          {
            label: '选项2',
            value: '2'
          }
        ]
      }
    },
    {
      field: 'field8',
      component: 'Checkbox',
      label: '字段8',
      colProps: {
        span: 8
      },
      renderComponentContent: 'Check'
    },
    {
      field: 'field9',
      component: 'Switch',
      label: '字段9',
      colProps: {
        span: 8
      }
    },
    {
      field: 'field11',
      component: 'Cascader',
      label: '字段11',
      colProps: {
        span: 8
      },
      componentProps: {
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake'
                  }
                ]
              }
            ]
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      field: 'divider-linked',
      component: 'Divider',
      label: '字段联动'
    },
    {
      field: 'province',
      component: 'Select',
      label: '省份',
      colProps: {
        span: 8
      },
      componentProps: ({ formModel, formActionType }) => {
        return {
          options: provincesOptions,
          placeholder: '省份与城市联动',
          onChange: (e: any) => {
            // console.log(e)
            let citiesOptions =
              e == 1
                ? citiesOptionsData[provincesOptions[0].id]
                : citiesOptionsData[provincesOptions[1].id]
            // console.log(citiesOptions)
            if (e === undefined) {
              citiesOptions = []
            }
            formModel.city = undefined //  reset city value
            const { updateSchema } = formActionType
            updateSchema({
              field: 'city',
              componentProps: {
                options: citiesOptions
              }
            })
          }
        }
      }
    },
    {
      field: 'city',
      component: 'Select',
      label: '城市',
      colProps: {
        span: 8
      },
      componentProps: {
        options: [], // defalut []
        placeholder: '省份与城市联动'
      }
    },
    {
      field: 'divider-selects',
      component: 'Divider',
      label: '互斥多选',
      helpMessage: ['两个Select共用数据源', '但不可选择对方已选中的项目']
    },
    {
      field: 'selectA',
      component: 'Select',
      label: '互斥SelectA',
      slot: 'selectA',
      defaultValue: [],
      colProps: {
        span: 8
      }
    },
    {
      field: 'selectB',
      component: 'Select',
      label: '互斥SelectB',
      slot: 'selectB',
      defaultValue: [],
      colProps: {
        span: 8
      }
    },
    {
      field: 'divider-others',
      component: 'Divider',
      label: '其它'
    },
    {
      field: 'field20',
      component: 'InputNumber',
      label: '字段20',
      required: true,
      colProps: {
        span: 8
      }
    },
    {
      field: 'field21',
      component: 'Slider',
      label: '字段21',
      componentProps: {
        min: 0,
        max: 100,
        range: true,
        marks: {
          20: '20°C',
          60: '60°C'
        }
      },
      colProps: {
        span: 8
      }
    },
    {
      field: 'field22',
      component: 'Rate',
      label: '字段22',
      defaultValue: 3,
      colProps: {
        span: 8
      },
      componentProps: {
        disabled: false,
        allowHalf: true
      }
    }
  ]

  const check = ref(null)
  const keyword = ref<string>('')
  const searchParams = computed<any>(() => {
    return { keyword: unref(keyword) }
  })

  function onSearch(value: string) {
    keyword.value = value
  }

  function handleReset() {
    keyword.value = ''
  }
  function handleSubmit(values: any) {
    console.info('click search,values:' + JSON.stringify(values))
  }
</script>

<template>
  <a-space>
    <VCButton color="success">成功</VCButton>
    <VCButton color="error">失败</VCButton>
    <VCButton color="warning">警告</VCButton>
  </a-space>
  <a-divider></a-divider>
  <a-space>
    <VCIcon icon="ph:airplane"></VCIcon>
    <VCIcon icon="mdi-light:bell"></VCIcon>
    <VCIcon icon="noto-v1:anguished-face"></VCIcon>
    <VCIcon icon="emojione-v1:astonished-face"></VCIcon>
  </a-space>
  <a-divider></a-divider>
  <a-space>
    <VCLoading :loading="true"></VCLoading>
  </a-space>
  <a-divider></a-divider>
  <VCBasicForm
    autoFocusFirstItem
    :labelWidth="200"
    :schemas="schemas"
    :actionColOptions="{ span: 24 }"
    @submit="handleSubmit"
    @reset="handleReset"
  >
    <template #selectA="{ model, field }">
      <a-select
        :options="optionsA"
        mode="multiple"
        v-model:value="model[field]"
        @change="valueSelectA = model[field]"
        allowClear
      />
    </template>
    <template #selectB="{ model, field }">
      <a-select
        :options="optionsB"
        mode="multiple"
        v-model:value="model[field]"
        @change="valueSelectB = model[field]"
        allowClear
      />
    </template>
  </VCBasicForm>
</template>

<style scoped></style>
