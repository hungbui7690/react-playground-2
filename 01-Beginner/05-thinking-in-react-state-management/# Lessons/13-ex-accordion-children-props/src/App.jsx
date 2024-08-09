/*
  Exercise - Accordion 
  - use "children" props

*/

import { useState } from 'react'
import './index.css'
import { faqs } from './data'

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  )
}

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null)

  return (
    <div className='accordion'>
      {data.map((el, i) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          title={el.title}
          num={i}
          key={el.title}
        >
          {el.text}
        </AccordionItem>
      ))}

      <AccordionItem
        curOpen={curOpen}
        onOpen={setCurOpen}
        title='Test 1'
        num={22}
        key='test 1'
      >
        <p>Allows React developers to:</p>
        <ul>
          <li>Break up UI into components</li>
          <li>Make components reusuable</li>
          <li>Place state efficiently</li>
        </ul>
      </AccordionItem>
    </div>
  )
}

function AccordionItem({ num, title, curOpen, onOpen, children }) {
  const isOpen = num === curOpen

  function handleToggle() {
    onOpen(isOpen ? null : num)
  }

  return (
    <div className={`item ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
      <p className='number'>{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className='title'>{title}</p>
      <p className='icon'>{isOpen ? '-' : '+'}</p>

      {isOpen && <div className='content-box'>{children}</div>}
    </div>
  )
}
