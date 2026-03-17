const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const swaggerUi = require("swagger-ui-express");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Tasks API",
    version: "1.0.0",
    description: "API para gestionar tareas"
  },
  servers: [
    {
      url: "http://localhost:3000"
    }
  ],
  paths: {
    "/tasks": {
      get: {
        summary: "Obtener todas las tareas",
        responses: {
          "200": {
            description: "Lista de tareas"
          }
        }
      },
      post: {
        summary: "Crear una tarea",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Tarea creada"
          }
        }
      }
    },
    "/tasks/{id}/toggle": {
      patch: {
        summary: "Cambiar estado completado",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": {
            description: "Tarea actualizada"
          }
        }
      }
    },
    "/tasks/{id}": {
      delete: {
        summary: "Eliminar una tarea",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": {
            description: "Tarea eliminada"
          }
        }
      }
    }
  }
};

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando" });
});

app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "El título es obligatorio" });
  }

  const task = await prisma.task.create({
    data: { title }
  });

  res.status(201).json(task);
});

app.patch("/tasks/:id/toggle", async (req, res) => {
  const task = await prisma.task.findUnique({
    where: { id: req.params.id }
  });

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  const updated = await prisma.task.update({
    where: { id: req.params.id },
    data: { completed: !task.completed }
  });

  res.json(updated);
});

app.delete("/tasks/:id", async (req, res) => {
  await prisma.task.delete({
    where: { id: req.params.id }
  });

  res.json({ message: "Tarea eliminada" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});