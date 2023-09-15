import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export default function Button(props: ButtonProps) {
  const { children, onClick } = props;

  return <button onClick={onClick}>{children}</button>;
}
