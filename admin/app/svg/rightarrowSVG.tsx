interface Props {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const RightArrowSVG = (prop: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...prop}
    >
      {" "}
      <path d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z">
        {" "}
      </path>
    </svg>
  );
};
export default RightArrowSVG;
