import * as Yup from "yup";
import Recipient from "../models/Recipient";
import User from "../models/User";

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const verifyProvider = await User.findOne({
      where: { id: userId, provider: true },
    });

    if (!verifyProvider) {
      return res
        .status(401)
        .json({ error: "Only providers can create recipients" });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    res.json({ id, name, street, number, complement, state, city, zip_code });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const verifyProvider = await User.findByPk(req.userId);

    if (!verifyProvider.provider) {
      return res
        .status(401)
        .json({ error: "Only providers can update a recipient" });
    }

    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await recipient.update(req.body);

    res.json({ id, name, street, number, complement, state, city, zip_code });
  }
}

export default new RecipientController();
