import { useState, useEffect, useRef } from 'react';

const DURATION = 800; // ms
const INTERVAL = 100; // ms (10 FPS)
const CHAR_POOL = '0123456789ABCDEF!@#$%^&*的一是在不了有和人这中大来上个国得以说于';

export const useScrambleText = (targetText) => {
  const [displayText, setDisplayText] = useState('');
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!targetText) {
      setDisplayText('');
      return;
    }

    // 清理之前的定时器
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    startTimeRef.current = Date.now();

    // 立即开始第一帧（全部乱码）
    const updateScramble = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);

      if (progress >= 1) {
        setDisplayText(targetText);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        return;
      }

      // 计算应该锁定多少个字符
      const lockedCount = Math.floor(progress * targetText.length);

      // 构建乱码文本
      let scrambled = '';
      for (let i = 0; i < targetText.length; i++) {
        if (i < lockedCount) {
          // 字符已锁定，显示真实字符
          scrambled += targetText[i];
        } else {
          // 字符仍在乱码中，显示随机字符
          const randomIndex = Math.floor(Math.random() * CHAR_POOL.length);
          scrambled += CHAR_POOL[randomIndex];
        }
      }

      setDisplayText(scrambled);
    };

    // 立即执行第一次
    updateScramble();

    // 启动定时器
    timerRef.current = setInterval(updateScramble, INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [targetText]);

  return displayText;
};
