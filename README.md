# Card Matching Game

A fun, responsive memory card matching game built with React and TypeScript. This game features custom images created by children using EverArt.

## Features

- Responsive design that works on both web and mobile devices (including iPhone)
- Three difficulty levels: Easy, Medium, and Hard
- Score tracking with moves counter and timer
- Beautiful card flip animations
- Game completion detection

## How to Play

1. Click on any card to flip it and reveal the image
2. Try to find the matching pair by flipping another card
3. If the cards match, they stay face up
4. If they don't match, they flip back over
5. Continue until all pairs are found
6. Try to complete the game in as few moves as possible!

## Difficulty Levels

- **Easy**: 8 pairs (16 cards)
- **Medium**: 16 pairs (32 cards)
- **Hard**: 24 pairs (48 cards)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Development Server

```bash
npm start
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
```

## Technologies Used

- React
- TypeScript
- Styled Components
- CSS3 (with Flexbox and Grid)

## Credits

All card images were created by children using EverArt and organized into a game format.

## License

This project is licensed under the MIT License.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
