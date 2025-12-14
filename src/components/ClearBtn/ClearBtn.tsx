interface ClearBtnProps {
  className: string;
  onClick: () => void;
  iconClassName: string;
}

const ClearBtn: React.FC<ClearBtnProps> = ({
  className,
  onClick,
  iconClassName,
}) => {
  return (
    <button className={className} type="button" onClick={onClick}>
      <svg className={iconClassName}>
        <use href="/icons/sprite.svg#icon-x" />
      </svg>
    </button>
  );
};

export default ClearBtn;
