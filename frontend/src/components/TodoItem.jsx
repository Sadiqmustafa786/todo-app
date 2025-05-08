import { useState } from "react";
import { FaEdit, FaTrashAlt, FaCheckCircle, FaRegCircle } from "react-icons/fa"; // Import react-icons

const TodoItem = ({ todo, onDelete, onToggleComplete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleUpdate = () => {
    if (editTitle.trim()) {
      onUpdate(todo._id, {
        title: editTitle,
        description: editDescription,
      });
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg m-4 transition-all duration-300 hover:shadow-xl hover:scale-105 transform hover:translate-y-2">
      <div className="flex items-start">
        {/* Todo Checkbox */}
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => onToggleComplete(todo._id)}
        >
          {todo.completed ? (
            <div className="bg-orange-500 rounded-full p-1">
              <FaCheckCircle className="text-white h-5 w-5" />
            </div>
          ) : (
            <FaRegCircle className="text-gray-400 h-6 w-6" />
          )}
        </div>

        {/* Todo Title and Description */}
        <div className="flex-grow ml-4">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                rows={2}
              />
            </div>
          ) : (
            <div>
              <h3
                className={`text-xl font-semibold ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  className={`text-gray-700 ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 ml-6">
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="text-green-600 hover:text-green-800 transition-colors duration-200 transform hover:scale-110"
            >
              <FaCheckCircle />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-500 hover:text-yellow-700 transition-colors duration-200 transform hover:scale-110"
            >
              <FaEdit />
            </button>
          )}

          <button
            onClick={() => onDelete(todo._id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200 transform hover:scale-110"
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
