/* eslint-disable import/prefer-default-export */

/**
 * min, maxの間でランダムな数を返します。
 * @param {number} min
 * @param {number} max
 * @returns number
 */
export const random = (min: number, max: number) =>
  Math.random() * (max - min) + min;
