// WaveDivider.jsx
export default function WaveDivider({ className = "" }) {
  return (
    <div
      className={`absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none ${className}`}
    >
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="  w-full h-[50px] sm:h-[80px] md:h-[120px]"
      >
        <path
        d="M0,200 Q720,-60 1440,200 L1440,200 L0,200 Z"
         fill="var(--color-bg)"
        
        />
      </svg>
    </div>
  )
}