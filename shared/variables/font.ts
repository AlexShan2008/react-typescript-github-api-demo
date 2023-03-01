const fontSizeBase = 16;

export const FontSize = {
  Base: fontSizeBase,
  Large: Math.ceil(fontSizeBase * 1.25),
  Small: Math.ceil(fontSizeBase * 0.85),
  H1: Math.floor(fontSizeBase * 2.25), // ~36px
  H2: Math.floor(fontSizeBase * 1.875), // ~30px
  H3: Math.ceil(fontSizeBase * 1.5), // ~24px
  H4: Math.ceil(fontSizeBase * 1.25), // ~ 20px
  H5: fontSizeBase,
  H6: Math.ceil(fontSizeBase * 0.85), // ~14px
} as const;
