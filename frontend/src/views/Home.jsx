import React from 'react'
import { useEffect, useState } from "react"

import "./Home.css"

import { useHistory } from "react-router-dom";

import { createSolicitud } from "../repositories/solicitudes"

import Login from "../components/Login"


export default function Home() {
    return (
        <div>
            <div className="d-flex justify-content-center flex-column">
                <h2>
                    Bienvendio al intranet de LA CLAVE
                </h2>

                <h5>
                    ¡Saludos a todo el increíble equipo de La Clave!

                    Bienvenidos a nuestra intranet, el corazón digital que conecta cada uno de nuestros esfuerzos en busca de la 
                    excelencia financiera. En La Clave, reconocemos que ustedes son el alma de nuestra institución, y es por eso 
                    que esta plataforma está diseñada pensando en cada uno de ustedes.
                </h5>

            </div>
        </div>
    )
}
