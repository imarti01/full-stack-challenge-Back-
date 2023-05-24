const { Schema, model } = require('mongoose');

const GifSchema = new Schema({
  title: { type: String, required: true },
  url: {
    type: String,
    required: true,
  },
  tags: [{ type: String, required: true }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created_at: { type: String, default: new Date() },
});

module.exports = model('Gif', GifSchema);
