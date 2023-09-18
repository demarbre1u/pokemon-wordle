type KeyProps = {
  symbol: string;
  onClick: (event: string) => void;
};

export const Key = (props: KeyProps) => {
  const { symbol, onClick } = props;

  return (
    <div className="keys" onClick={() => onClick(symbol)}>
      {symbol}
    </div>
  );
};
