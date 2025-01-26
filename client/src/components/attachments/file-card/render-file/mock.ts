import { Pdf, DocNew, Docx, Svg, Xls, Xlsx, Txt, Csv, Mp3, Wav, Mp4, Rar, Zip } from '@/assets/icons';

export const icon: Record<string, string> = {
  pdf: Pdf,
  msword: DocNew,
  'vnd.openxmlformats-officedocument.wordprocessingml.document': Docx,
  'svg+xml': Svg,
  'vnd.ms-excel': Xls,
  'vnd.openxmlformats-officedocument.spreadsheetml.sheet': Xlsx,
  plain: Txt,
  csv: Csv,
  mpeg: Mp3,
  wav: Wav,
  mp4: Mp4,
  'x-compressed': Rar,
  'x-zip-compressed': Zip,
};
