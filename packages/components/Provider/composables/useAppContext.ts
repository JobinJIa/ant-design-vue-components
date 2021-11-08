import { InjectionKey, Ref } from 'vue';
import { createContext, useContext } from '@/composables/core/useContext';
import {Theme} from "../VCProvider";

export interface AppProviderContextProps {
  prefixCls: Ref<string>;
  isMobile: Ref<boolean>;
  theme: Ref<Theme>;
}

const key: InjectionKey<AppProviderContextProps> = Symbol();

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key);
}

export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key);
}
