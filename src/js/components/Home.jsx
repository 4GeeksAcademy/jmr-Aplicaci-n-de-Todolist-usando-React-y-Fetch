import React, { useEffect, useState } from "react";

const API_URL_BASE = "https://playground.4geeks.com/todo";
const USERNAME = "jmr4geeks";
const API_URL = `${API_URL_BASE}/users/${USERNAME}`;

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Obtener las tareas desde la API
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Sucedió un error al consultar el endpoint.");
      const data = await response.json();
      setTasks(data.todos || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Actualizar tareas en la API
  const updateTasks = async (updatedTasks) => {
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todos: updatedTasks }),
      });
      if (!response.ok) throw new Error("Sucedió un error al actualizar las tareas.");
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error al actualizar las tareas", error);
    }
  };

  // Agregar una nueva tarea
  const addTask = () => {
    if (!newTask.trim()) return;
    const updatedTasks = [...tasks, { label: newTask, done: false }];
    updateTasks(updatedTasks);
    setNewTask("");
  };

  // Eliminar una tarea específica
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    updateTasks(updatedTasks);
  };

  // Limpiar todas las tareas
  const clearTasks = async () => {
    try {
      const response = await fetch(API_URL, { method: "DELETE" });
      if (!response.ok) throw new Error("Sucedió un error al eliminar todas las tareas.");
      setTasks([]);
    } catch (error) {
      console.error("Error al limpiar las tareas", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Añadir nueva tarea"
      />
      <button onClick={addTask}>Agregar</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.label}
            <button onClick={() => deleteTask(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button onClick={clearTasks}>Limpiar Todo</button>
    </div>
  );
};

export default TodoList;
