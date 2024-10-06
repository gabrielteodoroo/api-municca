import { IsNotEmpty } from 'class-validator';

export class CreateDocumentDTO {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Status is required' })
  status: string;
}
