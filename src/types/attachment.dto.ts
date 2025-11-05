export interface AttachmentDTO {
  attachment_id: number;
  request_id: number;
  name: string;
  type: 'pdf' | 'jpg' | 'png' | 'docx';
  url: string;
}