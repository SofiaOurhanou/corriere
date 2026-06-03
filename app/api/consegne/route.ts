import { NextRequest, NextResponse } from "next/server";

import { StatoConsegna } from "@prisma/client"; 
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { validateBody } from "@/lib/validate";

import { createConsegnaSchema } from "@/lib/schemas/consegna.schema";

// Lista consegne
export async function GET(request: NextRequest) {
  const isAuthenticated = await auth(request);

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Non sei autorizzato" },
      { status: 401 }
    );
  }

const stato = request.nextUrl.searchParams.get("stato");

const statoValidato: StatoConsegna | undefined =
  stato && Object.values(StatoConsegna).includes(stato as StatoConsegna)
    ? (stato as StatoConsegna)
    : undefined;


const consegne = await prisma.consegna.findMany({
  where: {
    stato: statoValidato,
  },
});

  return NextResponse.json(consegne);
}

// Crea consegna
export async function POST(request: NextRequest) {
  const isAuthenticated = await auth(request);

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Non sei autorizzato" },
      { status: 401 }
    );
  }

  const body = await validateBody(request, createConsegnaSchema);

  if (!body.success) {
    return NextResponse.json(
      { error: body.error.flatten() },
      { status: 400 }
    );
  }

  const consegna = await prisma.consegna.create({
    data: {
      ...body.data,
      stato: "DA_RITIRARE",
    },
  });

  return NextResponse.json(consegna, {
    status: 201,
  });
}