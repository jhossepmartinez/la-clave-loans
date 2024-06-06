
import React from "react";
import { useState } from "react";

import {getSolicitud } from "../../repositories/solicitudes";

export default function busqueda_solicitudes_publica() {
    const [id_n_return, set_id_n_return] = useState(0);
    const [display_search_result, set_search_result] = useState(false)
    const [response_search, set_response_search] = useState({});

    const search = async (event) => {
        event.preventDefault();
        
        try{
            console.log("Intendando busqueda");
            const response = await getSolicitud(id_n_return);
            set_search_result(true);
            set_response_search(response)
            console.log("response: ",response); 
            
            }
        catch(error) {
            console.log(error);
            alert("Ha ocurrido un error al buscar");
        }
    };
    
    return (
        <div>
            <div>
                Ingrese el id de la solicitud
            </div>
            <form onSubmit={search}>
                { <input 
                    type="number"
                    id="amount"
                    className="form-control"
                    placeholder="Id"
                    min="1"
                    onChange={(e) => set_id_n_return(e.target.value)}
                />}

                <div>
                    <button
                        type="submit"
                        className="btn btn-secondary btn-block"
                    >
                        Buscar Solicitud
                    </button>
                </div>
                {display_search_result && (
					<div>{response_search.pago_mensual}</div>
				)}
            </form>
            
                
            

            
        </div>
    )
}