import React, { useState,useEffect } from "react";
import "./css/global.css";
import "./css/produtos.css";
import MenuPrincipal from "../menu/MenuPrincipal";
import { BsCardList } from "react-icons/bs";
import TabelaElementos from "../tables/TabelaElementos";
import axios  from 'axios';


export interface Fornecedor
{
    nome:string;
    id:number;
    cnpj:string;
    estado:string;
}

let inital:Fornecedor[]=[];

export default function Fornecedores()
{
    let[filtro,setFiltro]=useState(false);
    let[cadastrar,setCadastrar]=useState(false);
    let[edit,setEdit]=useState(false);
    let [editId,setEditId]=useState(0);
    let[fornecedor,setFornecedor]=useState(inital);

    useEffect(() => {
        axios.get("http://localhost:8000/api/fonecedores",{headers:{Accept:"application/json"}}).then(e=>e.data)
        .then((e:Fornecedor[])=> {setFornecedor(e);});
    }, []);

    function deleteFornecedor(id:number)
    {
        axios.delete("http://localhost:8000/api/fonecedores/"+id,{headers:{Accept:"application/json"}})
        .then(function()
        {
             axios.get("http://localhost:8000/api/fonecedores",{headers:{Accept:"application/json"}}).then(e=>e.data)
            .then((e:Fornecedor[])=> {  setFornecedor(e);});
        });
    }

    return <>
            <div className="produtos">
                <MenuPrincipal code={2}/>
                <div className="bodyProdutos">
                    <div className="tituloProdutos"><h1>Fornecedores</h1><div style={{display:"flex",alignItems:"center"}}><span className="buttonIconProdutos" onClick={_=>setFiltro(true)}><BsCardList  color="#CECECE"/></span><button onClick={_=>setCadastrar(true)}>Cadastrar Produto</button></div></div>
                    <TabelaElementos setState={setEdit} delete={deleteFornecedor} listaFornecedor={fornecedor} setEdit={setEdit} header={["Nome","CNPJ","Estado","Total de Produtos","Operação"]}/>
                </div>                
           </div>
           {filtro ? 
           <div className="areaInput">
               <div className="FiltroProdutos">
                   <div className="areaInputFiltroProdutos">
                       <h1>Filtrar por fornecedor:</h1>
                       <input placeholder="Insira CNPJ"/>
                       <button>Filtrar</button>
                       <button style={{marginTop:10}} onClick={_=>setFiltro(false)}>Canecelar</button>
                   </div>
               </div>
            </div>
            :""}
            {cadastrar ?
            <div className="areaInput">
                <div className="FiltroProdutos">
                    <div className="areaInputFiltroProdutos">
                        <h1>Cadastrar Produto:</h1>
                        <label>Nome:</label>
                        <input placeholder="Insira nome"/>
                        <label>Fornecedor:</label>
                        <input placeholder="Insira CNPJ"/>
                        <label>Código do Produto:</label>
                        <input placeholder="Insira código"/>
                        <label>Categoria:</label>
                        <input placeholder="Insira uma categoria"/>
                       <button>Cadastrar</button>
                       <button style={{marginTop:10}} onClick={_=>setCadastrar(false)}>Canecelar</button>
                    </div>
                </div>
            </div> : ""
            }
            {edit ?
            <div className="areaInput">
                <div className="FiltroProdutos">
                    <div className="areaInputFiltroProdutos">
                        <h1>Editar Produto:</h1>
                        <label>Nome:</label>
                        <input placeholder="Insira nome"/>
                        <label>Fornecedor:</label>
                        <input placeholder="Insira CNPJ"/>
                        <label>Código do Produto:</label>
                        <input placeholder="Insira código"/>
                        <label>Categoria:</label>
                        <input placeholder="Insira uma categoria"/>
                       <button>Cadastrar</button>
                       <button style={{marginTop:10}} onClick={_=>setEdit(false)}>Canecelar</button>
                    </div>
                </div>
            </div> : ""
            }
           </>

}