"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { Bell, MapPin, Video, Clock, AlertTriangle, CheckCircle } from "lucide-react";

type Alert = {
  id: string;
  cameraName: string;
  location: string;
  timestamp: string;
  videoLink: string;
  confidence: number;
  status: "ACTIVE" | "ACKNOWLEDGED";
};

export default function FireDashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Load alerts from local storage on mount and poll for updates
  useEffect(() => {
    const loadAlerts = () => {
      try {
        const saved = localStorage.getItem("fire_alerts");
        if (saved) {
          // Sort by newest first
          const parsed = JSON.parse(saved).sort((a: Alert, b: Alert) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          setAlerts(parsed);
        }
      } catch (e) {
        console.error("Failed to load alerts", e);
      }
    };

    loadAlerts();
    const interval = setInterval(loadAlerts, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const acknowledgeAlert = (id: string) => {
    const updated = alerts.map(a => a.id === id ? { ...a, status: "ACKNOWLEDGED" as const } : a);
    setAlerts(updated);
    localStorage.setItem("fire_alerts", JSON.stringify(updated));
  };

  const activeAlerts = alerts.filter(a => a.status === "ACTIVE");
  const history = alerts.filter(a => a.status === "ACKNOWLEDGED");

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      
      <div className="bg-red-700 text-white px-8 py-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
            <div className="p-3 bg-red-800 rounded-lg border border-red-600 shadow-inner">
                <Bell className="w-8 h-8 animate-pulse" />
            </div>
            <div>
                <h1 className="text-2xl font-bold uppercase tracking-wider">Fire Department Rajasthan</h1>
                <p className="text-red-100 text-sm">Emergency Response Dashboard • Zone: Jaipur Central</p>
            </div>
        </div>
      </div>

      <div className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Alerts Column */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <AlertTriangle className="text-red-600" />
                    Active Incidents ({activeAlerts.length})
                </h2>
                {alerts.length > 0 && (
                    <button 
                        onClick={() => {
                            setAlerts([]);
                            localStorage.removeItem("fire_alerts");
                        }}
                        className="bg-white border border-red-200 text-red-600 px-3 py-1 rounded text-xs hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm font-medium"
                    >
                        Clear All History
                    </button>
                )}
            </div>

            {activeAlerts.length === 0 && (
                <div className="bg-white p-12 rounded-lg border-2 border-dashed border-slate-200 text-center text-slate-400">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500 opacity-50" />
                    <p>No active fire incidents reported.</p>
                    <p className="text-xs mt-1">System is monitoring 5 zones.</p>
                </div>
            )}

            {activeAlerts.map(alert => (
                <div key={alert.id} className="bg-white rounded-lg shadow-lg border-l-4 border-red-600 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">{alert.cameraName}</h3>
                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                    <MapPin className="w-4 h-4 text-red-500" />
                                    {alert.location}
                                </div>
                            </div>
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200 uppercase tracking-wide">
                                {alert.confidence}% Confidence
                            </span>
                        </div>

                        <div className="bg-slate-50 rounded border border-slate-200 p-4 mb-6 flex gap-4">
                            {/* Video Thumbnail / Mock */}
                            <div className="w-32 h-20 bg-black rounded flex items-center justify-center text-white shrink-0">
                                <Video className="w-8 h-8 opacity-50" />
                            </div>
                            <div className="space-y-1">
                                <div className="text-xs text-slate-500 uppercase font-bold">Incident Evidence</div>
                                <div className="font-mono text-sm">clip_{alert.id.slice(-6)}.mp4</div>
                                <div className="text-xs text-slate-400">Duration: 01:00</div>
                                <a href={alert.videoLink} target="_blank" className="text-blue-600 text-xs hover:underline mt-1 block">View Full Feed</a>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                            <div className="text-xs text-slate-400 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {new Date(alert.timestamp).toLocaleTimeString()} • {new Date(alert.timestamp).toLocaleDateString()}
                            </div>
                            <button 
                                onClick={() => acknowledgeAlert(alert.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow-sm text-sm font-medium transition-colors"
                            >
                                Dispatch Unit
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* History Column */}
        <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                <Clock className="text-slate-400" />
                Recent History
            </h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                {history.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">
                        No previous incidents.
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {history.map(alert => (
                            <div key={alert.id} className="p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-slate-700 text-sm">{alert.cameraName}</span>
                                    <span className="text-green-600 text-xs font-bold">DISPATCHED</span>
                                </div>
                                <div className="text-xs text-slate-500 mb-2">{alert.location}</div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                    {new Date(alert.timestamp).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </main>
  );
}
