const Review = require('../../models/reviewModel');

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id; // Authenticated user ID from middleware
    const { rating, comment } = req.body;

    if (!reviewId) {
      return res.status(400).json({ message: 'Review ID is required' });
    }

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if the logged-in user owns the review
    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this review' });
    }

    review.rating = rating;
    review.comment = comment;
    const updatedReview = await review.save();

    res.status(200).json(updatedReview);
  } catch (err) {
    console.error("Update review error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateReview };
