const Review = require('../../models/Review');

const submitReview = async (req, res) => {
  try {
    const userId = req.user.id; 
    const bookId = req.params.id;
    const { rating, comment } = req.body;

    if (!bookId || !rating) {
      return res.status(400).json({ message: 'Book ID and rating are required' });
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ user: userId, book: bookId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const newReview = await Review.create({
      user: userId,
      book: bookId,
      rating,
      comment
    });

    res.status(201).json({
      message: 'Review submitted successfully',
      review: newReview
    });
  } catch (err) {
    console.error("Submit review error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitReview };
