import { defineComponent } from 'vue';

import type { PropType } from 'vue';

export type Shader = { name: string; id: string; selected: boolean };

export type Target = { name: string; value: 'image' | 'video' };

const CanvasNav = defineComponent({
  props: {
    picked: {
      type: String as PropType<'image' | 'video'>,
      require: true,
    },
    shaderTypes: {
      type: Array as PropType<Shader[]>,
      require: true,
    },
    targetTypes: {
      type: Array as PropType<Target[]>,
      require: true,
    },
    onChangeShaderCheckbox: {
      type: Function as PropType<(item: Shader) => void>,
    },
    onChangeDisplayedTarget: {
      type: Function as PropType<(item: Target) => void>,
    },
  },
});

export default CanvasNav;
