# Sketch Playground

Assignment for [Verbit](https://verbit.ai/).

## Installation

```bash
# clone the repo
$ git clone https://github.com/rockettomatooo/sketch-playground.git
$ cd sketch-playground/

# install dependencies
$ cd frontend/ && yarn 
$ cd backend/ && yarn

# setup env
$ cp frontend/example.env frontend/.env
$ cp backend/example.env  backend/.env

# adjust the .env files to your environment
```

## Starting the application

```bash
$ cd frontend/ && yarn start
$ cd backend/ && yarn start
```
> You can also use the vscode tasks within the repo.


## Architecture

### Frontend

#### Stack

The frontend stack is esentially a react application powered by the `parcel.js` bundler. It uses `material-ui` as a component library (mainly because I'm already familiar with it and handles all the design things for me). For state management, I used `easy-peasy` as it's pretty lightweight and quite easy to use. It is also compatible with the redux devtools which is pretty nice for debugging.

#### Routing

The frontend-routing is handled by `react-router-dom` and provides 3 main routes:
- `/create`: Create a new sketch
- `/sketches`: Get a list of all sketches
- `/sketches/:_id`: Get a closeup for 1 sketch

#### The drawing logic

The drawing is implemented using SVGs. Therefore multiple mouse handlers are attached which register the drawing done by the user. Once the user starts to drag, all coordinates are captured into an array which is used to simultaneously generate a new `<path />` within the SVG. Because of the requirement to store the sketch in a resizeable manner, all coordinates of a line are translated into a standard pane (for simplicity sake it is a pane of 500x500 px). The SVG's implicit scaling feature is then used to display the sketch properly on every screen.  
The drawing logic is also implemented in an extendable manner. All lines are actually abstract items with the type "line". Therefore, one could easily extend the drawing logic to support rectangles or circles for example.  
The eraser is technically also a line but with the color of the background. Therefore, it appears to be "erasing" the previous lines its been drawn over but technically speaking it's just another line. One could also recalculate / split the lines the eraser erased but this would be much more complex and probably also more expensive so I opted for the simple solution.  
As the sketch is persisted using the translated coordinates, replaying the drawing process or implementing undo/redo stacks should be fairly straight forward.

### Backend

#### Stack

The backend is an express server powered by a MongoDB database. The database is accessed using the ORM `mongoose` (which also handles the schema).

#### Routing

The server provides 3 main routes:
- `POST /api/sketches`: Upload a new sketch
- `GET  /api/sketches`: Get a list of all sketches (excluding the actual sketch data for performance reasons)
- `GET  /api/sketches/:_id`: Get the entire sketch

## Deployment

Although I don't have a deployment setup, here's how I would go about it:  
Generally, I would deploy the frontend and backend seperately. That is, because I think it's generally not a good idea to serve static file contents with nodejs due to lack of perfomance. Instead one could deploy the frontend to a CDN or put it into an nginx docker container for example. As the backend has no internal state (other than the database), the deployment and scaling would be as easy as it gets: Just put it into a container and stack 'em up :).

## Bonus points explanation

#### 1. "Record" the drawing and "Replay" it at will

This basically already exists since the drawing logic incrementally draws all the lines in chronological order because that is the way the sketches are persisted. This would "just" be a matter of slowing down the drawing process and make it visible to the user. 
> **Note:** At the moment, the drawing logic redraws/generates the whole sketch on every change that is made. Here is some space for performance improvements.

#### 2. Handle Retina displays

As this project uses SVGs as a view layer, it should already be pretty harp.

#### 3. Provide a good mobile experience

I tried to make this project as responsive as possible but haven't reworked the creation components to work on mobile.  
As the drawing process is somewhat abstracted into "items", one would only have to get coordinates from tap events instead of mouse events and everything else should be abstracted enough to work the same as it does with a mouse right now. 
> **Idea:** As tap events also record a radius (which I asume depends on how much pressure you put on the screen) it might be nice to have a lines' thickness based on the pressure put on the screen. Therefore, one would have to rewrite the drawing logic to store a thickness value for every coordinate pair.

#### 4. Allow users to register and login

Well users in general would need the basic CRUD operations to be registered, update their information, maybe verify their email and also be able to delete their account.  
For authentication, I would use JWTs as they are pretty easy to work with and also pretty easy to validate. For this to work, the server would need to have a RSA key pair and also a blacklist for JWTs whoose users have already logged out but the JWT is still valid theoretically.  
To enforce the restrictions based on the authentication status of the calling user in the backend, one could write a general express middleware which can be used for all protected routes.

#### 5. Make the strokes smooth and pleasing to the eye

As the drawing logic uses SVGs, instead of drawing simple lines one could use bezier curves instead.

#### 6. More brush types

I kind of missused the term "brush" for my item types like "line" and "eraser". Therefore, real brush types like like a spray brush could be an additional attribute to a line or other kinds of items. I'm not sure of how I would go about the visual within an SVG though. 

#### 7. Allow users to "Remix" other users' drawings

The actual drawing component is entirely stateless. It gets the lines that should be drawn and provides feedback via event handlers if the user tries to draw something on the screen. Therefore, one could simply duplicate another users' drawing and extend it. Maybe add a reference back to the original so it is a nice UX because in this case a user could also remix another users remix. 
