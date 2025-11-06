import { toEmployeeWithNames } from "@/lib/mappers/employeeWithNamesMapper";
import { EmployeeWithNames } from "@/types/employeeWithNames";
import { EmployeeWithNamesDTO } from "@/types/employeeWithNames.dto";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params : {id: string} }) {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/employee/${id}`)

    if (res.status === 404) {
        return new Response("Employee not found", {status: 404})
    }

    if (!res.ok) {
        const text = await res.text();
        return new Response(`Backend error ${res.status}: ${text}`, { status: 502 });
    }

    const dto: EmployeeWithNamesDTO = await res.json();
    const ui: EmployeeWithNames = toEmployeeWithNames(dto);
    return Response.json(ui, {status: res.status});

}