import { PrismaClient, StatoConsegna } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seed in corso...");

  // Pulizia database
  await prisma.consegna.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.operatore.deleteMany();

  // Password hashata
  const passwordHash = await bcrypt.hash("Password123!", 10);

  // Operatori
  const operatore1 = await prisma.operatore.create({
    data: {
      nome: "Mario",
      cognome: "Rossi",
      email: "mario.rossi@example.com",
      passwordHash,
    },
  });

  const operatore2 = await prisma.operatore.create({
    data: {
      nome: "Giulia",
      cognome: "Bianchi",
      email: "giulia.bianchi@example.com",
      passwordHash,
    },
  });

  console.log("✅ Operatori creati");

  // Clienti
  const cliente1 = await prisma.cliente.create({
    data: {
      nominativo: "Luca Verdi",
      via: "Via Roma 10",
      comune: "Milano",
      provincia: "MI",
      telefono: "3331111111",
      email: "luca@example.com",
    },
  });

  const cliente2 = await prisma.cliente.create({
    data: {
      nominativo: "Anna Neri",
      via: "Via Torino 25",
      comune: "Bergamo",
      provincia: "BG",
      telefono: "3332222222",
      email: "anna@example.com",
    },
  });

  const cliente3 = await prisma.cliente.create({
    data: {
      nominativo: "Marco Gialli",
      via: "Via Napoli 7",
      comune: "Brescia",
      provincia: "BS",
      telefono: "3333333333",
      email: "marco@example.com",
    },
  });

  console.log("✅ Clienti creati");

  // Consegne
  await prisma.consegna.createMany({
    data: [
      {
        clienteId: cliente1.id,
        trackingKey: "TRK-2026-000001",
        dataRitiro: new Date("2026-05-01"),
        stato: StatoConsegna.DA_RITIRARE,
      },
      {
        clienteId: cliente1.id,
        trackingKey: "TRK-2026-000002",
        dataRitiro: new Date("2026-05-03"),
        stato: StatoConsegna.IN_DEPOSITO,
      },
      {
        clienteId: cliente2.id,
        trackingKey: "TRK-2026-000003",
        dataRitiro: new Date("2026-05-05"),
        stato: StatoConsegna.IN_CONSEGNA,
      },
      {
        clienteId: cliente2.id,
        trackingKey: "TRK-2026-000004",
        dataRitiro: new Date("2026-05-06"),
        dataConsegna: new Date("2026-05-07"),
        stato: StatoConsegna.CONSEGNATA,
      },
      {
        clienteId: cliente3.id,
        trackingKey: "TRK-2026-000005",
        dataRitiro: new Date("2026-05-08"),
        stato: StatoConsegna.IN_GIACENZA,
      },
      {
        clienteId: cliente3.id,
        trackingKey: "TRK-2026-000006",
        dataRitiro: new Date("2026-05-10"),
        dataConsegna: new Date("2026-05-11"),
        stato: StatoConsegna.CONSEGNATA,
      },
    ],
  });

  console.log("✅ Consegne create");

  console.log("🎉 Seed completato");
  console.log("");
  console.log("Credenziali:");
  console.log("mario.rossi@example.com");
  console.log("Password123!");
  console.log("");
  console.log("giulia.bianchi@example.com");
  console.log("Password123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });