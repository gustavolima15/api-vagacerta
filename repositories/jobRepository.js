const { v4: uuidv4 } = require('uuid');

let jobs = [];

const findAll = () => {
  return jobs;
};

const findById = (id) => jobs.find(job => job.id === id);

const create = ({ descricao, salario, id_usuario }) => {
  const newJob = { id: uuidv4(), descricao, salario, id_usuario };
  jobs.push(newJob);
  return newJob;
};

const update = (id, { descricao, salario, id_usuario }) => {
  const index = jobs.findIndex(job => job.id === id);
  if (index !== -1) {
    jobs[index] = { id, descricao, salario, id_usuario };
    return jobs[index];
  }
  return null;
};

const remove = (id) => {
  const index = jobs.findIndex(job => job.id === id);
  if (index !== -1) {
    return jobs.splice(index, 1)[0];
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
