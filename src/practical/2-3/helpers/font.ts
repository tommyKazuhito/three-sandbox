import * as WebFont from 'webfontloader';

export const FONT_BASE = 'Source Code Pro';
export const FONT_ICON = 'FontAwesome';

export const load = () =>
  new Promise<boolean>((resolve, reject) => {
    WebFont.load({
      custom: {
        families: [FONT_BASE, FONT_ICON],
        urls: [
          'https://fonts.googleapis.com/css?family=Source+Code+Pro:600',
          'https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css',
        ],
        testStrings: {
          FontAwesome: '\uf001',
        },
      },
      // Web Fontが使用可能になったとき
      active: () => {
        resolve(true);
      },
      inactive: () => {
        reject();
      },
    });
  });
