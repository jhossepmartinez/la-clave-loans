import { useEffect, useState } from "react";
import axios from "axios";

const Conversiones = () => {
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

export default Conversiones;
