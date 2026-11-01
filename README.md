# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


docker run -i -t ubuntu:24.04 /bin/bash
ls
cd
cd home
cd ubuntu
touch
exit

docker run -d --name dbserver -p 27017:27017 --restart unless-stopped mongo:6.0.4
mongosh

db.users.insertOne({ username: 'jjohnson', fullName: 'John Johnson', age: 39 })
db.users.find()

exit

mongosh mongodb://localhost:27017/mydb

db.users.insertMany([
    {username: 'jjones', fullName: 'Jon Jones', age: 39 },
    {username: 'jjames', fullName: 'Jane James', age: 39 }
])

db.users.findOne({ username: 'jjones' })

db.users.find({ age: { $gt: 35 } })

db.users.find().sort({ age: 1 })

db.users.deleteOne({username: 'jjames'})

db.users.updateOne({ username: 'jjones' }), { $set: {age: 55 }})

db.users.updateOne(
  { username: 'new' },
  { $set: { fullName: 'New User' } },
  { upsert: true }
)

node backend/mongodbweb.js