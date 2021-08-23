import React, { useState,useEffect } from "react";
import "./css/global.css";
import "./css/produtos.css";
import MenuPrincipal from "../menu/MenuPrincipal";
import { BsCardList } from "react-icons/bs";
import TabelaElementos from "../tables/TabelaElementos";
import axios  from 'axios';

export interface Produto
{
    nome:string;
    id:number;
    cnpj:string;
    categoria:string;
    codigo:string;
}

let inital:Produto[]=[];
let initalProduto:Produto={id:-1,nome:"",cnpj:"",categoria:"",codigo:""} 

export default function Produtos()
{
    let[filtro,setFiltro]=useState(false);
    let[cadastrar,setCadastrar]=useState(false);
    let[edit,setEdit]=useState(false);
    let[produtos,setProdutos]=useState(inital);
    let[produtoRegister,setProdutoRegister]=useState(initalProduto);
    let[produtoEdit,setProdutoEdit]=useState(initalProduto);

    useEffect(() => {
        axios.get("http://localhost:8000/api/produtos",{headers:{Accept:"application/json"}}).then(e=>e.data)
        .then((e:Produto[])=> {  setProdutos(e);});
    }, []);

    function deleteProduto(id:number)
    {
        console.log("delete ",id);
        axios.delete("http://localhost:8000/api/produtos/"+id,{headers:{Accept:"application/json"}})
        .then(function()
        {
             axios.get("http://localhost:8000/api/produtos",{headers:{Accept:"application/json"}}).then(e=>e.data)
            .then((e:Produto[])=> {  setProdutos(e);});
        });
    }

    function cadastrarProduto()
    {
        axios.post("http://localhost:8000/api/produtos/",produtoRegister,{headers:{Accept:"application/json"}})
        .then(function()
        {
             axios.get("http://localhost:8000/api/produtos",{headers:{Accept:"application/json"}}).then(e=>e.data)
            .then((e:Produto[])=> {  setProdutos(e);});
        });
        setCadastrar(false);
    }

    function editarProduto()
    {
        axios.put("http://localhost:8000/api/produtos/"+produtoEdit.id,produtoEdit,{headers:{Accept:"application/json"}})
        .then(function()
        {
             axios.get("http://localhost:8000/api/produtos",{headers:{Accept:"application/json"}}).then(e=>e.data)
            .then((e:Produto[])=> {  setProdutos(e);});
        });
        setEdit(false);
    }

    return <>
            <div className="produtos">
                <MenuPrincipal code={1}/>
                <div className="bodyProdutos">
                    <div className="tituloProdutos"><h1>Produtos</h1><div style={{display:"flex",alignItems:"center"}}><span className="buttonIconProdutos" onClick={_=>setFiltro(true)}><BsCardList  color="#CECECE"/></span><button onClick={_=>setCadastrar(true)}>Cadastrar Produto</button></div></div>
                    <TabelaElementos setState={setProdutoEdit} delete={deleteProduto} listaProduto={produtos} setEdit={setEdit} header={["Nome","Código","Categoria","Fornecedor","Operação"]}/>
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
                        <input placeholder="Insira nome" value={produtoRegister.nome} onChange={e=>setProdutoRegister({...produtoRegister,nome:e.target.value})} />
                        <label>Fornecedor:</label>
                        <input placeholder="Insira CNPJ" onChange={e=>setProdutoRegister({...produtoRegister,cnpj:e.target.value})}/>
                        <label>Código do Produto:</label>
                        <input placeholder="Insira código" onChange={e=>setProdutoRegister({...produtoRegister,codigo:e.target.value})}/>
                        <label>Categoria:</label>
                        <input placeholder="Insira uma categoria" onChange={e=>setProdutoRegister({...produtoRegister,categoria:e.target.value})}/>
                       <button onClick={cadastrarProduto}>Cadastrar</button>
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
                        <input placeholder="Insira nome"  value={produtoEdit.nome} onChange={e=>setProdutoEdit({...produtoEdit,nome:e.target.value})}/>
                        <label>Fornecedor:</label>
                        <input placeholder="Insira CNPJ" value={produtoEdit.cnpj} onChange={e=>setProdutoEdit({...produtoEdit,cnpj:e.target.value})}/>
                        <label>Código do Produto:</label>
                        <input placeholder="Insira código" value={produtoEdit.codigo} onChange={e=>setProdutoEdit({...produtoEdit,codigo:e.target.value})}/>
                        <label>Categoria:</label>
                        <input placeholder="Insira uma categoria" value={produtoEdit.categoria} onChange={e=>setProdutoEdit({...produtoEdit,categoria:e.target.value})}/>
                       <button onClick={editarProduto}>Editar</button>
                       <button style={{marginTop:10}} onClick={_=>setEdit(false)}>Canecelar</button>
                    </div>
                </div>
            </div> : ""
            }
           </>
}