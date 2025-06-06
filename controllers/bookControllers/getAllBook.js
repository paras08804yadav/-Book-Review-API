const Book = require('../../models/book');

const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    const filters = {};
    if (author) filters.author = new RegExp(author, 'i'); // case-insensitive partial match
    if (genre) filters.genre = new RegExp(genre, 'i');

    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      Book.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Book.countDocuments(filters),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      books,
    });
  } catch (err) {
    console.error("Get all books error:", err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { getAllBooks };
