import Solicitudes from "../models/Solicitudes.js";

export default class UserController {
  async getAll(req, res) {
    const users = await Solicitudes.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.send(users);
  }

  async create(req, res) {
    const required_attributes = ["pago_mensual", "pago_total", "interes_total"];
    const missing_attributes = required_attributes.filter(
      (attr) => !(attr in req.body)
    );

    if (missing_attributes.length > 0) {
      return res.status(400).send({
        success: false,
        message: `Missing attributes: ${missing_attributes.join(",")}`,
      });
    }
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
    try {
      const solicitud = await Solicitudes.findByPk(req.params.solicitudesId);

      if (!solicitud) {
        return res.status(404).send({
          success: false,
          message: "Solicitud not found",
        });
      }

      return res.send(solicitud);
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Error retrieving solicitud",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      if (req.body.estado !== "Aceptado" && req.body.estado !== "Rechazado") {
        return res.status(400).send({
          success: false,
          message: "'estado' attribute should be 'Aceptado' or 'Rechazado'",
        });
      }

      console.log(req.body);

      const solicitud = await Solicitudes.findByPk(req.params.solicitudesId);
      solicitud.update({ estado: req.body.estado });

      res.send({ success: true, message: "Solicitud creada exitosamente" });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Error updating solicitud",
        error: error.message,
      });
    }
  }
}
