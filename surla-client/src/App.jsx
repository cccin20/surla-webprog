import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Welcome to My React App</h1>

      <div className="card">
        <h2>About Me</h2>
        <p>
          <strong>Name:</strong> Cindy Ella S. Surla <br />
          <strong>Email:</strong> surlacs@students.national-u.edu.ph <br />
          <strong>Course:</strong> BSIT - Mobile and Web Applications <br />
          <strong>School:</strong> National University Manila <br />
          <strong>Interests:</strong> Web Development, Technology, Dancing, and Music <br />
          <strong>Goal:</strong> To become a successful IT professional and build innovative digital solutions.
        </p>

        <button onClick={() => setCount((count) => count + 1)}>
          Click Counter: {count}
        </button>

        <p>
          Try clicking the button above to see React state in action.
        </p>
      </div>

      <p className="read-the-docs">
        Built using Vite + React ⚡
      </p>
    </>
  )
}

export default App
