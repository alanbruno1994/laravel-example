import React from "react";
import {Switch, Route } from "react-router-dom";
import Fornecedores from "./components/view/Fornecedores";
import Login from "./components/view/Login";
import Produtos from "./components/view/Produtos";
import Register from "./components/view/Register";

export default function Rotas() {
    return <Switch>
    <Route path="/login">
        <Login/>
    </Route>
    <Route path="/fornecedores">
        <Fornecedores/>
    </Route>
    <Route path="/produtos">
        <Produtos/>
    </Route>
    <Route path="/registro">
        <Register/>
    </Route>
    <Route path="*">
        <Login/>
    </Route>
    </Switch>
    }