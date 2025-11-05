import { toAttachments } from "@/lib/mappers/attachmentMapper";
import type { AttachmentDTO } from "@/types/attachment.dto";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/attachmentsHR`);
  const dto: AttachmentDTO[] = await res.json();
  return Response.json(toAttachments(dto));
}
