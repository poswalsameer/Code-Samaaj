interface LoadingSpinnerProps {
  size?: number;
  textSize?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  textSize = "text-base",
}) => {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center "
      id="bg-grid-pattern-signup"
    >
      <div className="flex items-center justify-center space-x-2">
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="black"
            strokeWidth="4"
            fill="none"
            strokeDasharray="31.4 31.4"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <span className={`font-semibold ${textSize}`}>LOADING</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
