interface Props {
  className?: string;
  size?: number;
}

/**
 * AI Infra Decoded mark — a stylized nabla (∇), the gradient operator from
 * vector calculus and the canonical symbol of machine-learning gradient
 * descent. Three horizontal "decoded layers" nest inside the triangle,
 * suggesting structured output emerging from a learned function. Cyan-to-teal
 * gradient on a dark rounded square. Renders crisp at any size.
 */
export function Logo({ className, size = 28 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AI Infra Decoded"
    >
      <defs>
        <linearGradient id="aid-grad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="aid-fill" x1="0" y1="0" x2="0" y2="40">
          <stop offset="0%" stopColor="#0e1116" />
          <stop offset="100%" stopColor="#0a0d12" />
        </linearGradient>
      </defs>
      {/* Rounded-square frame */}
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="9"
        fill="url(#aid-fill)"
        stroke="url(#aid-grad)"
        strokeWidth="1.2"
      />
      {/* ∇ — bold outline nabla / gradient operator */}
      <path
        d="M9 11 L31 11 L20 30 Z"
        stroke="url(#aid-grad)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Three decoded layers nested inside, each fitting the triangle's narrowing width */}
      <line
        x1="14.5"
        y1="17"
        x2="25.5"
        y2="17"
        stroke="url(#aid-grad)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="16.5"
        y1="21"
        x2="23.5"
        y2="21"
        stroke="url(#aid-grad)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="18.5"
        y1="25"
        x2="21.5"
        y2="25"
        stroke="url(#aid-grad)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
