import useLocalStorage from './useLocalStorage';

export default function useGame() {
  const [gameWinner, setGameWinner] = useLocalStorage('gameWinner', '');
  const [gameHistory, setGameHistory] = useLocalStorage('gameHistory', []);
  const [latestRound, setLatestRound] = useLocalStorage('latestRound', {
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

  const reset = () => {
    setGameWinner('');
    setGameHistory([]);
    setLatestRound({
      bet: { team: '', value: '' },
      scores: [0, 0],
      score: '',
    });
  };

  return {
    gameWinner,
    setGameWinner,
    gameHistory,
    setGameHistory,
    latestRound,
    setLatestRound,
    finishRound,
    undo,
    reset,
  };
}

const calculateScores = (latestRound) => {
  const betTeamIndex = parseInt(latestRound.bet.team) - 1;
  const betValue = parseInt(latestRound.bet.value);
  const scores = [
    parseInt(latestRound.scores[0]),
    parseInt(latestRound.scores[1]),
  ];
  const score = parseInt(latestRound.score);

  const oppTeamIndex = betTeamIndex ^ 1;
  const oppScore = 165 - score;

  let finalScores = scores;
  console.log(betTeamIndex, oppTeamIndex);

  if (scores[oppTeamIndex] < 1000) {
    finalScores[oppTeamIndex] = scores[oppTeamIndex] + oppScore;
  } else {
    if (score <= betValue) {
      finalScores[oppTeamIndex] = scores[oppTeamIndex] + oppScore;
    }
  }

  if (betValue < 165) {
    if (score < betValue) {
      if (score <= 80) {
        finalScores[betTeamIndex] = scores[betTeamIndex] - 2 * betValue;
      } else {
        finalScores[betTeamIndex] = scores[betTeamIndex] - betValue;
      }
    } else {
      if (score == 165) {
        finalScores[betTeamIndex] = scores[betTeamIndex] + 165;
      } else {
        finalScores[betTeamIndex] = scores[betTeamIndex] + betValue;
      }
    }
  } else {
    let weight = betValue == 165 ? 330 : betValue == 495 ? betValue : 0;
    if (score < 165) {
      finalScores[betTeamIndex] = scores[betTeamIndex] - weight;
    } else {
      finalScores[betTeamIndex] = scores[betTeamIndex] + weight;
    }
  }

  return finalScores;
};

const detectWinner = (scores) => {
  if (scores[0] > scores[1]) {
    if (scores[0] - scores[1] >= 1165 || scores[0] >= 1165) return '1';
  } else {
    if (scores[1] - scores[0] >= 1165 || scores[1] >= 1165) return '2';
  }
  return '';
};
