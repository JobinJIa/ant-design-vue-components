import type { FunctionalComponent, defineComponent } from 'vue'
import type { ComponentType } from '../../types/componentType'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { componentMap } from '../../componentMap'

import { Popover } from 'ant-design-vue'
import { h } from 'vue'
import { Fn } from '@/types/global'

export interface ComponentProps {
  component: ComponentType
  rule: boolean
  popoverVisible: boolean
  ruleMessage: string
  getPopupContainer?: Fn
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CellComponent: FunctionalComponent = (
  {
    component = 'Input',
    rule = true,
    ruleMessage,
    popoverVisible,
    getPopupContainer
  }: ComponentProps,
  { attrs }
) => {
  const Comp = componentMap.get(component) as typeof defineComponent

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const DefaultComp = h(Comp, attrs)
  if (!rule) {
    return DefaultComp
  }
  return h(
    Popover,
    {
      overlayClassName: 'edit-cell-rule-popover',
      visible: !!popoverVisible,
      ...(getPopupContainer ? { getPopupContainer } : {})
    },
    {
      default: () => DefaultComp,
      content: () => ruleMessage
    }
  )
}
