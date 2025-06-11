import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoard {
  @ApiProperty({ example: 'нова дошка', description: 'Назва дошки' })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty({ message: 'Назва дошки не може бути порожньою' })
  title: string;
}

export class BoardResponse {
  @ApiProperty({ example: '64a7f123e5d9f3a1b23cd456', description: 'ID дошки' })
  id: string;

  @ApiProperty({ example: 'Моя перша дошка', description: 'Назва дошки' })
  title: string;

  @ApiProperty({ example: '2025-06-11T12:34:56.789Z', description: 'Дата створення' })
  createdAt: Date;

  @ApiProperty({ example: '2025-06-11T12:34:56.789Z', description: 'Дата оновлення' })
  updatedAt: Date;
}
