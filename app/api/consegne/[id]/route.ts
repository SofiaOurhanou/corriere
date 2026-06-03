import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { validateBody } from "@/lib/validate";

import { updateConsegnaSchema } from "@/lib/schemas/consegna.schema";

// Dettaglio consegna
export async function GET(
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

  const { id } = await params;

  const consegna = await prisma.consegna.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      cliente: true,
    },
  });

  return NextResponse.json(consegna);
}

// Modifica consegna
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

  const body = await validateBody(request, updateConsegnaSchema);

  if (!body.success) {
    return NextResponse.json(
      { error: body.error.flatten() },
      { status: 400 }
    );
  }

  const { id } = await params;

  const consegna = await prisma.consegna.update({
    where: {
      id: Number(id),
    },
    data: body.data,
  });

  return NextResponse.json(consegna);
}

// Elimina consegna
export async function DELETE(
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

  const { id } = await params;

  const consegna = await prisma.consegna.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (consegna?.stato === "CONSEGNATA") {
    return NextResponse.json(
      { error: "La consegna è già stata consegnata" },
      { status: 400 }
    );
  }

  await prisma.consegna.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Consegna eliminata",
  });
}