import React from "react";

import axios from "axios";

import { saveAs } from "file-saver";

import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import { createSolicitud } from "../../repositories/solicitudes";
import {
	useUf,
	useEuro,
	useDolar,
	useUTM,
} from "../../repositories/denominaciones";

export default function Calculator() {
	let { ufValue, ufTimeStamp } = useUf();
	let { euroValue, euroTimeStamp } = useEuro();
	let { dolarValue, dolarTimeStamp } = useDolar();
	let { UTMValue, UTMTimeStamp } = useUTM();

	const [cant_prestamo, set_cant_prestamo] = useState(0);
	const [tasa, set_tasa] = useState(0);
	const [meses, set_meses] = useState(0);
	const [pago_mensual, set_pago_mensual] = useState(0);
	const [pago_total, set_pago_total] = useState(0);
	const [interes_total, set_interest_total] = useState(0);

	const [pago_mensual_clp, set_pago_mensual_clp] = useState(0);
	const [pago_total_clp, set_pago_total_clp] = useState(0);
	const [interes_total_clp, set_interest_total_clp] = useState(0);

	const [cant_prestamo_variable, set_cant_prestamo_variable] = useState(0);

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
			console.log(pago_mensual, ufValue);
			set_cant_prestamo_variable(
				parseFloat((cant_prestamo / ufValue).toFixed(2))
			);
			set_pago_mensual_clp(parseFloat(pago_mensual));
			set_pago_mensual(parseFloat((pago_mensual / ufValue).toFixed(2)));
			set_pago_total_clp(parseFloat(pago_mensual * meses));
			set_pago_total(parseFloat(((pago_mensual * meses) / ufValue).toFixed(2)));
			set_interest_total_clp(
				parseFloat((pago_total - cant_prestamo).toFixed(2))
			);
			set_interest_total(
				parseFloat(((pago_total - cant_prestamo) / ufValue).toFixed(2))
			);
		} else {
			set_pago_mensual("Invalid Input!");
		}
	}
	const history = useHistory();

	const [state, setstate] = useState({});

	const [show_alert, set_show_alert] = useState(false);
	const [display_download_button, set_download_button] = useState(false);
	const [submitedSolicitudId, setSubmitedSolicitudId] = useState(null);
	const [show_alert_error, set_show_alert_error] = useState(false);

	const submitForm = async (e) => {
		e.preventDefault();
		try {
			console.log("Intentando solicitud");
			const response = await createSolicitud(state);
			setSubmitedSolicitudId(response.data.solicitud.id);
			// history.push(`/solicitudes/${response.data.id}`);
			set_show_alert_error(false);
			set_show_alert(true);
			set_download_button(true);
			// setTimeout(() => {
			// 	set_show_alert(false);
			// }, 3000);
		} catch (error) {
			set_show_alert(false);
			set_show_alert_error(true);
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

	const download_form = () => {
		let arr =
			"Tasa: " +
			tasa +
			"\nMeses: " +
			meses +
			"\n\nCantidad de prestamo en CLP: " +
			cant_prestamo +
			"\nPago mensual en CLP: " +
			pago_mensual_clp +
			"\nPago total en CLP: " +
			pago_total_clp +
			"\nInteres total en CLP: " +
			interes_total_clp +
			"\n\nCantidad de prestamo en UF: " +
			cant_prestamo_variable +
			"\nPago mensual en UF: " +
			pago_mensual +
			"\nPago total en UF: " +
			pago_total +
			"\nInteres total en UF: " +
			interes_total;

		const blob = new Blob([arr], { type: "text/plain;charset=utf-8" });
		saveAs(blob, "informe.txt");
	};

	// useEffect(() => {
	//     setstate({ ...state, monto: pago_total });
	// }, [pago_total])

	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-md-7 mx-auto calculate-form">
						<div className="card card-body text-center mt-5">
							<div className="row">
								<div className="col-md">
									<div className="span-container">
										<div className="d-inline">
											<span className="input-group-text">
												UF Dia:{" "}
												{ufValue >= 0 ? (
													ufValue + " CLP"
												) : (
													<div
														class="spinner-border spinner-border-sm"
														role="status"
													>
														<span class="null-only">Loading...</span>
													</div>
												)}
											</span>
										</div>
									</div>
								</div>
								<div className="col-md">
									<div className="span-container">
										<div className="d-inline">
											<span className="input-group-text">
												Fecha UF:{" "}
												{ufTimeStamp ? (
													ufTimeStamp
												) : (
													<div
														class="spinner-border spinner-border-sm"
														role="status"
													>
														<span class="sr-only">Loading...</span>
													</div>
												)}
											</span>
										</div>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-md">
									<div className="span-container">
										<div className="d-inline">
											<span className="input-group-text">
												Euro Dia:{" "}
												{euroValue >= 0 ? (
													euroValue + " CLP"
												) : (
													<div
														class="spinner-border spinner-border-sm"
														role="status"
													>
														<span class="sr-only">Loading...</span>
													</div>
												)}
											</span>
										</div>
									</div>
								</div>
								<div className="col-md">
									<div className="span-container">
										<div className="d-inline">
											<span className="input-group-text">
												Fecha Euro:{" "}
												{euroTimeStamp ? (
													euroTimeStamp
												) : (
													<div
														class="spinner-border spinner-border-sm"
														role="status"
													>
														<span class="sr-only">Loading...</span>
													</div>
												)}
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md">
									<div className="span-container">
										<div className="d-inline">
											<span className="input-group-text">
												Dolar Dia:{" "}
												{dolarValue >= 0 ? (
													dolarValue + " CLP"
												) : (
													<div
														class="spinner-border spinner-border-sm"
														role="status"
													>
														<span class="sr-only">Loading...</span>
													</div>
												)}
											</span>
										</div>
									</div>
								</div>
								<div className="col-md">
									<div className="span-container">
										<div className="d-inline">
											<span className="input-group-text">
												Fecha Dolar:{" "}
												{dolarTimeStamp ? (
													dolarTimeStamp
												) : (
													<div
														class="spinner-border spinner-border-sm"
														role="status"
													>
														<span class="sr-only">Loading...</span>
													</div>
												)}
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md">
									<div className="span-container">
										<div className="d-inline">
											<span className="input-group-text">
												UTM Dia:{" "}
												{UTMValue >= 0 ? (
													UTMValue + " CLP"
												) : (
													<div
														class="spinner-border spinner-border-sm"
														role="status"
													>
														<span class="sr-only">Loading...</span>
													</div>
												)}
											</span>
										</div>
									</div>
								</div>
								<div className="col-md">
									<div className="span-container">
										<div className="d-inline">
											<span className="input-group-text">
												Fecha UTM:{" "}
												{UTMTimeStamp ? (
													UTMTimeStamp
												) : (
													<div
														class="spinner-border spinner-border-sm"
														role="status"
													>
														<span class="sr-only">Loading...</span>
													</div>
												)}
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
								{display_download_button == true && (
									<button
										type="submit"
										className="btn btn-secondary btn-block"
										onClick={download_form}
									>
										Descargar informe
									</button>
								)}
								{show_alert && (
									<div className="alert alert-success" role="alert">
										Solicitud enviada correctamente! codigo solicitud{" "}
										{submitedSolicitudId}
									</div>
								)}
								{show_alert_error && (
									<div className="alert alert-error" role="alert">
										Solicitud no se pudo enviar correctamente!
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
