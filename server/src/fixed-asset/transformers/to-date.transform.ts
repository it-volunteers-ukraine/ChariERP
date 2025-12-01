import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { parse, isValid } from 'date-fns';

export function ToDate() {
  return Transform(({ value }: { value: string }) => {
    if (!value) return undefined;

    const date = parse(value, 'dd.MM.yyyy', new Date());

    if (!isValid(date)) {
      throw new BadRequestException('Asset date must be in the format DD.MM.YYYY');
    }

    return date;
  });
}
