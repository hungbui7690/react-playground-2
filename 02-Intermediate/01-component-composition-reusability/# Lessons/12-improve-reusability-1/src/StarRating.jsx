import { useState } from 'react'
import './StarRating.css'

// (1) create public API
const StarRating = ({ maxRating = 5, color = '#fcc419', size = 20 }) => {
  const [rating, setRating] = useState(0)
  const [tempRating, setTempRating] = useState(0)

  const handleRating = (rating) => {
    setRating(rating)
  }

  // (2)
  const textStyle = {
    color,
    fontSize: `${size}px`,
  }

  return (
    <main className='container'>
      <div className='starContainer'>
        {Array.from({ length: maxRating }, (_, i) => {
          return (
            <Star
              key={i}
              onRate={() => handleRating(i + 1)}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
              color={color} // (4)
              size={size}
            />
          )
        })}
      </div>

      {/* (3) */}
      <p className='text' style={textStyle}>
        {tempRating || rating || ''}
      </p>
    </main>
  )
}

// (5a)
function Star({ onRate, full, onHoverIn, onHoverOut, size, color }) {
  // (5b)
  const starStyle = {
    color,
    width: `${size}px`,
    height: `${size}px`,
  }

  return (
    <span
      role='button'
      className='star'
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill={color} // (5c)
          stroke={color}
          style={starStyle}
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke={color} // (5d)
          style={starStyle}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='{2}'
            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
          />
        </svg>
      )}
    </span>
  )
}

export default StarRating
