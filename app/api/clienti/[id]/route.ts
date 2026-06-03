import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { validateBody } from "@/lib/validate";

import { updateClienteSchema } from "@/lib/schemas/cliente.schema";

// Dettaglio cliente
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

  const cliente = await prisma.cliente.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!cliente) {
    return NextResponse.json(
      { error: "Cliente non trovato" },
      { status: 404 }
    );
  }

  return NextResponse.json(cliente);
}

// Modifica cliente
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

  const body = await validateBody(request, updateClienteSchema);

  if (!body.success) {
    return NextResponse.json(
      { error: body.error.flatten() },
      { status: 400 }
    );
  }

  const { id } = await params;

  const cliente = await prisma.cliente.update({
    where: {
      id: Number(id),
    },
    data: body.data,
  });

  return NextResponse.json(cliente);
}

// Elimina cliente
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

  // Controllo se il cliente ha consegne
  const consegne = await prisma.consegna.count({
    where: {
      clienteId: Number(id),
    },
  });

  if (consegne > 0) {
    return NextResponse.json(
      { error: "Cliente associato a consegne" },
      { status: 400 }
    );
  }

  await prisma.cliente.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Cliente eliminato",
  });
}