/* eslint-disable no-param-reassign */
import { action, thunk, computed } from 'easy-peasy';
import axios from 'axios';
import history from './history';

// model for the creation route
const CreationModel = {
  currentItem: null,
  finishedItems: [],
  items: computed((state) => (state.currentItem
    ? state.finishedItems.concat(state.currentItem)
    : state.finishedItems)),

  startNewItem: action((state, coord) => {
    state.currentItem = {
      type: 'line',
      line: [coord],
    };
  }),
  extendCurrentItem: action((state, coord) => {
    if (state.currentItem) {
      switch (state.currentItem.type) {
        case 'line': {
          state.currentItem.line = state.currentItem.line.concat([coord]);
          break;
        }
        default:
          break;
      }
    }
  }),
  finishCurrentItem: action((state) => {
    if (state.currentItem) {
      state.finishedItems = state.finishedItems.concat(state.currentItem);
      state.currentItem = null;
    }
  }),

  title: '',
  setTitle: action((state, newTitle) => {
    state.title = newTitle;
  }),

  loading: false,
  setLoading: action((state) => {
    state.loading = !state.setLoading;
  }),

  save: thunk(async (actions, args, { getState }) => {
    try {
      actions.setLoading();
      const { items, title } = getState();
      const res = await axios.post('http://localhost:8080/api/sketches', { items, title });
      console.log(res);
      // eslint-disable-next-line no-underscore-dangle
      history.push(`/sketches/${res.data._id}`);
    } catch (e) {
      console.error(e);
    }
    actions.reset();
  }),
  reset: action((state) => {
    state.currentItem = null;
    state.finishedItems = [];
    state.title = '';
    state.loading = false;
  }),
};

const SketchModel = {
  data: {},

  fetchAll: thunk(async (actions) => {
    const res = await axios.get('http://localhost:8080/api/sketches');
    const { data } = res.data;
    data.forEach(actions.addSketch);
  }),

  addSketch: action((state, sketch) => {
    state.data[sketch._id] = {
      ...(state.data[sketch._id] || {}),
      ...sketch,
      createdAt: new Date(sketch.createdAt),
      updatedAt: new Date(sketch.updatedAt),
    };
  }),

  list: computed((state) => Object
    .values(state.data)
    .sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf())),

  fetchSketch: thunk(async (actions, sketchId) => {
    // eslint-disable-next-line no-underscore-dangle
    const res = await axios.get(`http://localhost:8080/api/sketches/${sketchId}`);
    actions.addSketch(res.data.data);
  }),

};

export default {
  creation: CreationModel,
  sketches: SketchModel,
};
