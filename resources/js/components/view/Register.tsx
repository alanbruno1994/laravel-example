import React,{useState,useEffect} from "react";
import "./css/global.css";
import "./css/register.css";
import  axios  from 'axios';

interface Estado
{
    nome:string;
    sigla:string;
}

interface Cidade
{
    nome:string; 
}
let initialEstado:Estado[]=[];
let initialCidade:Cidade[]=[];

export default function Register()
{
    let[estados,setEstados]=useState(initialEstado);
    let[cidades,setCidades]=useState(initialCidade);

    function redirectLogin()
    {
        window.location.href="#/login";
    }

    useEffect(() => {
       axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados",{
        headers: {"Accept":"application/json"}}).then(e=>e.data).then(function(e:Estado[])
        {
            setEstados(e);
            trocarCidade(e[0].sigla);
        })
    }, [])

    function trocarCidade(UF:string)
    {
        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+UF+"/distritos",{
            headers: {"Accept":"application/json"}}).then(e=>e.data).then(function(e)
            {                 
                setCidades(e);                
            })
    }


    return <div className="register">
            <div className="areaRegister">
                <p>E-mail:</p>
                <input type="text" required/>
                <p>Nome:</p>
                <input type="text" required/>
                <p>Senha:</p>
                <input type="text" required/>
                <p>Estado:</p>
                <select name="estado">
                    {estados.map(function(e,id)
                    {
                        return <option key={id} value="valor1">{e.nome+"/"+e.sigla}</option>
                    })}                    
                </select>                
                <p>Cidade:</p>
                <select name="cidade">
                    {cidades.map(function(e,id)
                    {
                        return <option key={id} value="valor1">{e.nome}</option>
                    })}
                </select>
                <button>Cadastrar</button>
                <button onClick={redirectLogin}>Voltar</button>              
            </div>

    </div>;
}