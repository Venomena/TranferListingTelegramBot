import React, { useEffect, useState } from 'react';
import './index.css';

const GOAL_POINTS = 10;
const ENERGY_COST = 10;
const ENERGY_RECOVERY_RATE = 5;
const ENERGY_RECOVERY_INTERVAL = 700;

interface Click {
  id: number;
  isGoal: boolean;
  animation: string;
}

type GameState = 'Menu' | 'Playing';

const App = () => {
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [clicks, setClicks] = useState<Click[]>([]);
  const [gameState, setGameState] = useState<GameState>('Menu');
  const goalProbability = 0.7;

  const handleClick = () => {
    if (energy <= 0 || gameState !== 'Playing') return;

    const isGoal = Math.random() < goalProbability;
    const pointsToAdd = isGoal ? GOAL_POINTS : 0;
    const direction = Math.random() < 0.5 ? -1 : 1;
    const variant = Math.ceil(Math.random() * 3);

    setPoints(points + pointsToAdd);
    setEnergy(Math.max(0, energy - ENERGY_COST));

    const animation = isGoal ? `goal-path-${variant}` : `miss-path-${direction}-${variant}`;
    setClicks([...clicks, { id: Date.now(), isGoal, animation }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((clicks) => clicks.filter((click) => click.id !== id));
  };

  const handleRefillEnergy = () => {
    if (points >= 50) {
      setPoints(points - 50);
      setEnergy(100);
    }
  };

  useEffect(() => {
    if (gameState === 'Playing') {
      const interval = setInterval(() => {
        setEnergy((prevEnergy) => Math.min(prevEnergy + ENERGY_RECOVERY_RATE, 100));
      }, ENERGY_RECOVERY_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  return (
    <div className="game-container">
      {gameState === 'Menu' && (
        <div className="menu">
          <h1>Soccer Clicker Game</h1>
          <button onClick={() => setGameState('Playing')}>Start Game</button>
        </div>
      )}

      {gameState === 'Playing' && (
        <>
          <header>
            <h1>Soccer Clicker</h1>
            <div className="score">Score: {points}</div>
            <div className="energy">Energy: {energy}/100</div>
          </header>
          
          <div className="field" onClick={handleClick}>
            <div className="goal"></div>
            <div className="player"></div>
            {clicks.map((click) => (
              <React.Fragment key={click.id}>
                <div
                  className="ball"
                  style={{ animationName: `${click.animation}` }}
                  onAnimationEnd={() => handleAnimationEnd(click.id)}
                ></div>
                <div
                  className={`result-text ${click.isGoal ? 'goal-text' : 'miss-text'}`}
                >
                  {click.isGoal ? 'Goal!' : 'Miss'}
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* New Refill Energy Button */}
          <div className="energy-button-container">
            <button 
              className="refill-energy-button"
              onClick={handleRefillEnergy}
              disabled={points < 50}
            >
              Refill Energy (50 points)
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
