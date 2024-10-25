const express = require('express');

const app = express();
const path = require('path');
app.use(express.json());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

console.log("App.js file");

const userRoutes = require('./routes/user_routes')
const syallbus = require('./routes/syallabus_routes')
const terms_condn = require('./routes/terms_condn')

app.get('/' ,(req,res)=> {
    res.send({ status:"Running on server hit your endpoints"  });
});

app.use("/api/users",userRoutes);
app.use("/api/syallbus",syallbus);
app.use("/api/terms-privacy",terms_condn);

module.exports = app;