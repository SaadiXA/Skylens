import React from 'react';

interface MapDisplayProps {
  latitude: number;
  longitude: number;
  loading: boolean;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ latitude, longitude, loading }) => {
  // Calculate a small bounding box for the iframe view
  const lon_min = longitude - 0.1;
  const lat_min = latitude - 0.1;
  const lon_max = longitude + 0.1;
  const lat_max = latitude + 0.1;

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon_min},${lat_min},${lon_max},${lat_max}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <section className="w-full animate-fade-in-up">
      <h2 className="text-2xl font-bold text-white mb-6 text-glow">Location Map</h2>
      <div className="bg-black/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg overflow-hidden h-80 sm:h-96 relative">
        {loading ? (
           <div className="w-full h-full bg-white/5 placeholder-shimmer" />
        ) : (
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            src={mapUrl}
            style={{ border: 'none' }}
            title={`Map of location at latitude ${latitude}, longitude ${longitude}`}
            aria-label={`Map of location at latitude ${latitude}, longitude ${longitude}`}
          ></iframe>
        )}
      </div>
    </section>
  );
};

export default MapDisplay;
