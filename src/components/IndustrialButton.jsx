export const IndustrialButton = ({
  children,
  onClick,
  disabled = false,
  variant = 'default',
  className = '',
  ...rest
}) => {
  const baseClasses = 'font-mono uppercase border transition-none min-h-[44px] px-4 py-2 industrial-btn-press';

  const variantClasses = {
    default: 'bg-surface border-border text-text-primary hover:bg-accent hover:text-bg active:bg-accent active:text-bg disabled:opacity-50 disabled:cursor-not-allowed',
    primary: 'bg-accent border-accent text-bg hover:bg-text-primary hover:border-text-primary active:bg-text-primary active:border-text-primary disabled:opacity-50 disabled:cursor-not-allowed'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
