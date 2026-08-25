import React, { useEffect, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

function Update({
  setShowUpdate,
  updateId,
  selectedTask,
  onUpdated
}) {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    status: "pending"
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setInputs({
        title: selectedTask.title,
        description: selectedTask.description,
        status: selectedTask.status
      });
    }
  }, [selectedTask]);

  const change = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const updateTask = async () => {
    if (!inputs.title.trim() || !inputs.description.trim()) {
      toast.error("Title and description can't be empty!");
      return;
    }

    if (!updateId) {
      toast.error("Task ID not found!");
      return;
    }

    try {
      setLoading(true);

      const response = await api.put(
        `/api/v2/updateTask/${updateId}`,
        {
          title: inputs.title,
          description: inputs.description,
          status: inputs.status
        }
      );

      if (onUpdated) {
        onUpdated(response.data.list);
      } else {
        setShowUpdate(false);
      }

      toast.success("Task updated successfully");

    } catch (error) {
      console.log("UPDATE ERROR:", error.response?.data);

      toast.error(
        error.response?.data?.error ||
        "Unable to update task"
      );

    } finally {
      setLoading(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowUpdate(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={handleOutsideClick}
    >

      <div className="w-full max-w-lg bg-white p-6 sm:p-7 rounded-2xl shadow-2xl mt-4 sm:mt-10">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Update Todo
        </h2>

        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={change}
            placeholder="Enter todo title"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>

        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>

          <textarea
            name="description"
            value={inputs.description}
            onChange={change}
            placeholder="Enter todo description"
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:border-blue-500"
          />

        </div>

        <div className="mb-6">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>

          <select
            name="status"
            value={inputs.status}
            onChange={change}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none bg-white focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={() => setShowUpdate(false)}
            className="px-5 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={updateTask}
            disabled={loading}
            className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Update;