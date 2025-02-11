// src/app/api/verifyPassword.js
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export async function POST(req) {
    const { password } = await req.json();
    const id = process.env.WEB_ID
    // Busca la contraseña en la base de datos
    const user = await prisma.personal_data.findUnique({
        where: {
            id: id, // Aquí es el ID del usuario que estás buscando
        },
    });
    if (user && bcrypt.compareSync(password, user.password)) {
        return new Response(JSON.stringify({ success: true }), { status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },});
    }

    return new Response(JSON.stringify({ success: false }), { status: 401 });
}
