const express = require('express');
const app = express();
const PORT = 3000;
const path = require('node:path');
const usersRouter = require('./routes/usersRouter');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use('/', usersRouter);

app.listen(PORT, () => {
  console.log(`app is listening in the port ${PORT}`);
});
