import TodoItem from "./TodoItem";
import { FaClipboardList } from "react-icons/fa"; // Add an icon for illustration

const TodoList = ({ todos, onDelete, onToggleComplete, onUpdate }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      {todos.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-xl shadow-lg animate-pulse">
          <FaClipboardList className="mx-auto text-gray-400 w-16 h-16 mb-4" />
          <p className="text-gray-500 text-lg font-semibold">
            No todos yet. Add your first todo!
          </p>
        </div>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            onUpdate={onUpdate}
            className="transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
