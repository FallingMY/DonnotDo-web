export const ModuleCard = ({ moduleId, name, children, className = '', ...rest }) => {
  return (
    <div className={`bg-surface border border-border ${className}`} {...rest}>
      <div className="font-mono text-xs text-text-secondary p-2 border-b border-border uppercase">
        [ {moduleId} / {name} ]
        <span className="text-accent ml-1 inline-block"
          style={{ animation: 'terminal-cursor 1s step-end infinite' }}>_</span>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};
