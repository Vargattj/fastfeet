import Delivery from "../models/Delivery";
import User from "../models/User";
import File from "../models/File";
import * as Yup from "yup";

class DeliveryController {
  async store(req, res) {
    const deliveryExists = await Delivery.findOne({
      where: { email: req.body.email },
    });

    if (deliveryExists) {
      return res.status(400).json({ error: "Delivery already exists! " });
    }

    const verifyProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!verifyProvider) {
      return res
        .status(401)
        .json({ error: "Only providers can create deliveries" });
    }

    const newDelivery = await Delivery.create(req.body);
    res.json(newDelivery);
  }

  async index(req, res) {
    const verifyProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!verifyProvider) {
      return res
        .status(401)
        .json({ error: "Only providers can list deliveries" });
    }

    const deliveries = await Delivery.findAll({
      attributes: ["id", "name", "email", "avatar_id"],
      include: [
        { model: File, as: "avatar", attributes: ["name", "path", "url"] },
      ],
    });

    res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const { id } = req.params;
    const { email } = req.body;

    const verifyProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!verifyProvider) {
      return res
        .status(401)
        .json({ error: "Only providers can update deliveries" });
    }

    const delivery = await Delivery.findByPk(id);
    if (delivery.email !== email) {
      const deliveryExists = await Delivery.findOne({
        where: { email: req.body.email },
      });

      if (deliveryExists) {
        return res.status(400).json({ error: "Delivery already exists! " });
      }
    }

    const { avatar_id } = await delivery.update(req.body);
    res.json({ id, avatar_id, email });
  }

  async delete(req, res) {
    const { id } = req.params;
    const verifyProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!verifyProvider) {
      return res
        .status(401)
        .json({ error: "Only providers can delete deliveries" });
    }

    const delivery = await Delivery.findByPk(id);
    await delivery.destroy();
    res.json();
  }
}

export default new DeliveryController();
