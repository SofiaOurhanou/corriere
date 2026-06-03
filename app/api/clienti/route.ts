import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { auth } from "@/lib/auth";
import { validateBody } from "@/lib/validate";

import { createClienteSchema } from "@/lib/schemas/cliente.schema";

// Lista clienti
export async function GET(request: NextRequest) {
  const isAuthenticated = await auth(request);

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Non sei autorizzato" },
      { status: 401 }
    );
  }

  const clienti = await prisma.cliente.findMany({
    orderBy: {
      nominativo: "asc",
    },
  });

  return NextResponse.json(clienti);
}

// Crea cliente
export async function POST(request: NextRequest) {
  const isAuthenticated = await auth(request);

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Non sei autorizzato" },
      { status: 401 }
    );
  }

  const body = await validateBody(request, createClienteSchema);
if (!body.success) {
  return NextResponse.json(
    {
      error:
        body.error instanceof Error
          ? body.error.message
          : body.error,
    },
    { status: 400 }
  );
}

  const cliente = await prisma.cliente.create({
    data: body.data,
  });

  return NextResponse.json(cliente, {
    status: 201,
  });
}