import React from "react";
import './css/tabelaElementos.css';
import { AiOutlineEdit,AiFillDelete } from "react-icons/ai";
import { Fornecedor } from './../view/Fornecedores';
import { Produto } from "../view/Produtos";

interface TabelaElementos
{
    header:string[];
    listaFornecedor?: Fornecedor[]; 
    listaProduto?: Produto[];     
    delete(id:number):void  
    setEdit(valor:boolean):void,
    setState(valor:any):void
}




export default function TabelaElementos(props:TabelaElementos)
{
    function rowDesktop()
    {
        if(props.listaFornecedor){
          return props.listaFornecedor.map(function(valor:Fornecedor)
          {
                return  <tr key={valor.id}>
                <td>{valor.nome}</td>
                <td>{valor.cnpj}</td>
                <td>{valor.estado}</td>
                <td>0</td>
                <td className="operacaoTabelaElementos"><span className="operacaoTabelaElementos" onClick={_=>props.setEdit(true)}><AiOutlineEdit  color="#D6AB4B"/></span> <span onClick={_=>props.delete(valor.id)} className="operacaoTabelaElementos"><AiFillDelete  color="#05C62E"/></span></td>
                </tr>
          }) 
        }else if(props.listaProduto)
        {
            return props.listaProduto.map(function(valor:Produto)
          {
                return  <tr key={valor.id}>
                <td>{valor.nome}</td>
                <td>{valor.codigo}</td>
                <td>{valor.categoria}</td>
                <td>{valor.cnpj}</td>
                <td className="operacaoTabelaElementos"><span className="operacaoTabelaElementos" onClick={_=>{props.setEdit(true);props.setState(valor);}}><AiOutlineEdit  color="#D6AB4B"/></span> <span onClick={_=>props.delete(valor.id)} className="operacaoTabelaElementos"><AiFillDelete  color="#05C62E"/></span></td>
                </tr>
          }) 

        }
    }

    function tabelaMobile()
    {
        if(props.listaFornecedor){
            return props.listaFornecedor.map(function(valor:Fornecedor)
            {
                  return  <> <table className="tableMobile" cellSpacing={0}>                      
                            
                                <tr>
                                    <td className="cabecalhoTabelaElementos">{props.header[0]}</td>
                                    <td>{valor.nome}</td>
                                </tr>
                                <tr>
                                    <td className="cabecalhoTabelaElementos">{props.header[1]}</td>
                                    <td>{valor.cnpj}</td>
                                </tr>
                                <tr>
                                    <td className="cabecalhoTabelaElementos">{props.header[2]}</td>
                                    <td>{valor.estado}</td>
                                </tr>
                                <tr>
                                    <td className="cabecalhoTabelaElementos">{props.header[3]}</td>
                                    <td>{0}</td>
                                </tr>
                                <tr>
                                    <td className="cabecalhoTabelaElementos">{props.header[3]}</td>
                                    <td className="operacaoTabelaElementos"><span className="operacaoTabelaElementos" onClick={_=>props.setEdit(true)}><AiOutlineEdit  color="#D6AB4B"/></span>  <span onClick={_=>props.delete(valor.id)} className="operacaoTabelaElementos"><AiFillDelete  color="#05C62E"/></span></td>
                                </tr>                        
                    </table>                     
                    </>
            }) 
          }else if(props.listaProduto)
          {
            return props.listaProduto.map(function(valor:Produto)
            {
                  return  <> <table className="tableMobile" cellSpacing={0}>                      
                            
                                <tr>
                                    <td className="cabecalhoTabelaElementos">{props.header[0]}</td>
                                    <td>{valor.nome}</td>
                                </tr>
                                <tr>
                                    <td className="cabecalhoTabelaElementos">{props.header[1]}</td>
                                    <td>{valor.codigo}</td>
                                </tr>
                                <tr>
                                    <td className="cabecalhoTabelaElementos">{props.header[2]}</td>
                                    <td>{valor.categoria}</td>
                                </tr>
                                <tr>
                                    <td className="cabecalhoTabelaElementos">{props.header[3]}</td>
                                    <td>{valor.cnpj}</td>
                                </tr>
                                <tr>
                                    <td className="cabecalhoTabelaElementos">{props.header[3]}</td>
                                    <td className="operacaoTabelaElementos"><span className="operacaoTabelaElementos" onClick={_=>{props.setEdit(true);props.setState(valor);}}><AiOutlineEdit  color="#D6AB4B"/></span>  <span onClick={_=>props.delete(valor.id)} className="operacaoTabelaElementos"><AiFillDelete  color="#05C62E"/></span></td>
                                </tr>                        
                    </table>                     
                    </>
            })
          }
    }

    return <>
          <div className="tabelaDesktop">
              <table cellSpacing={0}>  
                    <thead>                
                      <tr className="cabecalhoTabelaElementos">
                          {props.header.map(function(valor,index)
                          {
                              return <th key={index}>{valor}</th>
                          })}            
                      </tr>
                      </thead>
                      <tbody>
                         {rowDesktop()}
                     </tbody>                     
              </table>
            </div>
            <div className="tabelaMobile">
                   {tabelaMobile()}
            </div>
            </>
}// Index===3 ? <><td  className="cabecalhoTabelaElementos">{valor}</td><td>Alan Bruno Rios Miguel da Silva</td></> : <>    <td className="operacaoTabelaElementos"><span className="operacaoTabelaElementos" onClick={_=>props.setEdit(true)}><AiOutlineEdit  color="#D6AB4B"/></span> <span className="operacaoTabelaElementos"><AiFillDelete  color="#05C62E"/></span></td></>