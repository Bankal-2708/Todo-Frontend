const router = require("express").Router();

const User = require("../models/user");
const List = require("../models/list");

// Add task if user exists
// create task 
router.post("/addTask", async (req, res) => {
  try {
    const { title, description, id } = req.body;

    // if user Find 
    const existingUser = await User.findById(id);


    if (!existingUser) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    // Create task
    const list = new List({
      title,
      description,
      user: existingUser._id
    });

    // Save task
    await list.save();

    // it connect the task with user by id , it push id into user list arrray
    existingUser.list.push(list._id);

    // it save the user
    await existingUser.save();

    // it send response
    return res.status(201).json({
      message: "Task added successfully",
      list: list
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

// update task

router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, description, status, email } = req.body;

    // if user Find 
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    const list = await List.findByIdAndUpdate(req.params.id, { title, description, status }, {
      new: true
    });
    if (!list) {
      return res.status(404).json({
        error: "Task not found"
      });
    }
    return res.status(200).json({
      message: "Task updated successfully",
      list: list
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

// delete 

router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const task = await List.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    await User.findByIdAndUpdate(task.user, {
      $pull: {
        list: task._id
      }
    });

    await List.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

// get task 

router.get('/getTask/:id', async (req, res) => {
  try {

    const list = await List.find({
      user: req.params.id
    }).sort({ createdAt: -1 }); // sort by createdAt in descending order

    if (list.length !== 0) {
      res.status(200).json({
        message: "Task fetched successfully",
        list: list
      });
    } else {
      res.status(404).json({
        message: "No task found"
      });
    }

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });
  }
});


module.exports = router;