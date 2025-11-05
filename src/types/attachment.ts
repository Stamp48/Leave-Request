export interface Attachment {
  attachmentID: number;
  requestID: number;
  name: string;
  type: "pdf" | "jpg" | "png" | "docx";
  url: string;
}
