import Signature from "../models/Signature";

class SingnatureController {
  async store(req, res) {
    const { originalname: name, fieldname: path } = req.file;
    const signature = await Signature.create({
      name,
      path,
    });

    return res.json(signature);
  }
}

export default new SingnatureController();
