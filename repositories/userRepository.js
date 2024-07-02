const { v4: uuidv4 } = require('uuid');

let users = [];

const findAll = () => users;

const findById = (id) => users.find(user => user.id === id);

const create = ({ nome, email, cpf }) => {
  const newUser = { id: uuidv4(), nome, email, cpf };
  users.push(newUser);
  return newUser;
};

const update = (id, { nome, email, cpf }) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { id, nome, email, cpf };
    return users[index];
  }
  return null;
};

const remove = (id) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
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
