const Review = require('../../models/reviewModel');
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    if (!reviewId) {
      return res.status(400).json({ message: 'Review ID is required' });
    }

    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error("Delete review error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { deleteReview };