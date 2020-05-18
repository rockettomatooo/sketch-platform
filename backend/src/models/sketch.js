import mongoose from 'mongoose';

const Sketch = mongoose.model('sketch', new mongoose.Schema({
  title: String,
  createdAt: Date,
  updatedAt: Date,

  timeEdited: Number,

  items: [Object],
}, { timestamps: true }));

export default Sketch;
