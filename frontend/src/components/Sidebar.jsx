import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { BsCalculator } from "react-icons/bs";

import { Link, } from "react-router-dom";

export default function Sidebar() {
    const stored_nombre = sessionStorage.getItem("nombre");
    const is_gerente = stored_nombre === "gerente";
    const is_analista = stored_nombre === "analista";
    return (
        <Navbar className="bg-light" >
            <Nav defaultActiveKey="/" className="flex-column sidebar-sticky">
                <Link to="/"><Nav.Link href="/">Inicio</Nav.Link></Link>
                {/* <Link to="/users"><Nav.Link href="/users">Usuarios</Nav.Link></Link> */}
                {is_analista && <Link to="/calculator"><Nav.Link href="/calculator">Calculadora</Nav.Link></Link>}
                {is_gerente && <Link to="/solicitudes"><Nav.Link href="/solicitudes">Solicitudes</Nav.Link></Link>}
                <Link to="/busqueda-solicitudes"><Nav.Link href="/busqueda-solicitudes">Buscar Solicitudes</Nav.Link></Link>
            </Nav>
        </Navbar>
    )
}
