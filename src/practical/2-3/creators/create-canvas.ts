/* eslint-disable import/prefer-default-export */
import { FONT_BASE } from '../helpers/font';

export const createCanvas = (
  label: string,
  fontSize: number,
  w: number,
  h: number
) => {
  // レターオブジェクトを生成します。
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', `${w}px`);
  canvas.setAttribute('height', `${h}px`);

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('');
  }

  ctx.fillStyle = 'white';
  ctx.font = `${fontSize}px ${FONT_BASE}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(label, w / 2, 0);

  return canvas;
};
