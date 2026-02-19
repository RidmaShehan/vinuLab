"use client";

interface Location {
  ll: [number, number]; // [lon, lat]
  country?: string;
  city?: string;
  count: number;
}

interface WorldMapProps {
  locations: Location[];
  width?: number;
  height?: number;
}

function project(lon: number, lat: number): [number, number] {
  const x = (lon + 180) / 360;
  const y = (90 - lat) / 180;
  return [x, y];
}

export default function WorldMap({ locations, width = 800, height = 400 }: WorldMapProps) {
  const padding = 24;
  const mapWidth = width - padding * 2;
  const mapHeight = height - padding * 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="mapOcean" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
        <linearGradient id="markerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <pattern id="grid" width="36" height="18" patternUnits="userSpaceOnUse">
          <path d="M 36 0 L 0 0 0 18" fill="none" stroke="#27272a" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill="url(#mapOcean)" />
      <rect x={padding} y={padding} width={mapWidth} height={mapHeight} fill="url(#grid)" opacity={0.6} />
      <rect
        x={padding}
        y={padding}
        width={mapWidth}
        height={mapHeight}
        fill="none"
        stroke="#3f3f46"
        strokeWidth={1}
      />
      {locations.slice(0, 100).map((loc, i) => {
        const [lon, lat] = loc.ll;
        const [nx, ny] = project(lon, lat);
        const x = padding + nx * mapWidth;
        const y = padding + ny * mapHeight;
        const r = Math.min(4 + Math.log2(loc.count + 1), 12);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={r + 3} fill="rgba(14, 116, 144, 0.2)" />
            <circle
              cx={x}
              cy={y}
              r={r}
              fill="url(#markerGrad)"
              stroke="#0e7490"
              strokeWidth={1}
            />
            <title>
              {loc.city && loc.country ? `${loc.city}, ${loc.country}` : loc.country || "Unknown"} ({loc.count} visits)
            </title>
          </g>
        );
      })}
    </svg>
  );
}
