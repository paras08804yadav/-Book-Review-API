const {auth} = require('./middleware/authMiddleware');
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

app.post('/signup', require('./controllers/authControllers/signup').register);
app.post('/login', require('./controllers/authControllers/login').login);
app.post('/books', auth, require('./controllers/bookControllers/addBook').addBook);
app.get('/books', auth, require('./controllers/bookControllers/getAllBook').getAllBooks);
app.get('/books/:id', auth, require('./controllers/reviewController/getSpecificBookReview').getSpecificBookById);
app.post('/books/:id/reviews', auth, require('./controllers/reviewController/submitReview').submitReview);
app.put('/reviews/:id', auth, require('./controllers/reviewController/updateReview').updateReview);
app.delete('/reviews/:id', auth, require('./controllers/reviewController/deleteReview').deleteReview);
app.get('/search', auth, require('./controllers/bookControllers/searchBook').searchBookByTitleOrAuthor);


module.exports = app;