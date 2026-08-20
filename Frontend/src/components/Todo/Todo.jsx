import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import TodoCard from "./TodoCard";
import { ToastContainer, toast } from 'react-toastify';
import Update from "./Update";


function Todo() {
  const [inputs, setInputs] = useState({ title: "", description: "", status: "pending" });
  const [array, setArray] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);

  const chnage = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value })
  }
  const submit = () => {
    if (inputs.title === "" || inputs.description === "") {
      toast.error("title and description can't be empty!");
      return;
    } else {
      const newTodo = {
        id: Date.now(),
        ...inputs,
        createdAt: new Date().toISOString()

      }
      setArray([...array, newTodo]);
      setInputs({ title: "", description: "", status: "pending" })
      // console.log("New Todo:", array);
      toast.success("Your task has been added");
      toast.error("Your task is not saved ! Please LogIn");
    }

  }
  const deleteTask = (index) => {
    // console.log("Task deleted : ",index );
    // Array.splice(index, "1");
    // setArray([...array]); 
    setArray(prev => prev.filter((_, i) => i !== index));
    toast.success("Your task has been deleted");
  }
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:border-blue-500"
                name="description"
                value={inputs.description}
                onChange={chnage}
              />
            </div>

 
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>

              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3  pr-10 outline-none bg-white focus:border-blue-500"

                name="status"
                value={inputs.status}
                onChange={chnage}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

            </div>

            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg"
              onClick={submit}
            >
              <FiPlus size={20} />
              Add Todo
            </button>

          </div>

          {array.length == 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">

              <h3 className="text-lg font-semibold text-gray-600">
                No Todos Yet
              </h3>

              <p className="text-gray-400 mt-1">
                Create your first todo above.
              </p>

            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4"  >

              {array.map((item, index) => (
                <TodoCard item={item} key={item.id} todoId={item.id} index={index} deleteTask={deleteTask} setShowUpdate={setShowUpdate} />
              ))}

            </div>
          )}

        </div>

      </div>

      {showUpdate && (
        <Update setShowUpdate={setShowUpdate} />
      )}
    </>

  );
}

export default Todo;