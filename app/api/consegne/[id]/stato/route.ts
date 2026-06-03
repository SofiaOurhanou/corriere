import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { validateBody } from "@/lib/validate";

import { updateStatoConsegnaSchema } from "@/lib/schemas/consegna.schema";

// Cambio stato consegna
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuthenticated = await auth(request);

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Non sei autorizzato" },
      { status: 401 }
    );
  }

  const body = await validateBody(request, updateStatoConsegnaSchema);

  if (!body.success) {
    return NextResponse.json(
      { error: body.error.flatten() },
      { status: 400 }
    );
  }

  const { id } = await params;

  const dataToUpdate: any = {
    stato: body.data.stato,
  };

  if (body.data.stato === "CONSEGNATA") {
    dataToUpdate.dataConsegna =
      body.data.dataConsegna ?? new Date();
  }

  const consegna = await prisma.consegna.update({
    where: {
      id: Number(id),
    },
    data: dataToUpdate,
  });

  return NextResponse.json(consegna);
}