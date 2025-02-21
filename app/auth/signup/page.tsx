'use client'

import { useState } from "react"

const page = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);
        setError(null);

        if (!email || !password) {
            console.error("Email e senha são obrigatórios");
            return;
        }

        try {            
            const res = await fetch("/api/auth/signup", { //É necessário realizar uma chamada fetch, passando o method, headers e body
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json(); //obter o retorno e converter para json
            console.log(data)
            if (!res.ok) {
                setError(data.error);
            } else {
                console.log("Usuário cadastrado com sucesso:", data);
            }
        } catch (err) {
            setError("Erro ao conectar com o servidor");
        }

        setLoading(false);
    };
    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
            <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                <div className="mt-2">
                <input 
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    name="email" 
                    id="email" 
                    required 
                    className="border border-gray-300 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
                </div>
                <div className="mt-2">
                <input 
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    name="password" 
                    id="password" 
                    required 
                    className="border border-gray-300 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
            </div>

            <div>
                <button onClick={signUp} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
            </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
            </p>
        </div>
    </div>
    )
}

export default page