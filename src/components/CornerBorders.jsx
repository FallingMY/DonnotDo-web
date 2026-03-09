export const CornerBorders = () => {
  const pulseStyle = { animation: 'corner-pulse 4s ease-in-out infinite' };

  return (
    <>
      {/* Top Left */}
      <div className="fixed top-0 left-0 w-8 h-8 border-t border-l border-border pointer-events-none z-50" style={pulseStyle} />

      {/* Top Right */}
      <div className="fixed top-0 right-0 w-8 h-8 border-t border-r border-border pointer-events-none z-50" style={pulseStyle} />

      {/* Bottom Left */}
      <div className="fixed bottom-0 left-0 w-8 h-8 border-b border-l border-border pointer-events-none z-50" style={pulseStyle} />

      {/* Bottom Right */}
      <div className="fixed bottom-0 right-0 w-8 h-8 border-b border-r border-border pointer-events-none z-50" style={pulseStyle} />
    </>
  );
};
