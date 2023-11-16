export const calculateScores = (latestRound) => {
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
    if (score <= 80) {
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
export const detectWinner = (scores) => {
  if (scores[0] > scores[1]) {
    if (scores[0] - scores[1] >= 1165 || scores[0] >= 1165) return '1';
  } else {
    if (scores[1] - scores[0] >= 1165 || scores[1] >= 1165) return '2';
  }
  return '';
};
