export type Item = {
  userId: string;
  name: string;
  email: string;
  thumbnail: string;
};

export type VirtualizedListProps = {
  items: Item[];
  renderItem: (item: Item, index: number) => JSX.Element;
  itemHeight: number;
  containerHeight: number;
};
