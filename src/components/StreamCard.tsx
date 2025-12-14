"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Video, WifiOff, Maximize2, RefreshCw, X, Moon, Loader, Minimize2, Flame, Car, Siren } from "lucide-react";

interface StreamCardProps {
  id: string;
  name: string;
  url?: string; // Live URL
  status: "LIVE" | "CONNECTING" | "OFFLINE" | "RECORDING" | "STATIC";
  ip?: string;
  isNightVision?: boolean;
  staticImage?: string;
  videoSrc?: string;
}

export default function StreamCard({ id, name, url, status, ip, isNightVision, staticImage, videoSrc }: StreamCardProps) {
  const [isLowLatency, setIsLowLatency] = useState(false);
  const [showTip, setShowTip] = useState(true);
  // Determine initial source
  const initialSrc = status === "STATIC" && staticImage ? staticImage : (url ? `${url}/video` : "/camera.jpg");
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [fps, setFps] = useState(0);
  const [error, setError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Render Logic based on Status (Declared early for Hooks)
  const isLive = status === "LIVE";
  const isStatic = status === "STATIC";

  // AI Prediction State
  const [predictions, setPredictions] = useState({ fire: 0, accident: 0, violence: 0 });
  const wsRef = useRef<WebSocket | null>(null);
  
  const frameCount = useRef(0);
  const lastFrameTime = useRef(Date.now());
  const requestRef = useRef<number | null>(null);
  const isPolling = useRef(false);

  // Simulated Detection for Video Files
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoSrc) return;
    
    const checkTime = () => {
        if (!videoRef.current) return;
        
        // Simulating fire @ 50 seconds (Adjustable)
        const FIRE_START_TIME = 50;  
        
        const VIDEO_DURATION_LIMIT = 60; // 1 Minute

        if (videoRef.current.currentTime >= VIDEO_DURATION_LIMIT) {
             videoRef.current.currentTime = 0;
             return;
        }

        if (videoRef.current.currentTime > FIRE_START_TIME) {
            const fireConfidence = 85 + Math.floor(Math.random() * 10);
            setPredictions({
                fire: fireConfidence, // 85-95%
                accident: Math.floor(Math.random() * 5),
                violence: Math.floor(Math.random() * 5)
            });

            // Trigger Alert if > 70% (Simulated Push)
            if (fireConfidence > 70) {
                 const storedAlerts = localStorage.getItem("fire_alerts");
                 const alerts = storedAlerts ? JSON.parse(storedAlerts) : [];
                 
                 // Simple logic to avoid spamming the same alert repeatedly
                 // In a real app, backend would handle "incident" grouping
                 const lastAlert = alerts[0];
                 const isRecent = lastAlert && (Date.now() - new Date(lastAlert.timestamp).getTime() < 300000); // 5 min cool-down

                 if (!isRecent) {
                    const newAlert = {
                        id: `alert-${Date.now()}`,
                        cameraName: name, 
                        // Using simulated location as requested
                        location: "12 Jaipur city",
                        timestamp: new Date().toISOString(),
                        videoLink: videoSrc, // Providing the link to the clip
                        confidence: fireConfidence,
                        status: "ACTIVE"
                    };
                    localStorage.setItem("fire_alerts", JSON.stringify([newAlert, ...alerts]));
                 }
            }
        } else {
             setPredictions({ fire: 0, accident: 0, violence: 0 });
        }
    };

    const interval = setInterval(checkTime, 500);
    return () => clearInterval(interval);
  }, [videoSrc]);

  // WebSocket Connection for AI Config
  useEffect(() => {
    if (!isLive || !url) return;

    // Connect to local AI Service
    // In production, this URL would be dynamic or proxied
    const ws = new WebSocket("ws://localhost:8000/ws/detect");

    ws.onopen = () => {
        console.log("Connected to AI Service");
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            setPredictions({
                fire: data.fire || 0,
                accident: data.accident || 0,
                violence: data.violence || 0
            });
        } catch (e) {
            console.error("Failed to parse AI data", e);
        }
    };

    ws.onerror = (e) => {
        console.log("AI Service disconnected/unavailable");
    };

    wsRef.current = ws;

    return () => {
        if (wsRef.current) {
            wsRef.current.close();
        }
    };
  }, [isLive, url]);

  // Polling Logic
  const poll = useCallback(() => {
    if (!url || !isPolling.current) return;

    const newImg = new window.Image();
    const timestamp = Date.now();
    newImg.src = `${url}/shot.jpg?rnd=${timestamp}`;

    newImg.onload = () => {
      setImgSrc(newImg.src);
      
      // FPS Counter
      const now = Date.now();
      frameCount.current++;
      if (now - lastFrameTime.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastFrameTime.current = now;
      }
      
      if (isPolling.current) {
        requestRef.current = requestAnimationFrame(poll);
      }
    };

    newImg.onerror = () => {
      if (isPolling.current) {
         setTimeout(poll, 1000);
      }
    };
  }, [url]);

  useEffect(() => {
    if (isLowLatency && url) {
      isPolling.current = true;
      poll();
    } else {
      isPolling.current = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (url) setImgSrc(`${url}/video?t=${Date.now()}`);
    }

    return () => {
      isPolling.current = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isLowLatency, url, poll]);

  const refreshFeed = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (url && !isLowLatency) {
       setImgSrc(`${url}/video?t=${Date.now()}`);
    }
  };

  const toggleZoom = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  // Render Logic based on Status
  
  const CardContent = (
    <>
      {/* Video Content */}
      <div className={`bg-black relative flex items-center justify-center group-hover:ring-2 group-hover:ring-navy-400 transition-all duration-300 ${isZoomed ? "h-full w-full" : "aspect-video"}`}>
        {(isLive && url) || isStatic || videoSrc ? (
            <>
                {videoSrc ? (
                    <video 
                        ref={videoRef}
                        src={videoSrc}
                        autoPlay={isZoomed} // Only play when zoomed
                        loop
                        muted
                        playsInline
                        className={`w-full h-full object-cover ${isZoomed ? "object-contain" : ""}`}
                    />
                ) : (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={imgSrc} 
                            alt="Live Feed" 
                            className={`w-full h-full object-cover ${isZoomed ? "object-contain" : ""}`}
                            onError={() => setError(true)}
                        />
                    </>
                )}
                
                {error && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-slate-400 p-4 text-center z-10">
                        <WifiOff className="w-8 h-8 mb-2" />
                        <p className="text-sm">Stream Unavailable</p>
                        <p className="text-xs opacity-75">Check network connectivity</p>
                    </div>
                )}

                {/* Controls */}
                <div className={`absolute bottom-3 left-3 flex gap-2 z-20 ${!isZoomed && "opacity-0 group-hover:opacity-100 transition-opacity duration-200"}`}>
                     <button onClick={toggleZoom} className="bg-black/50 text-white p-1.5 rounded hover:bg-black/70 backdrop-blur-sm" title={isZoomed ? "Minimize" : "Maximize"}>
                        {isZoomed ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    </button>
                    {!isZoomed && isLive && (
                        <button onClick={refreshFeed} className="bg-black/50 text-white p-1.5 rounded hover:bg-black/70 backdrop-blur-sm" title="Force Refresh">
                            <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                {/* Optimization Tip (Only in card view) */}
                {showTip && !isZoomed && isLive && (
                     <div className="absolute top-2 w-10/12 bg-navy-900/90 text-white text-[10px] p-2 rounded backdrop-blur-md border border-navy-700 shadow-lg flex justify-between items-start gap-2 z-20">
                        <div>
                            <span className="font-bold text-yellow-400 block mb-0.5">Experiencing Lag?</span>
                            1. Enable "Low Latency" toggle above.<br/>
                            3. Move camera closer to Router.
                        </div>
                        <button onClick={() => setShowTip(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                     </div>
                )}
            </>
        ) : status === "CONNECTING" ? (
             <div className="flex flex-col items-center text-slate-400">
                <Loader className="w-8 h-8 mb-2 animate-spin" />
                <span className="text-xs">Connecting to signal...</span>
             </div>
        ) : status === "RECORDING" || status === "STATIC" ? (
             <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-500">
                {isNightVision && (
                    <>
                        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 to-slate-900 opacity-50 absolute inset-0"></div>
                        <Moon className="text-slate-600 opacity-20 absolute top-4 right-4 w-8 h-8" />
                        <span className="px-2 py-1 bg-black/50 rounded text-[10px] text-white backdrop-blur-sm absolute bottom-2 right-2">Night Vision On</span>
                    </>
                )}
                {!isNightVision && <span className="text-xs">Recording (Archive)</span>}
             </div>
        ) : (
            <div className="flex flex-col items-center text-slate-500">
                <WifiOff className="w-8 h-8 mb-2" />
                <span className="text-xs">No Signal</span>
            </div>
        )}
      </div>
    </>
  );
  
  return (
    <>
        {/* Normal Card View */}
        <div className={`bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col group relative ${!isLive && !isStatic && "opacity-75"}`}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-white">
            <div className="flex items-center gap-2">
            <Video className={(isLive || isStatic) ? "text-navy-600 w-4 h-4" : "text-slate-400 w-4 h-4"} />
            <span className="text-sm font-medium text-slate-700">{name}</span>
            </div>
            
            <div className="flex items-center gap-2">
                {isLive && (
                    <div className="flex items-center gap-1.5" title="Switch between Smooth (Stream) and Fast (Snapshot) modes">
                        <label htmlFor={`toggle-${id}`} className="text-[10px] font-medium text-slate-500 cursor-pointer select-none">Low Latency</label>
                        <button 
                            id={`toggle-${id}`}
                            onClick={() => setIsLowLatency(!isLowLatency)}
                            className={`w-8 h-4 rounded-full relative transition-colors duration-200 focus:outline-none ring-offset-1 focus:ring-1 focus:ring-navy-500 ${isLowLatency ? "bg-navy-600" : "bg-slate-200"}`}
                            role="switch"
                            aria-checked={isLowLatency}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-200 ${isLowLatency ? "translate-x-4" : "translate-x-0"}`}></span>
                        </button>
                    </div>
                )}
                
                <Badge status={status} />
            </div>
        </div>

        {/* Conditionally render content: Placeholder if zoomed, Content if not */}
        {isZoomed ? (
            <div className="aspect-video bg-slate-100 flex flex-col items-center justify-center text-slate-400 gap-2 border-b border-slate-100">
                <Maximize2 className="w-8 h-8 opacity-50" />
                <span className="text-xs font-medium">Expanded in View</span>
                <button onClick={toggleZoom} className="text-[10px] text-blue-600 hover:underline">Restore</button>
            </div>
        ) : (
            CardContent
        )}

        {/* Prediction Panel */}
        {(isLive || isStatic || videoSrc) && (
            <div className="px-4 py-3 bg-white border-t border-slate-100 grid grid-cols-3 gap-2">
                 {/* Show real predictions for Live, simulated for Video, 0 for Static */}
                 <PredictionMetric label="Fire" icon={Flame} percentage={(isLive || videoSrc) ? predictions.fire : 0} />
                 <PredictionMetric label="Accident" icon={Car} percentage={(isLive || videoSrc) ? predictions.accident : 0} />
                 <PredictionMetric label="Violence" icon={Siren} percentage={(isLive || videoSrc) ? predictions.violence : 0} />
            </div>
        )}

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <span className="font-mono">{ip || "---"}</span>
            <div className="flex items-center gap-2">
                    {isLowLatency && isLive && <span className="text-[10px] font-mono bg-slate-200 px-1 rounded">{fps} FPS</span>}
                    <span>{status === "LIVE" ? "Uptime: 02:14:59" : status === "RECORDING" || status === "STATIC" ? "Rec: 48h left" : "--:--:--"}</span>
            </div>
        </div>
        </div>

        {/* Zoom Modal Overlay */}
        {isZoomed && (
            <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 backdrop-blur-sm">
                
                {/* Close Button (Floating) */}
                <button 
                    onClick={toggleZoom} 
                    className="absolute top-4 right-4 z-[110] bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors border border-white/5"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="w-full max-w-7xl bg-slate-900 rounded-xl shadow-2xl relative overflow-hidden border border-slate-800 flex flex-col lg:flex-row h-[80vh] lg:h-[70vh]">
                     
                     {/* Left Column: Video Feed (3/4) */}
                     <div className="relative w-full lg:w-3/4 h-full bg-black flex items-center justify-center border-r border-slate-800">
                        {CardContent}
                        
                        {/* Overlay Info (Minimal) */}
                        <div className="absolute top-4 left-4 flex flex-col gap-1">
                             <h2 className="text-white text-lg font-medium drop-shadow-md">{name}</h2>
                             <div className="flex items-center gap-2 text-[10px] text-white/70 font-mono bg-black/40 px-2 py-1 rounded backdrop-blur-md">
                                <span>IP: {ip}</span>
                                <span className="w-px h-3 bg-white/20"></span>
                                <span>{isLowLatency ? "LOW LATENCY" : "STANDARD"}</span>
                             </div>
                        </div>
                     </div>

                     {/* Right Column: Metrics & Analysis (1/4) */}
                     <div className="w-full lg:w-1/4 h-full bg-slate-900 p-6 flex flex-col border-t lg:border-t-0">
                        <div className="mb-6">
                            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Real-time Analysis</h3>
                            <div className="h-0.5 w-8 bg-navy-500 rounded-full"></div>
                        </div>

                        <div className="flex flex-col gap-4 flex-grow overflow-y-auto">
                             <PredictionMetric label="Fire Detection" icon={Flame} percentage={predictions.fire} dark large />
                             <PredictionMetric label="Vehicle Accident" icon={Car} percentage={predictions.accident} dark large />
                             <PredictionMetric label="Violence / Threat" icon={Siren} percentage={predictions.violence} dark large />
                             
                             {/* Additional context */}
                             <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                <h4 className="text-slate-300 text-sm font-medium mb-2 flex items-center gap-2">
                                    <Video className="w-4 h-4 text-navy-400" /> 
                                    Camera Status
                                </h4>
                                <ul className="space-y-2 text-xs text-slate-400">
                                    <li className="flex justify-between">
                                        <span>Connection</span>
                                        <span className={status === "LIVE" ? "text-green-400" : "text-slate-400"}>
                                            {status === "LIVE" ? "Stable (14ms)" : "Archived"}
                                        </span>
                                    </li>
                                </ul>
                             </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-800 text-center">
                            <p className="text-[10px] text-slate-500">
                                AI Confidence calculated over last 60 frames.
                            </p>
                        </div>
                     </div>
                </div>
            </div>
        )}
    </>
  );
}

function Badge({ status }: { status: string }) {
    if (status === "LIVE") {
        return (
            <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                LIVE
            </span>
        );
    }
    if (status === "CONNECTING") {
        return <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Connecting...</span>;
    }
    if (status === "RECORDING" || status === "STATIC") {
        return <span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">REC</span>;
    }
    return <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Maintenance</span>;
}

// Prediction Component
function PredictionMetric({ label, icon: Icon, percentage, dark, large }: { label: string, icon: any, percentage: number, dark?: boolean, large?: boolean }) {
    // 0-50 Green, 51-70 Yellow, >70 Red
    let colorClass = "bg-green-500";
    let textClass = dark ? "text-green-400" : "text-green-600";
    let iconClass = dark ? "text-slate-400" : "text-slate-500";
    
    if (percentage > 70) {
        colorClass = "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] animate-pulse";
        textClass = "text-red-500 font-bold";
        iconClass = "text-red-500";
    } else if (percentage > 50) {
        colorClass = "bg-yellow-500";
        textClass = dark ? "text-yellow-400" : "text-yellow-600";
        iconClass = dark ? "text-yellow-400" : "text-yellow-600";
    }

    return (
        <div className={`flex flex-col gap-2 ${dark ? "bg-slate-800/50" : "bg-slate-50"} ${large ? "p-4" : "p-2"} rounded-lg border ${dark ? "border-slate-700/50" : "border-slate-100"} transition-all duration-300 hover:border-slate-600`}>
            <div className="flex justify-between items-start">
                <div className={`flex items-center gap-2 ${large ? "text-sm" : "text-[10px]"} uppercase font-medium ${dark ? "text-slate-200" : "text-slate-500"}`}>
                    <div className={`p-1.5 rounded-md ${dark ? "bg-slate-700/50" : "bg-white"} ${iconClass}`}>
                         <Icon className={large ? "w-4 h-4" : "w-3 h-3"} />
                    </div>
                    <span>{label}</span>
                </div>
                <span className={`${large ? "text-xl" : "text-xs"} font-mono leading-none ${textClass}`}>{percentage}%</span>
            </div>
            
            {/* Detailed Bar for Large View */}
            <div className="flex flex-col gap-1">
                <div className={`h-1.5 w-full ${dark ? "bg-slate-700" : "bg-slate-200"} rounded-full overflow-hidden`}>
                    <div 
                        className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                {large && (
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                        <span>Safe</span>
                        <span>Critical</span>
                    </div>
                )}
            </div>
        </div>
    );
}
