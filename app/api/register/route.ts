import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "../../lib/prismadb";

const HASH_SALT = 6;
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, HASH_SALT);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
