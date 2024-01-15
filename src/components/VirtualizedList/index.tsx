import React, { useState } from 'react';
import { VirtualizedListProps } from '../../types';

const VirtualizedList = ({
  items,
  renderItem,
  itemHeight,
  containerHeight,
}: VirtualizedListProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    items.length
  );
  const visibleItems = items.slice(startIndex, endIndex);
  const invisibleItemsHeight =
    (startIndex + visibleItems.length - endIndex) * itemHeight;
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <div
      style={{ height: `${containerHeight}px`, overflowY: 'scroll' }}
      onScroll={handleScroll}
    >
      <div style={{ height: `${items.length * itemHeight}px` }}>
        <div
          style={{
            position: 'relative',
            height: `${visibleItems.length * itemHeight}px`,
            top: `${startIndex * itemHeight}px`,
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={item.userId}
              style={{ height: `${itemHeight}px` }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
        <div style={{ height: `${invisibleItemsHeight}px` }} />
      </div>
    </div>
  );
};

export default VirtualizedList;
