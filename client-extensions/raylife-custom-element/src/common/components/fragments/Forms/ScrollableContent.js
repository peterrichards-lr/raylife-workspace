import React from 'react';

export const ScrollableContent = ({ children, className, onAtBottom }) => {
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 10;
    if (bottom) {
      onAtBottom(e);
    }
  };

  const style = {
    overflowY: 'scroll'
  };

  return (
    <div onScroll={handleScroll} className={className} style={style}>
      {children}
    </div>
  );
};
