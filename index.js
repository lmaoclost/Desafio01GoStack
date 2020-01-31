const express = require('express');

const server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Novo projeto 1",
    tasks: ["Nova tarefa 1"]
  },
  {
    id: "2",
    title: "Novo projeto 2",
    tasks: ["Nova tarefa 2"]
  }
];

function checkProjectInArray(req, res, next){
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

function showAmountRequest(req, res, next){
  console.count("Número de requisições");
  return next();
}

server.use(showAmountRequest);

server.get('/projects', (req, res) => {
  return res.json(projects)
});

server.get('/projects/:id', checkProjectInArray, (req, res) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  return res.json(project);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push( project );

  return res.json(projects);
});

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  const project = projects.find(p => p.id == id);

  project.tasks.push( title );
  return res.json(project);
});

server.put('/projects/:id', checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkProjectInArray, (req, res) => {
  const { id } = req.params;
  
  const projectIndex = projects.find(p => p.id == id);

  projects.splice(projectIndex, 1);
  return res.send();
});

server.listen(3000);