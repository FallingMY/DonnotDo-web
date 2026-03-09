import { useState } from "react";
import { AnimatePresence, motion } from "motion/react"; // eslint-disable-line no-unused-vars
import { useGameEngine } from "./hooks/useGameEngine";
import { CornerBorders } from "./components/CornerBorders";
import { ConfigPanel } from "./components/ConfigPanel";
import { PlayingView } from "./components/PlayingView";
import { ActionControls } from "./components/ActionControls";
import { EndScreen } from "./components/EndScreen";
import { ErrorBoundary } from "./components/ErrorBoundary";

const EASE_IN = [0.25, 1, 0.5, 1];
const EASE_OUT = [0.7, 0, 1, 0.5];

// 工业闪烁：1帧间隔 0/1 切换 ×2
const FLICKER_IN = [0, 1, 0, 1];
const FLICKER_OUT = [1, 0, 1, 0];
const FLICKER_DURATION = 0.14;

function App() {
  const { state, startGame, nextRound, undo, endGame, resetGame } =
    useGameEngine();

  const [undoCount, setUndoCount] = useState(0);

  const handleStart = (rounds, questions) => {
    startGame(rounds, questions);
  };

  const handleUndo = () => {
    undo();
    setUndoCount((c) => c + 1);
  };

  const isLastRound = state.current.round >= state.config.totalRounds;
  const canUndo = state.historyStack.length > 0;

  return (
    <ErrorBoundary>
      <div className="min-h-[100dvh] bg-bg text-text-primary font-sans">
        <CornerBorders />

        <AnimatePresence mode="wait">
          {state.status === "SETUP" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: FLICKER_IN, y: 0 }}
            exit={{
              opacity: FLICKER_OUT,
              y: -20,
              transition: {
                y: { duration: 0.2, ease: EASE_OUT },
                opacity: { duration: FLICKER_DURATION },
              },
            }}
            transition={{
              y: { duration: 0.3, ease: EASE_IN },
              opacity: { duration: FLICKER_DURATION },
            }}
          >
            <ConfigPanel
              onStart={handleStart}
              initialRounds={state.config.totalRounds}
              initialQuestions={state.questionBank}
            />
          </motion.div>
        )}

        {state.status === "PLAYING" && (
          <motion.div
            key="playing"
            className="pb-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: FLICKER_IN }}
            exit={{
              opacity: FLICKER_OUT,
              transition: { opacity: { duration: FLICKER_DURATION } },
            }}
            transition={{ opacity: { duration: FLICKER_DURATION } }}
          >
            <PlayingView
              actionText={state.current.actionText}
              currentRound={state.current.round}
              totalRounds={state.config.totalRounds}
              score={state.current.score}
              undoTrigger={undoCount}
            />
          </motion.div>
        )}

        {state.status === "ENDED" && (
          <motion.div
            key="ended"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: FLICKER_IN, scale: 1 }}
            exit={{
              opacity: FLICKER_OUT,
              scale: 0.98,
              transition: {
                scale: { duration: 0.2, ease: EASE_OUT },
                opacity: { duration: FLICKER_DURATION },
              },
            }}
            transition={{
              scale: { duration: 0.35, ease: EASE_IN },
              opacity: { duration: FLICKER_DURATION },
            }}
          >
            <EndScreen
              score={state.current.score}
              totalRounds={state.config.totalRounds}
              onRestart={resetGame}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.status === "PLAYING" && (
          <motion.div
            key="action-controls"
            className="fixed bottom-0 left-0 right-0 z-40"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: FLICKER_IN }}
            exit={{ y: "100%", opacity: FLICKER_OUT }}
            transition={{
              y: { duration: 0.25, ease: EASE_IN },
              opacity: { duration: FLICKER_DURATION },
            }}
          >
            <ActionControls
              onNext={nextRound}
              onUndo={handleUndo}
              onEnd={endGame}
              canUndo={canUndo}
              isLastRound={isLastRound}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </ErrorBoundary>
  );
}

export default App;
