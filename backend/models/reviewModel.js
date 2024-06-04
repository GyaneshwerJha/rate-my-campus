const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = Schema(
  {
    campus: {
      type: Schema.Types.ObjectID,
      ref: 'Campus',
    },
    body: { type: String, required: true },
    rating: { type: Number, required: true },
    author: {
      type: Schema.Types.ObjectID,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
