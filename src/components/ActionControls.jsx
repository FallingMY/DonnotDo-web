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
  const handleSuccess = () => {
    // 成功不计分，直接切换到下一题
    onSuccess();
    setTimeout(() => {
      onNext();
    }, 300);
  };

  const handleFail = () => {
    // 失败增加1分（惩罚分）
    onFail();
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border pb-[env(safe-area-inset-bottom)] z-40">
      <div className="p-4 space-y-2">
        {/* Score Controls - 失败+1分，成功不计分 */}
        <div className="grid grid-cols-2 gap-2">
          <IndustrialButton onClick={handleSuccess} variant="primary">
            ✓ Success
          </IndustrialButton>
          <IndustrialButton onClick={handleFail}>
            ✗ Fail (+1)
          </IndustrialButton>
        </div>

        {/* Navigation Controls */}
        <div className="grid grid-cols-3 gap-2">
          <IndustrialButton onClick={onNext}>
            {isLastRound ? 'Finish' : 'Skip'}
          </IndustrialButton>
          <IndustrialButton onClick={onUndo} disabled={!canUndo}>
            Undo
          </IndustrialButton>
          <IndustrialButton onClick={onEnd}>
            End
          </IndustrialButton>
        </div>
      </div>
    </div>
  );
};
