/*
  Section Overview

  Creating Our First App With Vite WorldWise
  ~~ npm create vite@4
    > enter infos

  ~~ npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev
    > install 2 things: 
      + vite-plugin-eslint
      + eslint-config-react-app

  - create .eslintrc.json
    > add "extends": "react-app"

  - vite.config.js
    > add eslint config plugin here

*/

export default function App() {
  const x = 23

  return <div className='App'>App</div>
}
