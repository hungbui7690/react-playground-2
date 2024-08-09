/*
  The Quiz App
  - Extension: ES7 React/Redux/Styled-components snippets
    + Snippets: 
      > nfn: create function 
      > rafce
      > useState, useEffect, useContext, useReducer, useCallback...
      > exp === export default


  (1) create Main.jsx
      > use {children}


  *** we will use index.jsx as the entry point > change entry point from index.<html> (script tag) 

*/

import Header from './Header'
import Main from './Main'

export default function App() {
  return (
    <div className='app'>
      <Header />

      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  )
}
