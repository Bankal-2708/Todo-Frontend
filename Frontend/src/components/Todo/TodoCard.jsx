import React from "react";

function TodoCard({ item }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {item.title}
          </h3>

          <p className="text-gray-500 mt-2">
            {item.description}
          </p>
        </div>

        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
          {item.status}
        </span>

      </div>

    </div>
  );
}

export default TodoCard;