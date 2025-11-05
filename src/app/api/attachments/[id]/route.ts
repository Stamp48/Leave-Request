import { toAttachment } from "@/lib/mappers/attachmentMapper";
import type { AttachmentDTO } from "@/types/attachment.dto";
import type { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/attachmentHR/${params.id}`);

  if (!res.ok) return new Response("Not found", { status: 404 });

  const dto: AttachmentDTO = await res.json();
  return Response.json(toAttachment(dto));
}
