const Book = require('../../models/book');
const addBook = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body missing' });
    }
    
    const { title, author, genre, publicationDate } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }

    const newBook = await Book.create({
      title,
      author,
      genre,
      publicationDate
    });

    res.status(201).json(newBook);
  } catch (err) {
    console.error("Add book error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};      

module.exports = { addBook };