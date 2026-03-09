import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_QUESTIONS } from '../constants/defaultQuestions';

const STORAGE_KEY = 'ddi_game_state';
const MAX_HISTORY = 10;

const initialState = {
  status: 'SETUP', // 'SETUP' | 'PLAYING' | 'ENDED'
  config: { totalRounds: 10 },
  current: { round: 0, score: 0, actionText: '', currentQuestion: null },
  historyStack: [],
  questionBank: DEFAULT_QUESTIONS
};

export const useGameEngine = () => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialState;
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
      return initialState;
    }
  });

  // Auto-save to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }, [state]);

  const startGame = useCallback((rounds, questions) => {
    setState(prev => {
      const bank = questions ?? prev.questionBank;
      if (bank.length === 0) {
        console.error('Cannot start game: question bank is empty');
        return prev;
      }

      // Shuffle questions using Fisher-Yates algorithm
      const shuffled = [...bank];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      const firstQuestion = shuffled[0];
      return {
        ...prev,
        status: 'PLAYING',
        config: { totalRounds: rounds },
        current: {
          round: 1,
          score: 0,
          actionText: firstQuestion?.content || '',
          currentQuestion: firstQuestion
        },
        historyStack: [],
        questionBank: shuffled
      };
    });
  }, []);

  const nextRound = useCallback(() => {
    setState(prev => {
      if (prev.current.round >= prev.config.totalRounds) {
        return { ...prev, status: 'ENDED' };
      }

      const nextRoundNum = prev.current.round + 1;
      const nextQuestion = prev.questionBank[nextRoundNum - 1];

      return {
        ...prev,
        current: {
          ...prev.current,
          round: nextRoundNum,
          actionText: nextQuestion?.content || '',
          currentQuestion: nextQuestion
        },
        historyStack: [
          ...prev.historyStack.slice(-MAX_HISTORY + 1),
          { ...prev.current }
        ]
      };
    });
  }, []);

  const undo = useCallback(() => {
    setState(prev => {
      if (prev.historyStack.length === 0) {
        console.warn('Cannot undo: no history available');
        return prev;
      }

      const previousState = prev.historyStack[prev.historyStack.length - 1];
      return {
        ...prev,
        current: previousState,
        historyStack: prev.historyStack.slice(0, -1)
      };
    });
  }, []);

  const endGame = useCallback(() => {
    setState(prev => ({ ...prev, status: 'ENDED' }));
  }, []);

  const resetGame = useCallback(() => {
    setState(initialState);
  }, []);

  const updateQuestionBank = useCallback((questions) => {
    setState(prev => ({
      ...prev,
      questionBank: questions
    }));
  }, []);

  const incrementScore = useCallback(() => {
    setState(prev => ({
      ...prev,
      current: {
        ...prev.current,
        score: prev.current.score + 1
      }
    }));
  }, []);

  const decrementScore = useCallback(() => {
    setState(prev => ({
      ...prev,
      current: {
        ...prev.current,
        score: Math.max(0, prev.current.score - 1)
      }
    }));
  }, []);

  return {
    state,
    startGame,
    nextRound,
    undo,
    endGame,
    resetGame,
    updateQuestionBank,
    incrementScore,
    decrementScore
  };
};
