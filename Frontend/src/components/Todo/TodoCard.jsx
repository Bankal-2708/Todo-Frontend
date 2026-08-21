import React from "react";
import { FiEdit2, FiCalendar, FiClock } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

function TodoCard({
  item,
  deleteTask,
  setShowUpdate,
  setUpdateId,
  setSelectedTask
}) {
  const isCompleted = item.status === "completed";

  const date = new Date(item.createdAt);

  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });

  const handleEdit = () => {
    setUpdateId(item._id);
    setSelectedTask(item);
    setShowUpdate(true);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xl">

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0 flex-1">

          <h3
            className={`text-xl font-semibold break-words ${
              isCompleted
                ? "line-through text-gray-400"
                : "text-gray-800"
            }`}
          >
            {item.title}
          </h3>

          <p
            className={`mt-2 break-words whitespace-normal ${
              isCompleted
                ? "line-through text-gray-400"
                : "text-gray-500"
            }`}
          >
            {item.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">

            <div className="flex items-center gap-1">
              <FiCalendar size={15} />
              {formattedDate}
            </div>

            <div className="flex items-center gap-1">
              <FiClock size={15} />
              {formattedTime}
            </div>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {item.status}
          </span>

          <button
            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 cursor-pointer hover:scale-110 hover:shadow-lg transition duration-200"
            title="Edit Todo"
            onClick={handleEdit}
          >
            <FiEdit2 size={18} />
          </button>

          <button
            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 cursor-pointer hover:scale-110 hover:shadow-lg transition duration-200"
            title="Delete Todo"
            onClick={() => deleteTask(item._id)}
          >
            <AiFillDelete size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default TodoCard;