import type { AttachmentDTO } from "@/types/attachment.dto";
import type { Attachment } from "@/types/attachment";

export function toAttachment(dto: AttachmentDTO): Attachment {
  return {
    attachmentID: dto.attachment_id,
    requestID: dto.request_id,
    name: dto.name,
    type: dto.type,
    url: dto.url,
  };
}

export const toAttachments = (list: AttachmentDTO[]) => list.map(toAttachment);
