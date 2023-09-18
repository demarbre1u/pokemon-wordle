import "../styles/ReplayButton.css";

type ReplayButtonProps = {
  onClick: () => void;
};

export default function ReplayButton(props: ReplayButtonProps) {
  const { onClick } = props;

  return <button onClick={onClick}>Rejouer</button>;
}
