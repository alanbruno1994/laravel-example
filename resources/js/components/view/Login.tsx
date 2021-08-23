import React from "react";
import "./css/global.css";
import "./css/login.css";

export default function Login()
{
    function redirectRegister()
    {
        window.location.href="#/registro";
    }

    function redirectProdutos()
    {
        window.location.href="#/produtos";
    }

    return <div className="login">
                <div className="areaLogin">
                    <p>E-mail</p>
                    <input type="email" required />
                    <p>Senha</p>
                    <input type="password" required />
                    <button onClick={redirectProdutos}>Login</button>
                    <button onClick={redirectRegister}>Cadastrar</button>                    
                </div>
           </div>
}