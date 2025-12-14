"use client";

import Navbar from "@/components/Navbar";
import StreamCard from "@/components/StreamCard";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

// Define the type for our camera stream objects
type CameraStream = {
    id: string;
    name: string;
    status: "LIVE" | "STATIC" | "CONNECTING" | "OFFLINE" | "RECORDING";
    ip: string;
    url?: string; // For LIVE streams
    staticImage?: string; // For STATIC streams
    videoSrc?: string; // For VIDEO streams
    isNightVision?: boolean;
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStreamName, setNewStreamName] = useState("");
  const [newStreamUrl, setNewStreamUrl] = useState("");

  // Default Streams Configuration
  const DEFAULT_STREAMS: CameraStream[] = [
    {
      id: "cam-01",
      name: "Cam-01 (Main Gate)",
      status: "LIVE",
      ip: "192.168.137.58",
      url: "http://192.168.137.58:8080"
    },
    {
      id: "cam-02",
      name: "Cam-02 (Lobby)",
      status: "LIVE",
      ip: "192.168.137.192",
      url: "http://192.168.137.192:8080"
    },
    {
      id: "cam-03",
      name: "Cam-03 (East Market - Fire Alert)",
      status: "STATIC", // Using STATIC for now as it handles non-live UI well, but plays video
      ip: "10.0.0.45",
      videoSrc: "/fire-cam.mp4"
    },
    {
      id: "cam-04",
      name: "Traffic Junction 4",
      status: "STATIC",
      ip: "10.0.0.48",
      staticImage: "/camera.jpg",
      isNightVision: true
    },
    {
       id: "cam-05",
      name: "Central Park West",
      status: "STATIC",
      ip: "10.0.0.48",
      staticImage: "/camera.jpg",
      isNightVision: true
    }
  ];

  const [streams, setStreams] = useState<CameraStream[]>(DEFAULT_STREAMS);

  // Load from LocalStorage on Mount
  useEffect(() => {
    const saved = localStorage.getItem("civic_eye_streams_v2");
    if (saved) {
        try {
            setStreams(JSON.parse(saved));
        } catch (e) {
            console.error("Failed to load streams", e);
        }
    }
  }, []);

  const handleAddStream = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreamName || !newStreamUrl) return;

    const newCam: CameraStream = {
        id: `cam-${Date.now()}`,
        name: newStreamName,
        status: "LIVE", 
        ip: "Dynamic",
        url: newStreamUrl
    };

    const updatedStreams = [...streams, newCam];
    setStreams(updatedStreams);
    localStorage.setItem("civic_eye_streams_v2", JSON.stringify(updatedStreams));
    
    setNewStreamName("");
    setNewStreamUrl("");
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-navy-800">Surveillance Grid</h1>
                <p className="text-slate-500 text-sm">Monitoring <strong>{streams.length}</strong> active feeds • District: Jaipur Central</p>
            </div>
            
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white border border-slate-300 text-navy-800 hover:bg-navy-50 font-medium py-2 px-4 rounded-md shadow-sm flex items-center gap-2 transition-all"
            >
                <Plus className="w-4 h-4" />
                Add Stream
            </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streams.map((stream) => (
                <StreamCard 
                    key={stream.id}
                    {...stream}
                />
            ))}
        </div>
      </div>

      {/* Add Stream Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-navy-800">Add New Stream</h3>
                </div>
                
                <form onSubmit={handleAddStream} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Camera Name</label>
                        <input 
                            type="text" 
                            autoFocus
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-navy-500 focus:outline-none"
                            placeholder="e.g. West Gate"
                            value={newStreamName}
                            onChange={(e) => setNewStreamName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Stream URL</label>
                        <input 
                            type="url" 
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-navy-500 focus:outline-none font-mono text-xs"
                            placeholder="http://..."
                            value={newStreamUrl}
                            onChange={(e) => setNewStreamUrl(e.target.value)}
                        />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                        <button 
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-navy-800 hover:bg-navy-900 text-white rounded text-sm font-medium"
                        >
                            Add Camera
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </main>
  );
}
