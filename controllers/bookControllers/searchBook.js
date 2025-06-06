const Book = require('../../models/book');

const searchBookByTitleOrAuthor = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const regex = new RegExp(query, 'i'); // case-insensitive regex
    const books = await Book.find({
      $or: [{ title: regex }, { author: regex }]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      results: books,
      total: books.length
    });

  } catch (err) {
    console.error("Search book error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { searchBookByTitleOrAuthor };
