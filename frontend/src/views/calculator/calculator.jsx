import React from "react";
import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import { createSolicitud } from "../../repositories/solicitudes";

export default function calculator() {
	function fetch_UF() {
		// Hace un fetch a la API
		fetch(
			"https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=d6de0b53a079216792c02b5ddb80dc55ab2c142b&formato=json"
		)
			.then((res) => res.json()) // convierte el resultado a json
			.then((data) => {
				// extrae los valores y los almacena en uf_value y uf...stamp
				set_uf_value(1000 * parseFloat(data.UFs[0].Valor));

				console.log(data.UFs[0].Fecha);
				const date_object = new Date(data.UFs[0].Fecha);
				date_object.setDate(
					date_object.getDate() + 1
				); /* Pequeno fix, sin hora se setea a un dia anterior asi que es necesario poner +1 dia  */
				const options = {
					year: "numeric",
					month: "long",
					day: "numeric",
					timezone: "UTC",
				};
				const formatted_date = date_object.toLocaleDateString("es-CL", options);
				set_uf_time_stamp(formatted_date);
			});
	}

	useEffect(() => {
		fetch_UF();
	}, []);

	const [uf_value, set_uf_value] = useState([]);
	const [uf_time_stamp, set_uf_time_stamp] = useState([]);

	const [cant_prestamo, set_cant_prestamo] = useState(0);
	const [tasa, set_tasa] = useState(0);
	const [meses, set_meses] = useState(0);
	const [pago_mensual, set_pago_mensual] = useState(0);
	const [pago_total, set_pago_total] = useState(0);
	const [interes_total, set_interest_total] = useState(0);

	function updateResult() {
		const parsed_cant_prestamo = parseFloat(cant_prestamo);
		const parsed_tasa = parseFloat(tasa);
		const parsed_meses = parseFloat(meses);

		if (
			!isNaN(parsed_cant_prestamo) &&
			!isNaN(parsed_tasa) &&
			!isNaN(parsed_meses)
		) {
			const pago_mensual = Math.round(
				parsed_cant_prestamo /
					((1 - (1 + parsed_tasa / 100) ** -parsed_meses) / (parsed_tasa / 100))
			);
			const pago_total = pago_mensual * meses;
			console.log(pago_mensual, uf_value);
			set_pago_mensual(parseFloat((pago_mensual / uf_value).toFixed(2)));
			set_pago_total(
				parseFloat(((pago_mensual * meses) / uf_value).toFixed(2))
			);
			set_interest_total(
				parseFloat(((pago_total - cant_prestamo) / uf_value).toFixed(2))
			);
		} else {
			set_pago_mensual("Invalid Input!");
		}
	}
	const history = useHistory();

	const [state, setstate] = useState({});

	const [show_alert, set_show_alert] = useState(false);

	const submitForm = async (e) => {
		e.preventDefault();
		try {
			console.log("Intentando solicitud");
			const response = await createSolicitud(state);
			// history.push(`/solicitudes/${response.data.id}`);
			set_show_alert(true);
			setTimeout(() => {
				set_show_alert(false);
			}, 1500);
		} catch (error) {
			console.log(error);
			alert("A ocurrido un error al actualizar");
		}
	};

	// UseEffect para el form de envio de solicitudes
	const update_form = () => {
		setstate({
			...state,
			pago_mensual: pago_mensual,
			pago_total: pago_total,
			interes_total: interes_total,
		});
	};

	// useEffect(() => {
	//     setstate({ ...state, monto: pago_total });
	// }, [pago_total])

	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-md-6 mx-auto calculate-form">
						<div className="card card-body text-center mt-5">
							<div className="row">
								<div className="col-md">
									<div className="span-container">
										<div className="d-inline">
											<span className="input-group-text">
												UF Dia: ${uf_value}
											</span>
										</div>
									</div>
								</div>
								<div className="col-md">
									<div className="span-container">
										<div className="d-inline">
											<span className="input-group-text">
												Fecha UF: {uf_time_stamp}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card card-body text-center mt-5">
							<h1 className="heading display-5 pb-3">
								Calculadora de Prestamo
							</h1>
							<form id="loan-form">
								<div className="form-group">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text">$</span>
										</div>
										<input
											type="number"
											className="form-control"
											id="amount"
											min="1"
											// value={cant_prestamo}
											onChange={(e) => set_cant_prestamo(e.target.value)}
											placeholder="Cantidad Prestamo"
										/>
									</div>
								</div>
								<div className="form-group">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text">%</span>
										</div>
										<input
											type="number"
											className="form-control"
											id="interest"
											min="1"
											placeholder="Tasa de interes"
											// value={tasa}
											onChange={(e) => set_tasa(e.target.value)}
										/>
									</div>
								</div>
								<div className="form-group">
									<input
										type="number"
										id="years"
										className="form-control"
										placeholder="Meses para pagar"
										min="1"
										// value={meses}
										onChange={(e) => set_meses(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<input
										value="Calcular"
										className="btn btn-primary btn-block"
										onClick={updateResult}
									/>
								</div>
							</form>

							<div id="result">
								<h5></h5>
								<form id="loan-form-output" onSubmit={submitForm}>
									<div className="form-group">
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text fix-width">
													Pago Mensual UF
												</span>
											</div>
											<input
												type="number"
												className="form-control"
												id="pago_mensual"
												value={pago_mensual}
												disabled
											/>
										</div>
									</div>
									<div className="form-group">
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text fix-width">
													Pago Total UF
												</span>
											</div>
											<input
												type="number"
												className="form-control"
												id="pago_total"
												value={pago_total}
												disabled
											/>
										</div>
									</div>
									<div className="form-group">
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text fix-width">
													Interes Total UF
												</span>
											</div>
											<input
												type="number"
												className="form-control"
												id="interes_total"
												value={interes_total}
												disabled
											/>
										</div>
									</div>
									<div className="form-group">
										<button
											type="submit"
											className="btn btn-secondary btn-block"
											onClick={update_form}
										>
											Enviar Solicitud
										</button>
									</div>
								</form>
								{show_alert && (
									<div className="alert alert-success" role="alert">
										Solicitud enviada correctamente!
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
