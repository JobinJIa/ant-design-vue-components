import type {
  ComponentRenderProxy,
  VNode,
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType
} from 'vue'
export interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

export interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

export type RefType<T> = T | null

export type LabelValueOptions = {
  label: string
  value: any
  [key: string]: string | number | boolean
}[]

export type EmitType = (event: string, ...args: any[]) => void

export type TargetContext = '_self' | '_blank'

export interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

export type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}

export type Recordable<T = any> = Record<string, T>

export type Nullable<T> = T | null

export interface ChangeEvent extends Event {
  target: HTMLInputElement
}

export type TimeoutHandle = ReturnType<typeof setTimeout>
export type IntervalHandle = ReturnType<typeof setInterval>

// vue
export type PropType<T> = VuePropType<T>
export type VueNode = VNodeChild | JSX.Element
