<template>
  <Tooltip placement="top">
    <template #title>
      <!--      <span>{{ t('component.table.settingDens') }}</span>-->
      <span>密度</span>
    </template>

    <Dropdown placement="bottomCenter" :trigger="['click']" :getPopupContainer="getPopupContainer">
      <ColumnHeightOutlined />
      <template #overlay>
        <Menu @click="handleTitleClick" selectable v-model:selectedKeys="selectedKeysRef">
          <MenuItem key="default">
            <!--            <span>{{ t('component.table.settingDensDefault') }}</span>-->
            <span>默认</span>
          </MenuItem>
          <MenuItem key="middle">
            <!--            <span>{{ t('component.table.settingDensMiddle') }}</span>-->
            <span>中等</span>
          </MenuItem>
          <MenuItem key="small">
            <!--            <span>{{ t('component.table.settingDensSmall') }}</span>-->
            <span>紧凑</span>
          </MenuItem>
        </Menu>
      </template>
    </Dropdown>
  </Tooltip>
</template>
<script lang="ts">
  import type { SizeType } from '../../types/table'
  import { defineComponent, ref } from 'vue'
  import { Tooltip, Dropdown, Menu } from 'ant-design-vue'
  import { ColumnHeightOutlined } from '@ant-design/icons-vue'
  // import { useI18n } from '/@/hooks/web/useI18n';
  import { useTableContext } from '../../hooks/useTableContext'
  import { getPopupContainer } from '@/utils'

  export default defineComponent({
    name: 'SizeSetting',
    components: {
      ColumnHeightOutlined,
      Tooltip,
      Dropdown,
      Menu,
      MenuItem: Menu.Item
    },
    setup() {
      const table = useTableContext()
      // const { t } = useI18n();

      const selectedKeysRef = ref<SizeType[]>([table.getSize()])

      function handleTitleClick({ key }: { key: SizeType }) {
        selectedKeysRef.value = [key]
        table.setProps({
          size: key
        })
      }

      return {
        handleTitleClick,
        selectedKeysRef,
        getPopupContainer
        // t,
      }
    }
  })
</script>
