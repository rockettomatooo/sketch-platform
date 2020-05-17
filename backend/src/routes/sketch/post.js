import { Sketch } from '../../models';

export default async function sketchPost(req, res) {
  const { body } = req;

  const doc = await Sketch.create(body);
  if (doc) {
    res.json({
      // eslint-disable-next-line no-underscore-dangle
      _id: doc._id,

      success: true,
    });
  } else {
    res
      .status(500)
      .json({ success: false, msg: 'could not create sketch' });
  }
}
