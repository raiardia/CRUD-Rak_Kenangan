const express = require('express');
const databaseConnection = require('./database');
const bookRoutes = require('./routes/book.routes');
const cors = require("cors");

//database connection
databaseConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World! Database connected successfully.');
});

app.use('/book', bookRoutes);
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
