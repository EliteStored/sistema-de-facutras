import React, { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

const GAME_WIDTH = 800
const GAME_HEIGHT = 600
const BIRD_SIZE = 30
const PIPE_WIDTH = 80
const PIPE_GAP = 200
const GRAVITY = 0.5
const JUMP_FORCE = -10
const PIPE_SPEED = 3

function App() {
  const canvasRef = useRef(null)
  const gameLoopRef = useRef(null)
  
  const [gameState, setGameState] = useState('start') // 'start', 'playing', 'gameOver'
  const [score, setScore] = useState(0)
  const [bird, setBird] = useState({
    x: 100,
    y: GAME_HEIGHT / 2,
    velocity: 0
  })
  const [pipes, setPipes] = useState([])

  // Initialize pipes
  const createPipe = (x) => ({
    x: x,
    topHeight: Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50,
    passed: false
  })

  // Jump function
  const jump = useCallback(() => {
    if (gameState === 'start') {
      setGameState('playing')
      setBird(prev => ({ ...prev, velocity: JUMP_FORCE }))
      setPipes([createPipe(GAME_WIDTH)])
    } else if (gameState === 'playing') {
      setBird(prev => ({ ...prev, velocity: JUMP_FORCE }))
    } else if (gameState === 'gameOver') {
      // Reset game
      setGameState('start')
      setScore(0)
      setBird({ x: 100, y: GAME_HEIGHT / 2, velocity: 0 })
      setPipes([])
    }
  }, [gameState])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        jump()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [jump])

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return

    gameLoopRef.current = setInterval(() => {
      setBird(prev => {
        const newVelocity = prev.velocity + GRAVITY
        const newY = prev.y + newVelocity
        
        // Check ground and ceiling collision
        if (newY <= 0 || newY >= GAME_HEIGHT - BIRD_SIZE) {
          setGameState('gameOver')
          return prev
        }
        
        return { ...prev, y: newY, velocity: newVelocity }
      })

      setPipes(prev => {
        let newPipes = prev.map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
        
        // Remove pipes that are off screen
        newPipes = newPipes.filter(pipe => pipe.x > -PIPE_WIDTH)
        
        // Add new pipe if needed
        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < GAME_WIDTH - 300) {
          newPipes.push(createPipe(GAME_WIDTH))
        }
        
        return newPipes
      })
    }, 1000 / 60) // 60 FPS

    return () => clearInterval(gameLoopRef.current)
  }, [gameState])

  // Collision detection and scoring
  useEffect(() => {
    if (gameState !== 'playing') return

    pipes.forEach(pipe => {
      // Check if bird passed pipe for scoring
      if (!pipe.passed && pipe.x + PIPE_WIDTH < bird.x) {
        pipe.passed = true
        setScore(prev => prev + 1)
      }

      // Check collision with pipes
      if (
        bird.x < pipe.x + PIPE_WIDTH &&
        bird.x + BIRD_SIZE > pipe.x &&
        (bird.y < pipe.topHeight || bird.y + BIRD_SIZE > pipe.topHeight + PIPE_GAP)
      ) {
        setGameState('gameOver')
      }
    })
  }, [bird, pipes, gameState])

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Clear canvas
    ctx.fillStyle = '#87CEEB' // Sky blue
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // Draw bird
    ctx.fillStyle = '#FFD700' // Gold
    ctx.fillRect(bird.x, bird.y, BIRD_SIZE, BIRD_SIZE)
    
    // Draw bird eye
    ctx.fillStyle = '#000'
    ctx.fillRect(bird.x + 20, bird.y + 5, 5, 5)

    // Draw pipes
    ctx.fillStyle = '#228B22' // Forest green
    pipes.forEach(pipe => {
      // Top pipe
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight)
      // Bottom pipe
      ctx.fillRect(pipe.x, pipe.topHeight + PIPE_GAP, PIPE_WIDTH, GAME_HEIGHT - pipe.topHeight - PIPE_GAP)
    })

    // Draw ground
    ctx.fillStyle = '#8B4513' // Saddle brown
    ctx.fillRect(0, GAME_HEIGHT - 50, GAME_WIDTH, 50)
  }, [bird, pipes])

  return (
    <div className="game-container">
      <h1>Flappy Bird Clone</h1>
      <div className="game-wrapper">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          onClick={jump}
          className="game-canvas"
        />
        <div className="game-ui">
          <div className="score">Score: {score}</div>
          {gameState === 'start' && (
            <div className="message">
              <h2>Flappy Bird</h2>
              <p>Press SPACE or click to start!</p>
            </div>
          )}
          {gameState === 'gameOver' && (
            <div className="message">
              <h2>Game Over!</h2>
              <p>Final Score: {score}</p>
              <p>Press SPACE or click to restart!</p>
            </div>
          )}
        </div>
      </div>
      <div className="instructions">
        <p>Controls: Press SPACE or click to jump</p>
        <p>Avoid the pipes and get the highest score!</p>
      </div>
    </div>
  )
}

export default App
