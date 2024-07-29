interface Props {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const MinusSVG = (prop: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
     {...prop}
    >
      <path d="M5 11V13H19V11H5Z"></path>
    </svg>
  );
};
export default MinusSVG;
