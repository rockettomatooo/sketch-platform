# Sketch Playground

Assignment for [Verbit](https://verbit.ai/).

## main requirements
- Web application where users can draw on a piece of "paper" and save it to a database
- A list with all public drawings

## Architecture

### Frontend

All frontend code lies in `frontend/`. It is a react application bundled by [`parcel.js`](https://parceljs.org).

**main packages:**  
- `react` as view layer
- `material-ui` for design (mainly because I'm already familiar with all the components)
- `react-router-dom` for routing
- `axios` for all HTTP calls

**dev packages:**  
- `babel` for transpiling all es6/7 features and react
- `eslint` for linting (using the airbnb preset)
- `parcel.js` to bundle everything for development/production

The frontend currently has 3 main routes:
- `/create`: Create a new sketch and save it to the database
- `/sketches`: View a list of all public drawing
- `/sketches/:_id`: View a specific sketch by ID.

The creation process of a sketch is powered by a plain canvas. Once a user clicks on the canvas, every mouse movement is recorded until the user lets go. This creates a list of coordinates which will be drawn as a line on the canvas. A collection of lines represents the sketch the user has drawn. This will be saved to the server eventually. Because of the progressive nature of the representation, the sketch can be scaled down and replayed pretty naturally. 

### Backend

All backend code lies in `backend/`. It is an express HTTP server powered by a MongoDB database using `mongoose`. It supports all necessary CRUD operations for a sketch.

**main packages:**  
- `express` as HTTP server / routing
- `cors` for security
- `mongoose` to connect / talk to mongodb + have a database model to validate against.

**dev packages:**  
- `babel` for transpiling all es6/7 features
- `eslint` for linting (also using the airbnb preset)
- `nodemon` for hot code reload in development

The backend currently provides the following HTTP routes:
- `POST /api/sketches`: Upload a sketch
- `GET  /api/sketches`: Get a list of sketches (excluding the actual drawing representation for performance reasons)
- `GET  /api/sketches/:_id`: Get a sketch by ID, including the drawing representation.

