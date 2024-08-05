interface Props {
    width?: number;
    height?: number;
    fill?: string;
    className?: string;
  }
const PlusSVG = (prop: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...prop}>
      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
    </svg>
  );
};

export default PlusSVG;
