import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateBody } from "@/lib/validate";
import { loginSchema } from "@/lib/schemas/login.schema";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(request: Request) {
  // validazione body
  const body = await validateBody(request, loginSchema);

  if (!body.success) {
    return NextResponse.json(
      { error: body.error.flatten() },
      { status: 400 }
    );
  }

  const { email, password } = body.data;

  // cerca utente
  const user = await prisma.operatore.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Utente non trovato" },
      { status: 404 }
    );
  }

  // verifica password
  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    return NextResponse.json(
      { error: "Credenziali errate" },
      { status: 401 }
    );
  }

  // crea JWT
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(secret);

  return NextResponse.json({ token });
}