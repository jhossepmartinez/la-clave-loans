import { useState } from "react";

export const fetchUf = () => {
	const [ufValue, set_uf_value] = useState([]);
	const [ufTimeStamp, set_uf_time_stamp] = useState([]);

	// Hace un fetch a la API
	fetch(
		"https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=d6de0b53a079216792c02b5ddb80dc55ab2c142b&formato=json"
	)
		.then((res) => res.json()) // convierte el resultado a json
		.then((data) => {
			// extrae los valores y los almacena en uf_value y uf...stamp
			set_uf_value(1000 * parseFloat(data.UFs[0].Valor));
			set_uf_time_stamp(data.UFs[0].Fecha.replaceAll("-", "/"));
		});
	return { ufValue, ufTimeStamp };
};

export const fetchEuro = () => {
	const [euroValue, setEuroValue] = useState([]);
	const [euroTimeStamp, setEuroTimeStamp] = useState([]);

	// Hace un fetch a la API
	fetch(
		"https://api.cmfchile.cl/api-sbifv3/recursos_api/euro?apikey=d6de0b53a079216792c02b5ddb80dc55ab2c142b&formato=json"
	)
		.then((res) => res.json()) // convierte el resultado a json
		.then((data) => {
			// extrae los valores y los almacena en uf_value y uf...stamp
			setEuroValue((1000 * parseFloat(data.Euros[0].Valor)).toFixed(2));
			setEuroTimeStamp(data.Euros[0].Fecha.replaceAll("-", "/"));
		});
	return { euroValue, euroTimeStamp };
};

export const fetchDolar = () => {
	const [dolarValue, setDolarValue] = useState();
	const [dolarTimeStamp, setDolarTimeStamp] = useState([]);

	// Hace un fetch a la API
	fetch(
		"https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=d6de0b53a079216792c02b5ddb80dc55ab2c142b&formato=json"
	)
		.then((res) => res.json()) // convierte el resultado a json
		.then((data) => {
			// extrae los valores y los almacena en uf_value y uf...stamp
			setDolarValue(parseFloat(data.Dolares[0].Valor).toFixed(2));
			setDolarTimeStamp(data.Dolares[0].Fecha.replaceAll("-", "/"));
		});
	return { dolarValue, dolarTimeStamp };
};

export const fetchUTM = () => {
	const [UTMValue, setUTMValue] = useState();
	const [UTMTimeStamp, setUTMTimeStamp] = useState([]);

	// Hace un fetch a la API
	fetch(
		"https://api.cmfchile.cl/api-sbifv3/recursos_api/utm?apikey=d6de0b53a079216792c02b5ddb80dc55ab2c142b&formato=json"
	)
		.then((res) => res.json()) // convierte el resultado a json
		.then((data) => {
			// extrae los valores y los almacena en uf_value y uf...stamp
			setUTMValue(1000 * parseFloat(data.UTMs[0].Valor));
			setUTMTimeStamp(data.UTMs[0].Fecha.replaceAll("-", "/"));
		});
	return { UTMValue, UTMTimeStamp };
};
