import Solicitudes from "../models/Solicitudes.js";

export default class UserController {
  async getAll(req, res) {
    const users = await Solicitudes.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.send(users);
  }

  async create(req, res) {
    // console.log("Peticion post recibida");
    try {
      const solicitud = await Solicitudes.create({
        pago_mensual: req.body.pago_mensual,
        pago_total: req.body.pago_total,
        interes_total: req.body.interes_total,
      });
      res.send({ success: true, message: "Solicitud creada exitosamente" });
    } catch (error) {
      res.send({
        success: false,
        message: "Error creando solicitud",
        erro: error.message,
      });
    }
  }

  async get(req, res) {
    const solicitud = await Solicitudes.findByPk(req.params.solicitudesId);
    res.send(solicitud);
  }

  async update(req, res) {
    const solicitud = await Solicitudes.findByPk(req.params.solicitudesId);
    solicitud.update({ estado: req.body.estado });
    res.send(solicitud);
  }
}
