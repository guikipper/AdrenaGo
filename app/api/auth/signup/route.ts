import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        
        
        const body = await req.text(); // Obtém o corpo da requisição
        console.log("Corpo da requisição:", body);
        const { email, password } = JSON.parse(body);

        if(!email || !password) {
            return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
        }

        const supabase = await createClient();

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          })

        
          if (error) {
            if (error.message.includes("User already registered")) {
                return NextResponse.json({ error: "Este email já está cadastrado" }, { status: 400 });
            }
            console.error("Erro ao cadastrar usuário:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        
        console.log(data)
        return NextResponse.json({ data }, { status: 200 });
          
    } catch (error) {
        console.log(error)
    }
}