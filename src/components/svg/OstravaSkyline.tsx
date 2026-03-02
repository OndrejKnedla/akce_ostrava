import { cn } from '@/utils/cn';

interface OstravaSkylineProps {
  className?: string;
  color?: string;
}

export function OstravaSkyline({ className, color = 'currentColor' }: OstravaSkylineProps) {
  return (
    <svg
      viewBox="0 0 1200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full', className)}
      aria-hidden="true"
    >
      {/* Blast furnace left */}
      <rect x="50" y="80" width="40" height="120" fill={color} opacity="0.6" />
      <rect x="55" y="40" width="30" height="40" fill={color} opacity="0.7" />
      <rect x="65" y="10" width="10" height="30" fill={color} opacity="0.5" />

      {/* Chimney stack 1 */}
      <rect x="130" y="60" width="12" height="140" fill={color} opacity="0.5" />
      <rect x="126" y="55" width="20" height="8" fill={color} opacity="0.6" />

      {/* Industrial building 1 */}
      <polygon points="180,200 180,100 220,70 260,100 260,200" fill={color} opacity="0.4" />
      <rect x="200" y="120" width="20" height="30" fill={color} opacity="0.2" />

      {/* Gas holder (Gong) */}
      <circle cx="350" cy="130" r="60" fill={color} opacity="0.3" />
      <circle cx="350" cy="130" r="50" fill={color} opacity="0.15" />
      <rect x="340" y="70" width="20" height="130" fill={color} opacity="0.25" />

      {/* Steel tower / headframe */}
      <polygon points="460,200 470,50 480,200" fill={color} opacity="0.5" />
      <polygon points="450,200 470,50 490,200" fill={color} opacity="0.3" />
      <rect x="465" y="45" width="10" height="10" fill={color} opacity="0.6" />

      {/* Chimney stack 2 */}
      <rect x="530" y="30" width="15" height="170" fill={color} opacity="0.4" />

      {/* Industrial hall */}
      <rect x="580" y="110" width="120" height="90" fill={color} opacity="0.35" />
      <polygon points="580,110 640,75 700,110" fill={color} opacity="0.45" />
      <rect x="610" y="140" width="20" height="25" fill={color} opacity="0.2" />
      <rect x="650" y="140" width="20" height="25" fill={color} opacity="0.2" />

      {/* Blast furnace right */}
      <rect x="750" y="60" width="50" height="140" fill={color} opacity="0.5" />
      <polygon points="750,60 775,20 800,60" fill={color} opacity="0.6" />
      <rect x="760" y="100" width="30" height="20" fill={color} opacity="0.25" />

      {/* Pipeline */}
      <rect x="800" y="150" width="200" height="6" fill={color} opacity="0.3" />
      <rect x="820" y="130" width="6" height="20" fill={color} opacity="0.3" />
      <rect x="920" y="130" width="6" height="20" fill={color} opacity="0.3" />

      {/* Chimney stack 3 */}
      <rect x="1020" y="50" width="14" height="150" fill={color} opacity="0.45" />
      <rect x="1015" y="45" width="24" height="8" fill={color} opacity="0.5" />

      {/* Small building right */}
      <rect x="1080" y="130" width="70" height="70" fill={color} opacity="0.3" />
      <polygon points="1080,130 1115,100 1150,130" fill={color} opacity="0.4" />
    </svg>
  );
}
