/*
  Rules for Render Logic - Pure Components

  State Update Batching

  State Update Batching in Practice


*/

import { useState } from 'react'
import { content } from './data'

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  )
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div>
      <div className='tabs'>
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {/* *** add key > now, everytime we go to new tab > react thinks that is the new instance > Dev Tool */}
      {activeTab <= 2 ? (
        <TabContent
          item={content.at(activeTab)}
          key={content.at(activeTab).summary}
        />
      ) : (
        <DifferentContent />
      )}
    </div>
  )
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? 'tab active' : 'tab'}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  )
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true)
  const [likes, setLikes] = useState(0)

  console.log('RENDER') // (3) when we click "Undo", we just see once

  function handleInc() {
    setLikes(likes + 1)
  }

  // (4) only increase 1
  // function handleTripleInc() {
  //   setLikes(likes + 1) // like = 0
  //   setLikes(likes + 1) // like still 0 > because the state update is async
  //   setLikes(likes + 1)
  // }

  // (6) if we want to make it works, use callback fn
  // function handleTripleInc() {
  //   setLikes((likes) => likes + 1)
  //   setLikes((likes) => likes + 1)
  //   setLikes((likes) => likes + 1)
  // }

  // (7) this won't work as well
  function handleTripleInc() {
    handleInc()
    handleInc()
    handleInc()
  }

  // (1)
  function handleUndo() {
    setShowDetails(true)
    setLikes(0)
    console.log(likes) // *** NOT 0 > because states are updated after re-rendering > but not immediately after setLikes()
  }

  // (8)
  function handleUndoLater() {
    setTimeout(() => {
      handleUndo()
    }, 2000)
  }

  return (
    <div className='tab-content'>
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className='tab-actions'>
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? 'Hide' : 'Show'} details
        </button>

        <div className='hearts-counter'>
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>

          {/* (5) */}
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className='tab-undo'>
        {/* (2) */}
        <button onClick={handleUndo}>Undo</button>

        {/* (9) render only once > if we go back to React 17 (main.jsx), it will render twice */}
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  )
}

function DifferentContent() {
  return (
    <div className='tab-content'>
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  )
}
