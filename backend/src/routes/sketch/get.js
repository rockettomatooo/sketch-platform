import { Sketch } from '../../models';

export async function getAll(req, res) {
  const sketches = await Sketch
    .find({})
    .select({
      _id: 1, title: 1, createdAt: 1, updatedAt: 1,
    })
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: sketches,
  });
}

export async function getDetails(req, res) {
  const { _id } = req.params;

  const sketch = await Sketch.findOne({ _id });

  if (sketch) {
    res.json({
      success: true,
      data: sketch,
    });
  } else {
    res.status(404).json({
      success: false,
      msg: `sketch with _id ${_id} could not be found`,
    });
  }
}
