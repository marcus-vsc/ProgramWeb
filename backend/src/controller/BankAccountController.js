const crypto = require("crypto");
const connection = require("../database/connection");
module.exports = {
  async list(req, res) {
    const bankAccount = await connection("bankAccount").select("*");
    return res.json(bankAccount);
  },
  async show(req, res) {
    const { id } = req.params;
    const bankAccount = await connection("bankAccount").where("id", id).select("*");
    return res.json(bankAccount);
  },
  async showUser(req, res) {
    const { idUsuario } = req.params;
    const bankAccount = await connection("bankAccount").where("idUsuario", idUsuario).select("*");
    return res.json(bankAccount);
  },
  async create(req, res) {
    const { agencia, banco, nomeProprietario, idUsuario, saldo } = req.body;
    const id = crypto.randomBytes(4).toString("HEX");
    await connection("bankAccount").insert({
      id,
      agencia,
      banco,
      nomeProprietario,
      idUsuario,
      saldo
    });
    return res.json({ id });
  },
  async update(req, res) {
    const { id } = req.params;
    const { agencia, banco, nomeProprietario, idUsuario, saldo } = req.body;
    await connection("bankAccount").where("id", id).update({
        id,
        agencia,
        banco,
        nomeProprietario,
        idUsuario,
        saldo
    });
    return res.status(204).send();
  },
  async delete(req, res) {
    const { id } = req.params;
    await connection("bankAccount").where("id", id).delete();
    return res.status(204).send();
  },
  async deleteByUser (req, res) {
    const { idUsuario } = req.params;
    await connection("bankAccount").where("idUsuario", idUsuario).delete();
    return res.status(204).send();
  },
};
