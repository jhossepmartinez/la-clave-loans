import Solicitudes from '../models/Solicitudes.js';

export default class UserController {
    async getAll(req, res) {
        const users = await Solicitudes.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.send(users);
    }

	async create(req, res) {
		const solicitud = await Solicitudes.create({
			pago_mensual: req.body.pago_mensual,
			pago_total: req.body.pago_total,
			interes_total: req.body.interes_total,
		});
		res.send(solicitud);
	}

	async get(req, res) {
		const solicitud = await Solicitudes.findByPk(req.params.solicitudesId);
		res.send(solicitud);
	}

	async update(req, res) {
		const solicitud = await Solicitudes.findByPk(req.params.solicitudesId);
		solicitud.update({estado: req.body.estado});
		res.send(solicitud);
	}

};


