import { useEffect, useRef, useState } from "react";

export default function Modelo3D() {
  const [scriptReady, setScriptReady] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const viewerRef = useRef(null);

  // 1. Cargar el script de model-viewer
  useEffect(() => {
    import("@google/model-viewer").then(() => setScriptReady(true));
  }, []);

  // 2. Una vez que el elemento existe en el DOM, escuchar su progreso real
  useEffect(() => {
    if (!scriptReady) return;

    const mv = viewerRef.current;
    if (!mv) return;

    const onProgress = (e) => {
      const pct = Math.round((e.detail?.totalProgress ?? 0) * 100);
      setProgress(pct);
    };

    const onLoad = () => {
      setProgress(100);
      setModelLoaded(true);
    };

    mv.addEventListener("progress", onProgress);
    mv.addEventListener("load", onLoad);

    return () => {
      mv.removeEventListener("progress", onProgress);
      mv.removeEventListener("load", onLoad);
    };
  }, [scriptReady]);

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

      {/* PRELOADER */}
      {!modelLoaded && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 transition-opacity duration-700"
          style={{ opacity: modelLoaded ? 0 : 1 }}
        >
          {/* Aro giratorio */}
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/15" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-cyan-300">
              {progress}%
            </div>
          </div>

          <div className="text-sm text-slate-400 tracking-wide">
            Cargando modelo 3D…
          </div>

          {/* Barra de progreso fina */}
          <div className="h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {scriptReady && (
        <model-viewer
          ref={viewerRef}
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
            opacity: modelLoaded ? 1 : 0,
            transition: "opacity .7s ease",
          }}
        />
      )}
    </div>
  );
}