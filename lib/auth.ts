import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// chiave segreta (deve stare in .env)
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

/**
 * Controlla se l'utente è autenticato
 * Ritorna true/false
 */
export async function auth(request: NextRequest) {
  try {
    const header = request.headers.get("authorization");
    if (!header) return null;

    const token = header.split(" ")[1];
    if (!token) return null;

    const { payload } = await jwtVerify(token, secret);

    return payload; // id, email, ecc
  } catch {
    return null;
  }
}