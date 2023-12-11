import axios from "axios";

const updateSolicitud = async (id, data) =>
	axios
		.put(`${process.env.REACT_APP_BACKEND_URL}/solicitudes/${id}`, data);

const getAllSolicitudes = () =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/solicitudes`)
		.then((res) => res.data);

const createSolicitud = async (data) =>
	axios
		.post(`${process.env.REACT_APP_BACKEND_URL}/solicitudes`, data);

const getSolicitud = (id) =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/Solicitudes/${id}`)
		.then((res) => res.data);

export { getAllSolicitudes, createSolicitud, updateSolicitud, getSolicitud };
