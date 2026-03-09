import { useState, useRef, useEffect } from 'react';
import { IndustrialButton } from './IndustrialButton';

export const ActionControls = ({
  onSuccess,
  onFail,
  onNext,
  onUndo,
  onEnd,
  canUndo = false,
  isLastRound = false
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSuccess = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsProcessing(true);
    onSuccess();
    timerRef.current = setTimeout(() => {
      onNext();
      setIsProcessing(false);
    }, 300);
  };

  const handleFail = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsProcessing(true);
    onFail();
    timerRef.current = setTimeout(() => {
      onNext();
      setIsProcessing(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border pb-[env(safe-area-inset-bottom)] z-40">
      <div className="p-4 space-y-2">
        {/* Score Controls - 失败+1分，成功不计分 */}
        <div className="grid grid-cols-2 gap-2">
          <IndustrialButton onClick={handleSuccess} variant="primary" disabled={isProcessing}>
            ✓ Success
          </IndustrialButton>
          <IndustrialButton onClick={handleFail} disabled={isProcessing}>
            ✗ Fail (+1)
          </IndustrialButton>
        </div>

        {/* Navigation Controls */}
        <div className="grid grid-cols-3 gap-2">
          <IndustrialButton onClick={onNext} disabled={isProcessing}>
            {isLastRound ? 'Finish' : 'Skip'}
          </IndustrialButton>
          <IndustrialButton onClick={onUndo} disabled={!canUndo || isProcessing}>
            Undo
          </IndustrialButton>
          <IndustrialButton onClick={onEnd} disabled={isProcessing}>
            End
          </IndustrialButton>
        </div>
      </div>
    </div>
  );
};
