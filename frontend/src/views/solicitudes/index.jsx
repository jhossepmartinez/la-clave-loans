import React, { useState } from "react";
import useSWR, { mutate } from "swr";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import DeleteForm from "../../components/DeleteForm";
import { getAllSolicitudes, updateSolicitud, getSolicitud } from "../../repositories/solicitudes";

export default function index() {
	const { data, error } = useSWR("/solicitudes?orderBy=createdAt", {
		fetcher: getAllSolicitudes,
		initialData: [],
		revalidateOnMount: true,
	});



    const [id, set_id] = useState(0);

	const { solicitud, error2 } = useSWR(id, {
		fetcher: getSolicitud,
		initialData: { estado: "No", pago_mensual: 0, pago_total: 0, interes_total: 0},
		revalidateOnMount: true,
	});

    const [state, setstate] = useState(solicitud);


	const submitForm = async (e) => {
		e.preventDefault();
		try {
			await updateSolicitud(id, state);
            mutate("/solicitudes?orderBy=createdAt");
            console.log("XD");
		} catch (error) {
            console.log(error);
			alert("A ocurrido un error al actualizar");
		}
	};


    const tbody = [];
    console.log(data);

    data.forEach(({ pago_mensual, pago_total, interes_total, id, estado }) => {
        let row_style = {};

        if (estado === "Aceptado") {
            row_style = { backgroundColor: "#b8e0d2"}
        } else if (estado === "Rechazado") {
            row_style = { backgroundColor: "#eac4d5"}
        } else {
            row_style = { backgroundColor: "#fcf5c7"}
        }
        tbody.push(
            <tr style={row_style}>
                <td>{pago_mensual}</td>
                <td>{pago_total}</td>
                <td>{interes_total}</td>
                <td>{estado !== null ? estado : "Pendiente"}</td>
                <td>
                    <div className="container">
                        <div className="row">
                            <form onSubmit={submitForm}>
                                <div className="col">
                                    <input
                                        type="submit"
                                        id="estado"
                                        className="btn btn-success"
                                        value="Aceptar"
                                        onClick={() => {
                                            set_id(id);
                                            setstate({...state, estado: "Aceptado"});
                                        }}
                                    />
                                </div>

                                <div className="col">
                                    <input 
                                        type="submit"
                                        className="btn btn-danger"
                                        value="Rechazar"
                                        onClick={() => {
                                            set_id(id);
                                            setstate({...state, estado: "Rechazado"})
                                        }}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <Container className="pt-4">
            <div className="d-flex align-items-center">
                <h1>Listado de Solicitudes</h1>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Pago Mensual UF</th>
                        <th>Pago Total UF</th>
                        <th>Interes Total UF</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>{tbody}</tbody>
            </Table>
        </Container>
    );
}
