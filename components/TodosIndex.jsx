"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import TodoForm from "./TodoForm";

const TodosIndex = () => {
  const [todos, setTodos] = useState([]);
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const fetchTodos = async () => {
    try {
      setIsPending(true);
      const response = await axios.get("/pages/api/todo");
      setTodos(response.data?.data);
      setError(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
      setError(true);
    } finally {
      setIsPending(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setIsPending(true);
      await axios.delete(`/pages/api/todo/${id}`);
      fetchTodos();
      setError(false);
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError(true);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setShowTodoModal(true);
  };

  const handleSave = async (values) => {
    if (editingTodo) {
      try {
        setIsPending(true);
        await axios.put(`/pages/api/todo/${editingTodo.id}`, values);
        fetchTodos();
        setError(false);
      } catch (error) {
        console.error("Error updating todo:", error);
        setError(true);
      } finally {
        setIsPending(false);
      }
    } else {
      try {
        setIsPending(true);
        await axios.post("/pages/api/todo", values);
        fetchTodos();
        setError(false);
      } catch (error) {
        console.error("Error creating todo:", error);
        setError(true);
      } finally {
        setIsPending(false);
      }
    }
    setShowTodoModal(false);
    setEditingTodo(null);
  };

  return (
    <div className="flex flex-col text-center">
      <h1 className="text-4xl font-semibold">Todos</h1>
      <div className="flex justify-end">
        <button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          onClick={() => setShowTodoModal(true)}
        >
          Create Todo
        </button>
      </div>
      {error && <div className="text-red-500 text-2xl">An error occured please try again later!</div>}
      <div className="flex flex-col w-full justify-center items-center mt-10">
        {isPending && !todos.length && !error && (
          <div
            role="status"
            className="w-2/3 p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse md:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-fullw-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-fullw-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-fullw-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-fullw-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
          </div>
        )}
        {!error &&
          todos?.map((todo) => (
            <div
              key={todo.id}
              className="bg-gray-300 flex justify-between rounded w-2/3 p-5 text-start m-2"
            >
              <div>
                <h2 className="text-2xl font-medium">{todo.title}</h2>
                <p>{todo.description}</p>
              </div>
              <div className="flex">
                <button
                  className="block px-4 py-2 text-sm text-gray-700"
                  onClick={() => handleEditClick(todo)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="blue"
                    className="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                  </svg>
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="red"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
      </div>

      {showTodoModal && (
        <TodoForm
          setShowModal={setShowTodoModal}
          initialData={editingTodo}
          handleSave={handleSave}
          setEditingTodo={setEditingTodo}
        />
      )}
    </div>
  );
};

export default TodosIndex;
