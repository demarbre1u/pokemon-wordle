import "../styles/SpecialKey.css";

type SpecialKeyProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export const SpecialKey = (props: SpecialKeyProps) => {
  const { children, onClick } = props;

  return (
    <div className="special-keys" onClick={onClick}>
      {children}
    </div>
  );
};
