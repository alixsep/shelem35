import { useState } from 'react';

import './Game.scss';

import { Calculate_SVG, Cheat_SVG, Undo_SVG } from '../svg';
import SelectInput from './SelectInput';
import ColonSpacer from './ColonSpacer';

import { calculateScores, detectWinner } from '../gameLogic';
import { betOptions, scoreOptions, teamOptions } from '../gameValues';

const Game = () => {
  const [gameWinner, setGameWinner] = useState('');
  const [gameHistory, setGameHistory] = useState([]);
  const [latestRound, setLatestRound] = useState({
    bet: { team: '', value: '' },
    scores: [0, 0],
    score: '',
  });

  const finishRound = () => {
    // Validation
    const isValid =
      latestRound.bet.team && latestRound.bet.value && latestRound.score;

    if (isValid) {
      // Game Logic
      const finalScores = calculateScores(latestRound);

      setGameHistory((p) => [...p, latestRound]);
      setLatestRound({
        bet: { team: '', value: '' },
        scores: finalScores,
        score: '',
      });

      const winner = detectWinner(finalScores);
      setGameWinner(winner);
    }
  };

  const undo = () => {
    if (gameHistory.length > 0) {
      const previousGameHistory = [...gameHistory];
      const previousRound = previousGameHistory.pop();

      setLatestRound(previousRound);
      setGameHistory(previousGameHistory);
      setGameWinner('');
    }
  };
  return (
    <div className='game'>
      <div className='table-wrapper'>
        <table className='game-table'>
          <thead>
            <tr>
              <th>Bet</th>
              <th className='team-head'>Team 1</th>
              <th className='team-head'>Team 2</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {gameHistory.map((_, i) => (
              <tr key={i}>
                <td>
                  <div className='wrapper'>
                    <div className='display'>{_.bet.team}</div>
                    <ColonSpacer />
                    <div className='display'>{_.bet.value}</div>
                  </div>
                </td>
                <td>{_.scores[0]}</td>
                <td>{_.scores[1]}</td>
                <td>{_.score}</td>
              </tr>
            ))}
            <tr>
              <td>
                {gameWinner === '' ? (
                  <div className='wrapper'>
                    <SelectInput
                      options={teamOptions}
                      placeholder='Team'
                      value={latestRound.bet.team}
                      action={(team) =>
                        setLatestRound((p) => ({
                          ...p,
                          bet: { ...p.bet, team },
                        }))
                      }
                    />
                    <ColonSpacer />
                    <SelectInput
                      options={betOptions}
                      placeholder='Value'
                      value={latestRound.bet.value}
                      action={(value) =>
                        setLatestRound((p) => ({
                          ...p,
                          bet: { ...p.bet, value },
                        }))
                      }
                    />
                  </div>
                ) : null}
              </td>
              <td>{latestRound.scores[0]}</td>
              <td>{latestRound.scores[1]}</td>
              {gameWinner === '' ? (
                <td className='calculation-cell'>
                  <SelectInput
                    options={scoreOptions}
                    placeholder='Value'
                    value={latestRound.score}
                    action={(score) => setLatestRound((p) => ({ ...p, score }))}
                  />
                  <div className='calculate-button' onClick={finishRound}>
                    <Calculate_SVG />
                  </div>
                </td>
              ) : null}
            </tr>
          </tbody>
        </table>
      </div>
      <div className='actions'>
        {/* TODO: Add functionality for subtracting point if a team cheats. */}
        <div className='action-button cheat'>
          <Cheat_SVG />
          Cheat Penalty
        </div>
        <div className='action-button undo' onClick={undo}>
          <Undo_SVG />
          Undo Round
        </div>
      </div>
      <div className='status'>
        Status: {gameWinner === '' ? 'playing...' : `Team ${gameWinner} won!`}
        {gameWinner === '' ? null : (
          <div
            className='reset-button'
            onClick={() => {
              setGameWinner('');
              setGameHistory([]);
              setLatestRound({
                bet: { team: '', value: '' },
                scores: [0, 0],
                score: '',
              });
            }}
          >
            Reset Game
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
