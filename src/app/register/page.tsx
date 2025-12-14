"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Camera, CheckCircle2 } from "lucide-react";

export default function Register() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would POST to backend
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        
        {submitted ? (
             <div className="bg-white p-12 rounded-lg shadow-sm border border-slate-200 text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <div className="bg-green-100 text-green-600 p-4 rounded-full mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold text-navy-800 mb-2">Registration Submitted</h2>
                <p className="text-slate-600 mb-8">
                    Thank you for contributing to a safer Rajasthan.<br/> 
                    Our team will verify your stream within 24 hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="text-navy-600 hover:underline">Register Another Camera</button>
             </div>
        ) : (
            <>
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-navy-100 text-navy-700 rounded-full mb-4">
                        <Camera className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-navy-800">Register New Camera</h1>
                    <p className="text-slate-500 mt-2">Join the network and help secure your neighborhood.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Owner Name</label>
                                <input type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500" placeholder="e.g. Rahul Sharma" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                <input type="tel" required className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500" placeholder="+91 98765 43210" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Camera Location / Address</label>
                            <textarea required className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500" rows={3} placeholder="Full address of where the camera is installed"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Stream URL (RTSP / IP / HTTP)</label>
                            <input type="url" required className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 font-mono text-sm" placeholder="rtsp://192.168.1.10:554/stream" />
                            <p className="text-xs text-slate-400 mt-1">Ensure this URL is accessible securely.</p>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded border border-slate-100">
                            <input type="checkbox" required id="consent" className="mt-1" />
                            <label htmlFor="consent" className="text-sm text-slate-600">
                                I confirm that this camera overlooks a <strong>public area</strong> and I voluntarily grant access to Civic Eye authorities for security monitoring purposes. I accept the <a href="/privacy" className="text-navy-600 underline">Privacy Policy</a>.
                            </label>
                        </div>

                        <button type="submit" className="w-full bg-navy-800 hover:bg-navy-900 text-white font-bold py-3 rounded-md transition-colors shadow-lg shadow-navy-800/20">
                            Submit Registration
                        </button>
                    </div>
                </form>
            </>
        )}
      </div>
    </main>
  );
}
