function Update({setShowUpdate}) {
  const handleOutsideClick =(e)=>{
    if (e.target === e.currentTarget) {
      setShowUpdate(false);
    }
  }
  return (
    <div className="fixed inset-0 bg-black/40 z-50"
    onClick={handleOutsideClick}
    >

      <div className="w-[500px] bg-white p-7 rounded-2xl shadow-2xl absolute top-10 left-1/2 -translate-x-1/2">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Update Todo
        </h2>

         <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>

          <input
            type="text"
            placeholder="Enter todo title"
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
          />
        </div>

         <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>

          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none bg-white focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

         <div className="flex justify-end gap-3">

          <button
            className="px-5 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={()=>setShowUpdate(false)}
          >
            Cancel
          </button>

          <button
            className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Update
          </button>

        </div>

      </div>
    </div>
  );
}

export default Update;