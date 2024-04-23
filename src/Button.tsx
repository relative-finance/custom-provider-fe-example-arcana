const Button = ({
  children,
  onClick,
}: {
  children: string;
  onClick: (e: any) => unknown;
}) => {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
};

export default Button;
