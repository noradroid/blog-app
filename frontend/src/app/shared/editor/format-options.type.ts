export const FormatOptions = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'bulletList',
  'code',
] as const;
export type FormatOption = (typeof FormatOptions)[number];
