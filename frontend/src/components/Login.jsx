import { useState } from "react";

export default function Formulario({ setUser }) {
    const [nombre, setNombre] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if ((nombre !== "gerente" && nombre !== "analista") || contrasena === "") {
            setError(true);
            return;
        } 

        sessionStorage.setItem("nombre", nombre);
        sessionStorage.setItem("contrasena", contrasena);

        setError(false);

        setUser([nombre]);
    }

    return (
<div className="card card-body text-center mt-5">
                        <h1 className="heading display-5 pb-3">Iniciar Sesión</h1>
                        <div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingresar Nombre"
                                    value={nombre}
                                    onChange={(event) => setNombre(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Ingresar Contraseña"
                                    value={contrasena}
                                    onChange={(event) => setContrasena(event.target.value)}
                                />
                            </div>

                            <button className="mt-3 w-100 btn btn-primary" onClick={handleSubmit}>
                                Iniciar Sesión
                            </button>
                        </div>

                        {error && 
                            <p>  Acceso Denegado! Verifique sus credenciales.</p>
                        }
                    </div>
    )
}
