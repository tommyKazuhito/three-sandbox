import gsap from 'gsap';

export type AnimationObj = {
  positionY: number;
  swingX: number;
  swingY: number;
  swingZ: number;
  swingStrength: number;
  frame: number;
};

export const useDropAnimation: (
  obj: AnimationObj
) => [gsap.core.Timeline, () => void] = (obj: AnimationObj) => {
  const timeline = gsap.timeline();
  timeline.pause();

  timeline
    .set(obj, {
      positionY: 20,
      swingX: 0,
      swingY: 1,
      swingZ: 0,
      swingStrength: 0,
    })
    .to(obj, {
      positionY: 7,
      duration: 0.5,
      ease: 'cubic.in',
    })
    .set(obj, {
      swingStrength: 5,
      frame: Math.PI / 2,
      duration: 0,
    })
    .to(obj, {
      frame: Math.PI * 12,
      duration: 6,
      ease: 'linear',
    })
    .to(
      obj,
      {
        swingStrength: 0,
        duration: 6,
        ease: 'expo.out',
      },
      '<'
    );

  const playTimeline = () => {
    timeline.play(0);
  };

  return [timeline, playTimeline];
};
