import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateBody } from "@/lib/validate";
import { registerSchema } from "@/lib/schemas/register.schema";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  // validazione body con zod
  const body = await validateBody(request, registerSchema);

  if (!body.success) {
    return NextResponse.json(
      { error: body.error.flatten() },
      { status: 400 }
    );
  }

  const { nome, cognome, email, password } = body.data;

  // controllo se utente esiste già
  const existing = await prisma.operatore.findUnique({
    where: { email },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Utente già esistente" },
      { status: 409 }
    );
  }

  // hash password
  const hash = await bcrypt.hash(password, 10);

  // crea utente
  const user = await prisma.operatore.create({
    data: {
      nome,
      cognome,
      email,
      passwordHash: hash,
    },
  });

  return NextResponse.json({
    id: user.id,
    email: user.email,
  });
}