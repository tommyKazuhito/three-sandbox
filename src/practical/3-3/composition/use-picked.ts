/* eslint-disable import/prefer-default-export */
import { ref } from 'vue';

import type { Ref } from 'vue';

type Picked = 'image' | 'video';

export const usePicked: (
  initialPicked: Picked
) => [Ref<Picked>, (value: Picked) => void] = (initialPicked: Picked) => {
  const picked = ref<Picked>(initialPicked);

  const setPicked = (value: Picked) => {
    picked.value = value;
  };

  return [picked, setPicked];
};
