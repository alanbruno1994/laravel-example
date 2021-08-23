import React, { useState } from "react";
import { Link } from "react-router-dom";
import './css/menuPrincipal.css';
import { AiOutlineMenu,AiOutlineClose } from "react-icons/ai";
import $ from 'jquery';

interface MenuPrincipalInterface
{
    code:number;
}

export default function MenuPrincipal(props:MenuPrincipalInterface)
{
    let [open,setOpen]=useState(false);

    function openMenu()
    {
        if(open==false){
             $("#menuMobile").slideDown(500);          
        }else
        {
            $("#menuMobile").slideUp(500); 
        }
        setOpen(!open);
    }

    return <>
            <header className="menuPrincipalDesktop">
                <nav>                       
                    <Link to="/produtos" style={props.code===1 ? {fontWeight:"bolder"}:{}}>Produtos</Link>
                    <Link to="/fornecedores" style={props.code===2 ? {fontWeight:"bolder"}:{}}>Fornecedores</Link>
                    <Link to="/" style={props.code===3 ? {fontWeight:"bolder"}:{}}>Sair</Link>
                </nav>        
            </header>
            <header className="menuPrincipalMobile">
                <span onClick={openMenu}>{open==false ? <AiOutlineMenu size={24} color="#CECECE"></AiOutlineMenu>:<AiOutlineClose size={24} color="#CECECE"></AiOutlineClose> }</span>
                <nav id="menuMobile" style={{display:"none"}}>                       
                    <Link to="/produtos" style={props.code===1 ? {fontWeight:"bolder"}:{}}>Produtos</Link>
                    <Link to="/fornecedores" style={props.code===2 ? {fontWeight:"bolder"}:{}}>Fornecedores</Link>
                    <Link to="/" style={props.code===3 ? {fontWeight:"bolder"}:{}}>Sair</Link>
                </nav>        
            </header>
            </>
            ;

}