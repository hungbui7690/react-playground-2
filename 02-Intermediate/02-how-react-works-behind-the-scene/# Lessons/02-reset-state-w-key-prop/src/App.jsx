/*
  How Rendering Works Overview

  How Rendering Works The Render Phase

  How Rendering Works The Commit Phase

  How Diffing Works

  Diffing Rules in Practice
  - undo 
  - like
  - when we move between tabs, the states are kept (preserved across renders)
  - click on tab 4 > states are reset
    > because when we click on tab 4, all the 3 tabs disappear (include their states)

  The Key Prop

  Resetting State With the Key Prop
  - when we move between tabs and go back, states are same 
    > we want to reset to default 

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

  function handleInc() {
    setLikes(likes + 1)
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
          <button>+++</button>
        </div>
      </div>

      <div className='tab-undo'>
        <button>Undo</button>
        <button>Undo in 2s</button>
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
