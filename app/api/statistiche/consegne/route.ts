import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { StatoConsegna } from "@prisma/client";

export async function GET(request: NextRequest) {
  const isAuthenticated = await auth(request);

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Non sei autorizzato" },
      { status: 401 }
    );
  }

const statoParam = request.nextUrl.searchParams.get("stato");

const stato =
  statoParam && Object.values(StatoConsegna).includes(statoParam as StatoConsegna)
    ? (statoParam as StatoConsegna)
    : undefined;

    
  const consegne = await prisma.consegna.findMany({
    where: {
      stato: stato || undefined,
    },
  });

  const consegneConsegnate = consegne.filter(
    (c) => c.dataConsegna
  );

  let tempoTotale = 0;

  for (const consegna of consegneConsegnate) {
    const differenza =
      new Date(consegna.dataConsegna!).getTime() -
      new Date(consegna.dataRitiro).getTime();

    tempoTotale += differenza;
  }

  const mediaOre =
    consegneConsegnate.length > 0
      ? tempoTotale /
        consegneConsegnate.length /
        1000 /
        60 /
        60
      : 0;

  return NextResponse.json({
    numeroConsegne: consegne.length,
    tempoMedioConsegnaOre: mediaOre,
  });
}