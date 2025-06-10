import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoard {
  @ApiProperty({ example: 'нова дошка', description: 'Назва дошки' })
  @IsString()
  @IsNotEmpty({ message: 'Назва дошки не може бути порожньою' })
  title: string;
}
