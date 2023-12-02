// import { useState } from 'react';

import './Game.scss';

import { Calculate_SVG, Trash_SVG, Undo_SVG } from '../svg';
import SelectInput from './SelectInput';
import ColonSpacer from './ColonSpacer';
// import ActionButton from './ActionButton';

import {
  betOptions,
  confirmationOptions,
  scoreOptions,
  teamOptions,
} from '../gameValues';
import useGame from '../hooks/useGame';
import MiniModal from './MiniModal';

const Game = () => {
  const {
    gameWinner,
    gameHistory,
    latestRound,
    setLatestRound,
    finishRound,
    undo,
    reset,
   } = useGame();

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
        <MiniModal
          className={'reset-game'}
          placeholder={'Are you sure?'}
          options={confirmationOptions}
          action={(choice) => {
            choice && reset();
          }}
          noSelect
        >
          <div className='action-button reset-game'>
            <Trash_SVG />
            Reset Game
          </div>
        </MiniModal>
        <MiniModal
          className={'undo'}
          placeholder={'Are you sure?'}
          options={confirmationOptions}
          action={(choice) => {
            choice && undo();
          }}
          noSelect
        >
          <div className='action-button undo'>
            <Undo_SVG />
            Undo Round
          </div>
        </MiniModal>
      </div>
      <div className='status'>
        Status: {gameWinner === '' ? 'playing...' : `Team ${gameWinner} won!`}
      </div>
    </div>
  );
};

export default Game;
