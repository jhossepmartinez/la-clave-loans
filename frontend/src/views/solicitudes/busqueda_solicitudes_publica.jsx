import React from "react";
import { useState } from "react";

import { getSolicitud } from "../../repositories/solicitudes";

export default function BusquedaSolicitudesPublica() {
	const [id_n_return, set_id_n_return] = useState(0);
	const [display_search_result, set_search_result] = useState(false);
	const [response_search, set_response_search] = useState({});

	const search = async (event) => {
		event.preventDefault();

		try {
			console.log("Intendando busqueda");
			const response = await getSolicitud(id_n_return);
			set_search_result(true);
			set_response_search(response);
			console.log("response: ", response);
		} catch (error) {
			console.log(error);
			alert("Ha ocurrido un error al buscar");
		}
	};

	return (
		<div>
			<form onSubmit={search}>
				<div className="card card-body text-center mt-5">
					<h1 className="heading display-5 pb-3">
						Solicitud {response_search.id}
					</h1>
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">Pago total $</span>
							</div>
							<input
								type="number"
								className="form-control"
								id="amount"
								min="1"
								disabled
								placeholder="Pago Total"
								value={response_search.pago_total || 0}
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">Interes Total $</span>
							</div>
							<input
								type="number"
								className="form-control"
								id="interest"
								min="1"
								disabled
								placeholder="Interes Total"
								value={response_search.interes_total || 0}
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text">Pago Mensual $</span>
							</div>
							<input
								type="number"
								className="form-control"
								id="interest"
								min="1"
								disabled
								placeholder="Pago Mensual"
								value={response_search.pago_mensual || 0}
							/>
						</div>
					</div>

					<div>
						<input
							type="number"
							id="amount"
							className="form-control"
							placeholder="Ingrese id de solicitud"
							min="1"
							onChange={(e) => set_id_n_return(e.target.value)}
						/>
						<button type="submit" className="btn btn-secondary btn-block">
							Buscar Solicitud
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

