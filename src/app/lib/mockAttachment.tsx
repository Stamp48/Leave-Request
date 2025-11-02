export interface AttachmentType {
  attachmentId: number;
  requestId: number;
  name: string; // The display name: "doctors_note_oscar.pdf"
  type: 'pdf' | 'jpg' | 'png' | 'docx';
  url: string;  // The real URL: "https://storage.example.com/..."
}

// A base URL for mock file storage
const MOCK_STORAGE_URL = "https://storage.example.com/attachments/";

export const mockAttachments: AttachmentType[] = [
  {
    attachmentId: 1,
    requestId: 2, // Oscar's Sick leave
    name: "doctors_note_oscar.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "doctors_note_oscar.pdf"
  },
  {
    attachmentId: 2,
    requestId: 5, // Leo's Sick leave
    name: "medical_certificate_leo.jpg",
    type: "jpg",
    url: MOCK_STORAGE_URL + "medical_certificate_leo.jpg"
  },
  {
    attachmentId: 3,
    requestId: 8, // Oscar's Bereavement leave
    name: "funeral_service_notice.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "funeral_service_notice.pdf"
  },
  {
    attachmentId: 4,
    requestId: 14, // Oscar's Paternity leave
    name: "birth_certificate_scan.png",
    type: "png",
    url: MOCK_STORAGE_URL + "birth_certificate_scan.png"
  },
  {
    attachmentId: 5,
    requestId: 14, // Oscar's Paternity leave
    name: "hospital_admission_form.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "hospital_admission_form.pdf"
  },
  {
    attachmentId: 6,
    requestId: 15, // Bob's Sick leave
    name: "prescription_migraine.jpg",
    type: "jpg",
    url: MOCK_STORAGE_URL + "prescription_migraine.jpg"
  },
  // --- NEW ATTACHMENTS ---
  {
    attachmentId: 7,
    requestId: 19, // David's Sick leave
    name: "doctors_note_david_cold.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "doctors_note_david_cold.pdf"
  },
  {
    attachmentId: 8,
    requestId: 23, // Eva's Sick leave
    name: "eva_migraine_note.png",
    type: "png",
    url: MOCK_STORAGE_URL + "eva_migraine_note.png"
  },
  {
    attachmentId: 9,
    requestId: 30, // Grace's Sick leave
    name: "grace_headache_clinic.jpg",
    type: "jpg",
    url: MOCK_STORAGE_URL + "grace_headache_clinic.jpg"
  },
  {
    attachmentId: 10,
    requestId: 33, // Mona's Sick leave (Doctors appointment)
    name: "appointment_confirmation_mona.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "appointment_confirmation_mona.pdf"
  },
  // --- ADDED A BIT MORE ---
  {
    attachmentId: 11,
    requestId: 27, // Hannah's Sick leave
    name: "hannah_stomach_bug_note.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "hannah_stomach_bug_note.pdf"
  },
  {
    attachmentId: 12,
    requestId: 38, // Nina's Sick leave
    name: "telehealth_summary_nina.docx",
    type: "docx",
    url: MOCK_STORAGE_URL + "telehealth_summary_nina.docx"
  },
  {
    attachmentId: 13,
    requestId: 40, // Bob's Sick leave
    name: "er_visit_bob.jpg",
    type: "jpg",
    url: MOCK_STORAGE_URL + "er_visit_bob.jpg"
  },
  {
    attachmentId: 14,
    requestId: 5, // Leo's Sick leave (adding a second one)
    name: "food_poisoning_receipt.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "food_poisoning_receipt.pdf"
  }
];

