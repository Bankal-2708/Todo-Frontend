import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import TodoCard from "./TodoCard";
import { ToastContainer, toast } from "react-toastify";
import Update from "./Update";
import api from "../../api";

function Todo() {
  const id = sessionStorage.getItem("id");

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    status: "pending"
  });

  const [array, setArray] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const chnage = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const fetchTasks = async () => {
    if (!id) {
      setArray([]);
      return;
    }

    try {
      const response = await api.get(
        `/api/v2/getTask/${id}`
      );

      if (Array.isArray(response.data.list)) {
        setArray(response.data.list);
      } else {
        setArray([]);
      }
    } catch (error) {
      console.log("FETCH ERROR:", error.response?.data);
      setArray([]);
      toast.error("Unable to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const submit = async () => {
    if (inputs.title.trim() === "" || inputs.description.trim() === "") {
      toast.error("Title and description can't be empty!");
      return;
    }

    if (!id) {
      toast.error("Your task is not saved! Please Login");
      return;
    }

    try {
      const response = await api.post(
        "/api/v2/addTask",
        {
          title: inputs.title,
          description: inputs.description,
          status: inputs.status,
          id: id
        }
      );

      console.log("POST:", response.data);

      await fetchTasks();

      setInputs({
        title: "",
        description: "",
        status: "pending"
      });

      toast.success("Your task has been saved");
    } catch (error) {
      console.log("POST ERROR:", error.response?.data);

      toast.error(
        error.response?.data?.error ||
        "Something went wrong!"
      );
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await api.delete(
        `/api/v2/deleteTask/${taskId}`
      );

      console.log("DELETE:", response.data);

      setArray((prev) =>
        prev.filter((item) => item._id !== taskId)
      );

      toast.success("Task deleted successfully");
    } catch (error) {
      console.log("DELETE ERROR:", error.response?.data);

      toast.error(
        error.response?.data?.error ||
        "Unable to delete task"
      );
    }
  };

  const openUpdate = (task) => {
    setUpdateId(task._id);
    setSelectedTask(task);
    setShowUpdate(true);
  };

  const handleUpdatedTask = (updatedTask) => {
    setArray((prev) =>
      prev.map((task) =>
        task._id === updatedTask._id
          ? updatedTask
          : task
      )
    );

    setShowUpdate(false);
    setUpdateId(null);
    setSelectedTask(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-4 relative">

        <ToastContainer />

        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-6">

          <div className="text-center mb-8">

            <h1 className="text-5xl font-bold text-gray-800">
              My Todo List
            </h1>

            <p className="mt-2 text-gray-500">
              Organize your tasks and stay productive.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-7 mb-8">

            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Create New Todo
            </h2>

            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>

              <input
                type="text"
                placeholder="Enter todo title"
                name="title"
                value={inputs.title}
                onChange={chnage}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                placeholder="Enter todo description"
                rows="4"
                name="description"
                value={inputs.description}
                onChange={chnage}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:border-blue-500"
              />

            </div>

            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>

              <select
                name="status"
                value={inputs.status}
                onChange={chnage}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none bg-white focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

            </div>

            <button
              onClick={submit}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg"
            >
              <FiPlus size={20} />
              Add Todo
            </button>

          </div>

          {array.length === 0 ? (

            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">

              <h3 className="text-lg font-semibold text-gray-600">
                No Todos Yet
              </h3>

              <p className="text-gray-400 mt-1">
                Create your first todo above.
              </p>

            </div>

          ) : (

            <div className="max-w-4xl mx-auto space-y-4">

              {array.map((item) => (

                <TodoCard
                  key={item._id}
                  item={item}
                  todoId={item._id}
                  deleteTask={deleteTask}
                  setShowUpdate={setShowUpdate}
                  setUpdateId={setUpdateId}
                  setSelectedTask={setSelectedTask}
                  openUpdate={openUpdate}
                />

              ))}

            </div>

          )}

        </div>

      </div>

      {showUpdate && (
        <Update
          setShowUpdate={setShowUpdate}
          updateId={updateId}
          selectedTask={selectedTask}
          onUpdated={handleUpdatedTask}
        />
      )}
    </>
  );
}

export default Todo;