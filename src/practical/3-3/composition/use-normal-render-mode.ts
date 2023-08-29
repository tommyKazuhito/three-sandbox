/* eslint-disable import/prefer-default-export */
import { ref } from 'vue';

import type { Ref } from 'vue';

export const useNormalRenderMode: (
  defaultMode?: boolean
) => [Ref<boolean>, (mode: boolean) => void] = (
  defaultMode: boolean = false
) => {
  const renderMode = ref<boolean>(defaultMode);

  const setRenderMode = (mode: boolean) => {
    renderMode.value = mode;
  };

  return [renderMode, setRenderMode];
};
