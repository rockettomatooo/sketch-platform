/* eslint-disable no-param-reassign */
import { action, thunk, computed } from 'easy-peasy';
import axios from 'axios';
import history from './history';

// model for the creation route
const CreationModel = {
  startedDrawingAt: null,

  currentItem: null,
  finishedItems: [],
  items: computed((state) => (state.currentItem
    ? state.finishedItems.concat(state.currentItem)
    : state.finishedItems)),

  startNewItem: action((state, coord) => {
    if (!state.finishedItems.length) {
      state.startedDrawingAt = new Date();
    }

    switch (state.currentBrush) {
      case 'line':
        state.currentItem = {
          type: 'line',
          color: state.currentColor,
          thickness: state.currentThickness,
          line: [coord],
        };
        break;
      case 'eraser':
        state.currentItem = {
          type: 'line',
          color: '#fff',
          thickness: state.currentThickness,
          line: [coord],
        };
        break;
      default: break;
    }
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

  currentColor: '#000',
  changeColor: action((state, newColor) => {
    state.currentColor = newColor;
  }),

  currentBrush: 'line',
  changeBrush: action((state, newBrush) => {
    state.currentBrush = newBrush;
  }),

  currentThickness: 2,
  changeThickness: action((state, newThickness) => {
    state.currentThickness = newThickness;
  }),

  title: '',
  setTitle: action((state, newTitle) => {
    state.title = newTitle;
  }),

  loading: false,
  setLoading: action((state) => {
    state.loading = !state.setLoading;
  }),

  save: thunk(async (actions, args, { getState, getStoreActions }) => {
    const { items, title, startedDrawingAt } = getState();
    try {
      const timeEdited = new Date().valueOf() - startedDrawingAt.valueOf();
      actions.setLoading();
      const res = await axios.post('http://localhost:8080/api/sketches', { items, title, timeEdited });
      console.log(res);
      history.push(`/sketches/${res.data._id}`);
      actions.reset();
    } catch (e) {
      console.error(e);
      const { setError } = getStoreActions();
      setError();
    }
  }),
  reset: action((state) => {
    state.currentItem = null;
    state.currentBrush = 'line';
    state.currentColor = '#000';
    state.currentThickness = 2;


    state.finishedItems = [];
    state.title = '';
    state.startedDrawingAt = null;


    state.loading = false;
  }),
};

const SketchModel = {
  data: {},

  fetchAll: thunk(async (actions, args, { getStoreActions }) => {
    try {
      const res = await axios.get('http://localhost:8080/api/sketches');
      const { data } = res.data;
      data.forEach(actions.addSketch);
    } catch (e) {
      console.error(e);
      const { setError } = getStoreActions();
      setError();
    }
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

  fetchSketch: thunk(async (actions, sketchId, { getStoreActions }) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.get(`http://localhost:8080/api/sketches/${sketchId}`);
      actions.addSketch(res.data.data);
    } catch (e) {
      console.error(e);
      const { setError } = getStoreActions();
      setError();
    }
  }),

};

export default {
  creation: CreationModel,
  sketches: SketchModel,

  hasError: false,
  setError: action((state) => {
    state.hasError = true;
  }),
};
