import { useState } from "react";
import { FaPlus } from "react-icons/fa"; // Import icon from react-icons

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title, description });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl mb-8 mx-auto max-w-4xl w-full"
    >
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title*"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            required
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          <FaPlus className="mr-2 text-xl" /> {/* Plus icon */}
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
