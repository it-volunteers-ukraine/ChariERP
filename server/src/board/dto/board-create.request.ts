import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoard {
  @ApiProperty({ example: 'new board', description: 'Board name' })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty({ message: 'Board name cannot be empty' })
  title: string;
}

export class UpdateBoardDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title?: string;
}

export class BoardResponse {
  @ApiProperty({ example: '64a7f123e5d9f3a1b23cd456', description: 'ID board' })
  id: string;

  @ApiProperty({ example: 'My first board', description: 'Board name' })
  title: string;

  @ApiProperty({ example: '2025-06-11T12:34:56.789Z', description: 'Date created' })
  createdAt: Date;

  @ApiProperty({ example: '2025-06-11T12:34:56.789Z', description: 'Date of creation' })
  updatedAt: Date;
}
