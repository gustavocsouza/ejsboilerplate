const validator = require("validator");
const mongoose = require("mongoose");

const ContatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    required: false,
    default: "",
  },
  email: {
    type: String,
    required: false,
    default: "",
  },
  telefone: {
    type: String,
    required: false,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;

    this.contato = await ContatoModel.create(this.body);
  }

  async edit(id) {
    if (typeof id !== "string") return;
    this.valida();

    if (this.errors.length > 0) return;

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
  }

  valida() {
    this.cleanup();

    if (this.body.email && !validator.isEmail(this.body.email))
      this.errors.push("E-mail inválido!");

    if (!this.body.nome) this.errors.push("Nome é obrigatório.");

    if (!this.body.email && !this.body.telefone)
      this.errors.push("Algum contato precisa ser enviado.");
  }

  cleanup() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
    };
  }

  static async findById(id) {
    if (typeof id !== "string") return;
    const contato = await ContatoModel.findById(id);
    return contato;
  }

  static async findAll() {
    const contatos = await ContatoModel.find().sort({ createdAt: -1 });
    return contatos;
  }

  static async delete(id) {
    if (typeof id !== "string") return;
    const contato = await ContatoModel.findOneAndDelete({ _id: id });
    return contato;
  }
}

module.exports = Contato;
