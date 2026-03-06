export const ModuleCard = ({ moduleId, name, children, className = '' }) => {
  return (
    <div className={`bg-surface border border-border ${className}`}>
      <div className="font-mono text-xs text-text-secondary p-2 border-b border-border uppercase">
        [ {moduleId} / {name} ]
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};
