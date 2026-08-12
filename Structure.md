Todo-With-DB Backend — Fresher Friendly Guide

1. Project ko simple language mein samjho

Ye project ek Todo application ka backend hai.

Frontend se jab user koi request bhejta hai, backend:

Request receive karta hai

Check karta hai ki request kis route ke liye hai

Zarurat ke according database se data read/write karta hai

Response frontend ko bhejta hai

Simple flow:

Frontend / Thunder Client
          |
          v
       app.js
          |
          v
       Routes
      /       \
     v         v
  auth.js    list.js
     |         |
     v         v
 User Model  List Model
      \        /
       \      /
        v    v
        MongoDB

2. Backend folder structure

Tumhare project ka structure roughly:

Backend/
│
├── connection/
│   └── connection.js
│
├── models/
│   ├── user.js
│   └── list.js
│
├── routes/
│   ├── auth.js
│   └── list.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── package-lock.json

Ab har file ka purpose samjhte hain.

3. app.js

Purpose

app.js backend ka main entry point hai.

Jab tum:

node app.js

ya:

npm run dev

chalate ho, sabse important kaam yahin se start hota hai.

app.js kya karta hai?

Express app banata hai

MongoDB connect karta hai

JSON requests ko read karta hai

Routes connect karta hai

Server ko port par start karta hai

Example:

require("dotenv").config();

const express = require("express");

const app = express();

const connectDB = require("./connection/connection");
const auth = require("./routes/auth");
const list = require("./routes/list");

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("GET request received");
});

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

4. express.json() kya hai?

app.use(express.json());

Frontend/Thunder Client JSON body bhej sakta hai:

{
    "title": "Learn Express",
    "description": "Complete CRUD"
}

express.json() Express ko batata hai:

"Agar request JSON format mein aaye, to mujhe usko read karne do."

Without it, req.body properly available nahi hoga.

5. connection/connection.js

Purpose

Ye file MongoDB se connection establish karti hai.

Flow:

app.js
   |
   | connectDB()
   v
connection.js
   |
   v
MongoDB

Example:

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDB;

Important

MongoDB URL ko directly code mein nahi likhna chahiye.

Instead:

process.env.MONGO_URI

use karo.

6. .env

Purpose

.env mein sensitive/configuration information rakhi jaati hai.

Example:

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todo
PORT=3000
JWT_SECRET=mysecret

Code mein:

process.env.MONGO_URI

se value milti hai.

.env ko GitHub par push mat karo

Because isme:

Database password

API keys

JWT secret

Other secrets

ho sakte hain.

Isliye .gitignore mein:

.env

hona chahiye.

7. models/

models folder mein hum define karte hain:

Database mein hamara data kis structure mein save hoga?

Tumhare project mein:

models/
├── user.js
└── list.js

8. models/user.js

Ye User ka schema/model hai.

Suppose user ke paas:

username
email
password
list

fields hain.

Schema kuch aisa ho sakta hai:

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }]
});

module.exports = mongoose.model("User", userSchema);

Iska matlab

list ke andar Task IDs store ho sakti hain.

Example:

{
    "username": "Bankal",
    "email": "abc@gmail.com",
    "list": [
        "66abc123",
        "66abc456"
    ]
}

Matlab is user ke 2 tasks hain.

9. models/list.js

Ye Task/Todo ka schema define karta hai.

Example:

const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending"
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("List", listSchema);

Task MongoDB mein kuch aisa dikhega

{
    "_id": "66abc123",
    "title": "Learn Node.js",
    "description": "Complete Express",
    "status": "pending",
    "user": "66user123",
    "createdAt": "...",
    "updatedAt": "..."
}

10. Schema aur Model mein difference

Ye beginner ke liye important hai.

Schema

Schema batata hai:

Data ka structure kya hoga?

Example:

const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

Model

Model us schema ke through database ke saath kaam karta hai.

const User = mongoose.model("User", userSchema);

Ab:

User.find()
User.findOne()
User.create()
User.findById()

jaise methods use kar sakte ho.

Easy way

Schema = Blueprint
Model  = Blueprint se bana Database Tool

11. routes/

routes folder mein API endpoints hote hain.

Tumhare project mein:

routes/
├── auth.js
└── list.js

12. routes/auth.js

Ye user authentication ke routes handle karta hai.

Normally:

POST /register
POST /login

jaise routes yahan hote hain.

Example:

router.post("/register", async (req, res) => {
    // register user
});

Aur app.js mein:

app.use("/api/v1", auth);

hai.

Dono combine honge:

/api/v1 + /register

Final API:

POST /api/v1/register

13. routes/list.js

Ye Todo/Task related routes handle karta hai.

Example:

router.post("/addTask", ...)
router.put("/updateTask/:id", ...)
router.get("/getTask/:id", ...)

app.js mein:

app.use("/api/v2", list);

hai.

Therefore final URLs:

POST /api/v2/addTask

PUT /api/v2/updateTask/:id

GET /api/v2/getTask/:id

14. Route URL kaise banta hai?

Ye beginner ke liye bahut important hai.

app.js:

app.use("/api/v2", list);

routes/list.js:

router.post("/addTask", ...)

Dono ko join karo:

/api/v2 + /addTask

Result:

POST /api/v2/addTask

Isi wajah se pehle tumhe 404 mila tha

Tum request bhej rahe the:

POST /api/v1/addTask

Lekin list router /api/v2 par mounted tha.

Correct:

POST /api/v2/addTask

15. addTask ka complete flow

Suppose Thunder Client se request aayi:

POST /api/v2/addTask

Body:

{
    "title": "Learn Express",
    "description": "Complete CRUD",
    "status": "pending",
    "email": "abc@gmail.com"
}

Flow:

Thunder Client
      |
      v
    app.js
      |
      v
  /api/v2
      |
      v
   list.js
      |
      v
User.findOne({ email })
      |
      v
    User
      |
      v
MongoDB

Agar user mil gaya:

const existingUser = await User.findOne({ email });

Then task create:

const list = new List({
    title,
    description,
    status,
    user: existingUser._id
});

Then:

await list.save();

Task MongoDB mein save ho jayega.

16. req aur res kya hain?

Route:

router.post("/addTask", async (req, res) => {
});

req

req = Request

Frontend se jo data aaya:

req.body

URL:

req.params

Query:

req.query

Example:

GET /getTask/123

Yahan:

req.params.id

= 123

res

res = Response

Frontend ko answer bhejne ke liye:

res.status(200).json({
    message: "Success"
});

17. req.body

Agar frontend bhejta hai:

{
    "title": "Task 1",
    "description": "Learn Node"
}

To:

req.body.title

= "Task 1"

Aur:

req.body.description

= "Learn Node"

18. req.params

Route:

router.get("/getTask/:id", ...)

Request:

GET /getTask/65abc123

Then:

req.params.id

returns:

65abc123

19. GET /getTask/:id

Tumhare code mein:

router.get("/getTask/:id", async (req, res) => {

    try {

        const list = await List.find({
            user: req.params.id
        }).sort({
            createdAt: -1
        });

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

Important: await

Ye:

const list = List.find(...)

sirf Mongoose Query object deta hai.

Actual data ke liye:

const list = await List.find(...)

use karo.

Agar await nahi lagaya aur Query object ko res.json() mein bhej diya, to circular JSON error aa sakta hai.

20. find() vs findOne()

find()

Multiple documents return karta hai:

const tasks = await List.find({
    user: userId
});

Result:

[
    task1,
    task2,
    task3
]

findOne()

Ek document return karta hai:

const user = await User.findOne({
    email: email
});

Result:

user

Easy memory trick

find()    → many
findOne() → one

21. PUT /updateTask/:id

PUT generally existing data ko update karne ke liye use hota hai.

Example:

PUT /api/v2/updateTask/66abc123

Body:

{
    "title": "Learn MongoDB",
    "description": "Complete MongoDB CRUD",
    "status": "completed"
}

Code:

const list = await List.findByIdAndUpdate(
    req.params.id,
    {
        title,
        description,
        status
    },
    {
        new: true,
        runValidators: true
    }
);

new: true

Updated document return karta hai.

runValidators: true

Schema ke validation rules apply karta hai.

For example:

enum: ["pending", "completed"]

Agar:

{
    "status": "hello"
}

bhejoge, validation error aa sakta hai.

22. HTTP Methods

Todo backend mein generally:

Method

Purpose

GET

Data read

POST

New data create

PUT

Existing data update

PATCH

Partial update

DELETE

Data delete

Example:

POST   /api/v2/addTask
GET    /api/v2/getTask/:id
PUT    /api/v2/updateTask/:id
DELETE /api/v2/deleteTask/:id

23. package.json

Ye project ki configuration file hai.

Isme:

Project name

Dependencies

Scripts

Version

etc. hote hain.

Example:

{
    "scripts": {
        "start": "node app.js",
        "dev": "nodemon app.js"
    }
}

Then:

npm run dev

nodemon ke saath server start kar sakta hai.

24. package-lock.json

Ye npm automatically maintain karta hai.

Isme installed packages ke exact versions/dependency tree ki information hoti hai.

Normally isko manually edit nahi karna.

25. .gitignore

Git ko batata hai ki kaunsi files GitHub par track nahi karni.

Example:

node_modules/
.env

Why?

node_modules bahut bada hota hai.

.env mein secrets hote hain.

26. Complete backend request flow

Ye diagram sabse important hai:

                  CLIENT
             Frontend / Postman
                     |
                     v
                  app.js
                     |
          -----------------------
          |                     |
       /api/v1               /api/v2
          |                     |
          v                     v
       auth.js               list.js
          |                     |
          v                     v
     User Model             List Model
          |                     |
          ----------- -----------
                    |
                    v
                 MongoDB
                    |
                    v
                 Response
                    |
                    v
                  Client

27. MVC ko simple language mein samjho

Tumhara project pure MVC nahi hai, but structure MVC-style hai.

Model

models/

Database structure.

Routes / Controller-like logic

routes/

Request ko handle karta hai.

View

Backend mein traditional HTML view nahi hai, kyunki tum API backend bana rahe ho.

Frontend alag application ho sakta hai.

28. Beginner ke liye complete analogy

Ek restaurant imagine karo.

Customer = Frontend

Waiter = Route

Kitchen = Backend Logic

Menu = Schema

Storage = MongoDB

Restaurant Manager = app.js

Customer bolta hai:

Mujhe ek task create karna hai.

Waiter request kitchen tak le jaata hai.

Backend check karta hai:

User exist karta hai?

Database se check:

User.findOne()

Phir task create:

new List()

Database mein save:

list.save()

Finally response:

Task added successfully.

29. Common mistakes jo tumhe yaad rakhni chahiye

Mistake 1 — Wrong route prefix

Agar:

app.use("/api/v2", list);

aur:

router.post("/addTask", ...)

to URL:

/api/v2/addTask

hoga.

Mistake 2 — await bhoolna

Wrong:

const list = List.find();

Correct:

const list = await List.find();

Mistake 3 — res.json() mein Query object bhejna

Wrong:

const list = List.find();

res.json({
    list
});

Correct:

const list = await List.find();

res.json({
    list
});

Mistake 4 — .env GitHub par push karna

Never:

.env

GitHub par push mat karo.

Mistake 5 — req.body ke liye JSON middleware bhoolna

app.use(express.json());

zaroor lagao.

30. API testing ka basic method

Thunder Client/Postman mein:

Register

POST
http://localhost:3000/api/v1/register

Body:

{
    "username": "Bankal",
    "email": "abc@gmail.com",
    "password": "123456"
}

Login

POST
http://localhost:3000/api/v1/login

Add Task

POST
http://localhost:3000/api/v2/addTask

Body:

{
    "title": "Learn Node",
    "description": "Complete Express",
    "status": "pending",
    "email": "abc@gmail.com"
}

Get Tasks

GET
http://localhost:3000/api/v2/getTask/USER_ID

Update Task

PUT
http://localhost:3000/api/v2/updateTask/TASK_ID

31. Fresher ke liye sabse important concepts

Is project ke through tumhe ye concepts achhe se aane chahiye:

1. Node.js
2. Express.js
3. REST API
4. HTTP Methods
5. Request / Response
6. req.body
7. req.params
8. Middleware
9. MongoDB
10. Mongoose
11. Schema
12. Model
13. CRUD
14. async/await
15. try/catch
16. Environment variables
17. API testing
18. Git/GitHub

32. One-page revision

Agar interview se pehle sirf ek minute hai, ye yaad karo:

app.js
→ backend ka entry point
→ Express setup
→ middleware
→ routes
→ server start

connection.js
→ MongoDB connection

models/
→ database structure

user.js
→ User schema/model

list.js
→ Task schema/model

routes/
→ API endpoints

auth.js
→ Register/Login

list.js
→ Task CRUD

.env
→ secrets/config

.gitignore
→ files to ignore

package.json
→ dependencies + scripts

package-lock.json
→ exact package versions

Golden Rule

Request
   ↓
Route
   ↓
Model
   ↓
MongoDB
   ↓
Response

