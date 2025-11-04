export interface AttachmentType {
  attachment_id: number;
  request_id: number;
  name: string; // The display name: "doctors_note_oscar.pdf"
  type: 'pdf' | 'jpg' | 'png' | 'docx';
  url: string;  // The real URL: "https://storage.example.com/..."
}

// A base URL for mock file storage
const MOCK_STORAGE_URL = "https://storage.example.com/attachments/";

export const mockAttachments: AttachmentType[] = [
  {
    attachment_id: 1,
    request_id: 2, // Oscar's Sick leave
    name: "doctors_note_oscar.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "doctors_note_oscar.pdf"
  },
  {
    attachment_id: 2,
    request_id: 5, // Leo's Sick leave
    name: "medical_certificate_leo.jpg",
    type: "jpg",
    url: MOCK_STORAGE_URL + "medical_certificate_leo.jpg"
  },
  {
    attachment_id: 3,
    request_id: 8, // Oscar's Bereavement leave
    name: "funeral_service_notice.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "funeral_service_notice.pdf"
  },
  {
    attachment_id: 4,
    request_id: 14, // Oscar's Paternity leave
    name: "birth_certificate_scan.png",
    type: "png",
    url: MOCK_STORAGE_URL + "birth_certificate_scan.png"
  },
  {
    attachment_id: 5,
    request_id: 14, // Oscar's Paternity leave
    name: "hospital_admission_form.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "hospital_admission_form.pdf"
  },
  {
    attachment_id: 6,
    request_id: 15, // Bob's Sick leave
    name: "prescription_migraine.jpg",
    type: "jpg",
    url: MOCK_STORAGE_URL + "prescription_migraine.jpg"
  },
  // --- NEW ATTACHMENTS ---
  {
    attachment_id: 7,
    request_id: 19, // David's Sick leave
    name: "doctors_note_david_cold.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "doctors_note_david_cold.pdf"
  },
  {
    attachment_id: 8,
    request_id: 23, // Eva's Sick leave
    name: "eva_migraine_note.png",
    type: "png",
    url: MOCK_STORAGE_URL + "eva_migraine_note.png"
  },
  {
    attachment_id: 9,
    request_id: 30, // Grace's Sick leave
    name: "grace_headache_clinic.jpg",
    type: "jpg",
    url: MOCK_STORAGE_URL + "grace_headache_clinic.jpg"
  },
  {
    attachment_id: 10,
    request_id: 33, // Mona's Sick leave (Doctors appointment)
    name: "appointment_confirmation_mona.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "appointment_confirmation_mona.pdf"
  },
  // --- ADDED A BIT MORE ---
  {
    attachment_id: 11,
    request_id: 27, // Hannah's Sick leave
    name: "hannah_stomach_bug_note.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "hannah_stomach_bug_note.pdf"
  },
  {
    attachment_id: 12,
    request_id: 38, // Nina's Sick leave
    name: "telehealth_summary_nina.docx",
    type: "docx",
    url: MOCK_STORAGE_URL + "telehealth_summary_nina.docx"
  },
  {
    attachment_id: 13,
    request_id: 40, // Bob's Sick leave
    name: "er_visit_bob.jpg",
    type: "jpg",
    url: MOCK_STORAGE_URL + "er_visit_bob.jpg"
  },
  {
    attachment_id: 14,
    request_id: 5, // Leo's Sick leave (adding a second one)
    name: "food_poisoning_receipt.pdf",
    type: "pdf",
    url: MOCK_STORAGE_URL + "food_poisoning_receipt.pdf"
  }
];

