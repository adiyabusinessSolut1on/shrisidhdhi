
export const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
      style={{ zIndex: 50 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#f8f8f8"
        height={80}
        width={80}
      >
        <path d="M16 12L10 18V6L16 12Z"></path>
      </svg>
    </div>
  );
  
  export const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer z-10"
      onClick={onClick}
      style={{ zIndex: 50 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#f8f8f8"
        height={80}
        width={80}
      >
        <path d="M8 12L14 6V18L8 12Z"></path>
      </svg>
    </div>
  );
  