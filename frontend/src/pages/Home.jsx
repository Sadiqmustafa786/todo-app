import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import axios from "axios";
import {
  FaClipboardList,
  FaCheckCircle,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa";
import LandingPage from "./LandingPage";

const Home = () => {
  const { user, token } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch Todos from the API when the user is authenticated
  useEffect(() => {
    if (user && token) fetchTodos();
  }, [user, token]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/todo/getAll",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos(data.todos);
      setError(null);
    } catch (err) {
      setError("❌ Failed to load todos. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todoData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/todo/create",
        todoData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([...todos, data.todo]);
      setError(null);
    } catch (err) {
      setError("❌ Failed to add todo. Try again.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/todo/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
      setError(null);
    } catch (err) {
      setError("❌ Failed to delete todo. Try again.");
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const { data } = await axios.patch(
        `http://localhost:8080/api/v1/todo/update/${id}`,
        { completed: !todo.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map((t) => (t._id === id ? data.todo : t)));
      setError(null);
    } catch (err) {
      setError("❌ Failed to update todo. Try again.");
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:8080/api/v1/todo/update/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map((t) => (t._id === id ? data.todo : t)));
      setError(null);
    } catch (err) {
      setError("❌ Failed to update todo. Try again.");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === "completed") return todo.completed;
    if (activeFilter === "active") return !todo.completed;
    return true;
  });

  const clearCompleted = async () => {
    try {
      await Promise.all(
        todos
          .filter((todo) => todo.completed)
          .map((todo) =>
            axios.delete(
              `http://localhost:8080/api/v1/todo/delete/${todo._id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
          )
      );
      setTodos(todos.filter((todo) => !todo.completed));
      setError(null);
    } catch (err) {
      setError("❌ Failed to clear completed todos. Try again.");
    }
  };

  if (!user) {
    return <LandingPage />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Fetching your todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4">
      <div className="max-w-3xl mx-auto animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-black mt-10 flex justify-center items-center gap-2">
            <FaClipboardList className="text-orange-500" /> Your Todo List
          </h1>

          <p className="text-md text-gray-600 italic">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 p-4 transition-all duration-300 hover:shadow-lg">
          <TodoForm onAdd={addTodo} />
        </div>

        <div className="bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b bg-gray-50">
            <div className="flex space-x-2">
              {["all", "active", "completed"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
            {todos.some((t) => t.completed) && (
              <button
                onClick={clearCompleted}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
              >
                <FaTrashAlt /> Clear Completed
              </button>
            )}
          </div>

          {filteredTodos.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              <FaCheckCircle className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">
                {activeFilter === "all"
                  ? "No todos yet. Add your first one!"
                  : activeFilter === "completed"
                  ? "No completed todos yet."
                  : "No active todos. All done!"}
              </p>
            </div>
          ) : (
            <TodoList
              todos={filteredTodos}
              onDelete={deleteTodo}
              onToggleComplete={toggleComplete}
              onUpdate={updateTodo}
            />
          )}

          <div className="p-4 border-t text-sm text-gray-500 flex justify-between items-center bg-gray-50">
            <span>{filteredTodos.length} item(s)</span>
            <span>{todos.filter((t) => t.completed).length} completed ✅</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
