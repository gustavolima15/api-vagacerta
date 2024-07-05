const Usuario = require('../models/usuario');

const findAll = async () => {
  return await Usuario.findAll();
};

const findById = async (id) => {
  return await Usuario.findByPk(id);
};

const create = async ({ nome, email, senha }) => {
  return await Usuario.create({ nome, email, senha });
};

const update = async (id, { nome, email, senha }) => {
  const usuario = await Usuario.findByPk(id);
  if (usuario) {
    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senha;
    await usuario.save();
    return usuario;
  }
  return null;
};

const remove = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return user;
  }
  return null;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
