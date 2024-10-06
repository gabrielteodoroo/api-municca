import { PartialType } from '@nestjs/swagger';
import { CreateDocumentDTO } from './create-document.dto';

export class EditDocumentDTO extends PartialType(CreateDocumentDTO) {}
