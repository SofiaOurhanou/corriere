import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { validateBody } from "@/lib/validate";

import { trackingSchema } from "@/lib/schemas/tracking.schema";

export async function POST(request: NextRequest) {
  const body = await validateBody(request, trackingSchema);

  if (!body.success) {
    return NextResponse.json(
      { error: body.error.flatten() },
      { status: 400 }
    );
  }

  const consegna = await prisma.consegna.findFirst({
    where: {
      trackingKey: body.data.trackingKey,
      dataRitiro: body.data.dataRitiro,
    },
  });

  if (!consegna) {
    return NextResponse.json(
      { error: "Consegna non trovata" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    stato: consegna.stato,
    dataRitiro: consegna.dataRitiro,
    dataConsegna: consegna.dataConsegna,
  });
}