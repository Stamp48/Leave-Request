export interface AttachmentType {
  attachmentId: number;
  requestId: number;
  name: string;
  type: 'pdf' | 'jpg' | 'png' | 'docx';
}

export const mockAttachments: AttachmentType[] = [
  {
    attachmentId: 1,
    requestId: 2, // Oscar's Sick leave
    name: "doctors_note_oscar.pdf",
    type: "pdf"
  },
  {
    attachmentId: 2,
    requestId: 5, // Leo's Sick leave
    name: "medical_certificate_leo.jpg",
    type: "jpg"
  },
  {
    attachmentId: 3,
    requestId: 8, // Oscar's Bereavement leave
    name: "funeral_service_notice.pdf",
    type: "pdf"
  },
  {
    attachmentId: 4,
    requestId: 14, // Oscar's Paternity leave
    name: "birth_certificate_scan.png",
    type: "png"
  },
  {
    attachmentId: 5,
    requestId: 14, // Oscar's Paternity leave
    name: "hospital_admission_form.pdf",
    type: "pdf"
  },
  {
    attachmentId: 6,
    requestId: 15, // Bob's Sick leave
    name: "prescription_migraine.jpg",
    type: "jpg"
  }
];