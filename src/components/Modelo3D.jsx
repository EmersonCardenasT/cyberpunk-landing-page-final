import { useEffect, useState } from "react";

export default function Modelo3D() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    import("@google/model-viewer").then(() => setLoaded(true));
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Glow premium */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="
            w-[700px]
            h-[700px]
            rounded-full
            bg-cyan-500/10
            blur-[140px]
          "
        />
      </div>

      <model-viewer
        src="/models/iphone12desarmado/scene.gltf"
        alt="iPhone 12 desarmado"
        camera-controls
        auto-rotate
        auto-rotate-delay="3000"
        rotation-per-second="6deg"
        disable-pan
        autoplay
        camera-target="auto auto auto"
        camera-orbit="20deg 75deg 2.2m"
        min-camera-orbit="auto auto 1.5m"
        max-camera-orbit="auto auto 5m"
        field-of-view="28deg"
        min-field-of-view="20deg"
        max-field-of-view="45deg"
        scale="3 3 3"
        exposure="2"
        shadow-intensity="1"
        shadow-softness="1"
        environment-image="neutral"
        interaction-prompt="auto"
        style={{
          width: "100%",
          height: "100%",
          opacity: loaded ? 1 : 0,
          transition: "opacity .7s ease",
        }}
      />
    </div>
  );
}