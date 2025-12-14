import Navbar from "@/components/Navbar";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-navy-800 mb-6">Privacy Policy</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 prose prose-slate max-w-none">
          <p className="text-slate-500 mb-8 italic">Last Updated: December 14, 2025</p>

          <h3 className="text-navy-700 font-semibold text-lg mt-6 mb-2">1. Introduction</h3>
          <p>
            Civic Eye ("we", "our", or "us") is committed to protecting the privacy of our citizens. 
            This Privacy Policy explains how we handle the video feeds and data shared through the Civic Eye platform.
          </p>

          <h3 className="text-navy-700 font-semibold text-lg mt-6 mb-2">2. Data Collection</h3>
          <p>
            We collect real-time video streams purely for the purpose of public safety monitoring. 
            <strong>We do not store generic footage.</strong> Storage is triggered only when an anomaly (Fire, Accident, Violence) is detected by our AI systems.
          </p>

          <h3 className="text-navy-700 font-semibold text-lg mt-6 mb-2">3. User Consent</h3>
          <p>
            By registering your camera, you grant the Government of Rajasthan permission to access the video feed. 
            You may revoke this access at any time through the "My Cameras" portal.
          </p>

          <h3 className="text-navy-700 font-semibold text-lg mt-6 mb-2">4. Restricted Areas</h3>
          <p>
            Cameras must strictly face <strong>public areas</strong> (Streets, Markets, Roads). 
            feeds monitoring private interiors or private properties of neighbors will be rejected and the user may be banned.
          </p>

          <h3 className="text-navy-700 font-semibold text-lg mt-6 mb-2">5. Data Sharing</h3>
            <p>
            Data is shared exclusively with:
            </p>
            <ul className="list-disc pl-5 mt-2">
                <li>Police Department (in case of crime/violence)</li>
                <li>Fire Department (in case of fire)</li>
                <li>Traffic Control (in case of accidents)</li>
            </ul>
            <p>
            We do not sell or share data with third-party advertisers.
            </p>
        </div>
      </div>
    </main>
  );
}
