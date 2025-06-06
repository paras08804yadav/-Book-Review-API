const Book = require('../../models/book');
const Review = require('../../models/Review');

const getSpecificBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { page = 1, limit = 5 } = req.query;

    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const skip = (page - 1) * limit;

    const [reviews, totalReviews] = await Promise.all([
      Review.find({ book: bookId })
        .populate('user', 'name') // if you want user details with the review
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Review.countDocuments({ book: bookId })
    ]);

    const averageRating = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);

    res.status(200).json({
      success: true,
      book,
      averageRating: averageRating[0]?.avgRating || 0,
      totalReviews,
      currentPage: Number(page),
      totalPages: Math.ceil(totalReviews / limit),
      reviews
    });

  } catch (err) {
    console.error("Get specific book error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getSpecificBookById };
