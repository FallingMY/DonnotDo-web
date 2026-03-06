import { useGameEngine } from './hooks/useGameEngine';
import { CornerBorders } from './components/CornerBorders';
import { ConfigPanel } from './components/ConfigPanel';
import { TargetMonitor } from './components/TargetMonitor';
import { ScoreBoard } from './components/ScoreBoard';
import { ActionControls } from './components/ActionControls';
import { EndScreen } from './components/EndScreen';

function App() {
  const {
    state,
    startGame,
    nextRound,
    undo,
    endGame,
    resetGame,
    updateQuestionBank,
    incrementScore,
    decrementScore
  } = useGameEngine();

  const handleStart = (rounds, questions) => {
    // Questions are already in state.questionBank, just start the game
    startGame(rounds);
  };

  const handleSuccess = () => {
    // 成功不计分
  };

  const handleFail = () => {
    // 失败增加1分（惩罚分）
    incrementScore();
  };

  const isLastRound = state.current.round >= state.config.totalRounds;
  const canUndo = state.historyStack.length > 0;

  return (
    <div className="min-h-screen bg-bg text-text-primary font-sans">
      <CornerBorders />

      {state.status === 'SETUP' && (
        <ConfigPanel
          onStart={handleStart}
          initialRounds={state.config.totalRounds}
          initialQuestions={state.questionBank}
        />
      )}

      {state.status === 'PLAYING' && (
        <div className="pb-48">
          <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
            <TargetMonitor
              actionText={state.current.actionText}
              currentRound={state.current.round}
              totalRounds={state.config.totalRounds}
            />
            <ScoreBoard score={state.current.score} />
          </div>

          <ActionControls
            onSuccess={handleSuccess}
            onFail={handleFail}
            onNext={nextRound}
            onUndo={undo}
            onEnd={endGame}
            canUndo={canUndo}
            isLastRound={isLastRound}
          />
        </div>
      )}

      {state.status === 'ENDED' && (
        <EndScreen
          score={state.current.score}
          totalRounds={state.config.totalRounds}
          onRestart={resetGame}
        />
      )}
    </div>
  );
}

export default App;
