import * as Yup from "yup";
import Order from "../models/Order";
import Recipient from "../models/Recipient";
import Delivery from "../models/Delivery";

import Mail from "../../lib/Mail";

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const { recipient_id, deliveryman_id } = req.body;
    const delivery = await Delivery.findByPk(deliveryman_id);
    if (!delivery) {
      return res.status(400).json({ error: "Deliveryman does not exists" });
    }

    const recipient = await Recipient.findByPk(recipient_id);
    if (!recipient) {
      return res.status(400).json({ error: "Recipient don't exists" });
    }

    const order = await Order.create(req.body);
    await Mail.sendMail({
      to: `${delivery.name} <${delivery.email}>`,
      subject: "Nova entrega registrada",
      template: "newDelivery",
      context: {
        deliveryman: delivery.name,
        recipient: recipient.street,
      },
    });
    res.json(order);
  }
}
export default new OrderController();
