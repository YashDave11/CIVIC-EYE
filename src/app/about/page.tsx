import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-navy-800 mb-6">About Civic Eye</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 prose prose-slate max-w-none">
          <p className="lead text-lg text-slate-600 mb-6">
            <strong>CIVIC EYE</strong> is a visionary initiative by the <strong>Government of Rajasthan</strong> under the Smart Cities Mission. 
            Our goal is to create a decentralized, privacy-focused surveillance network that empowers citizens to contribute to public safety.
          </p>

          <h3 className="text-navy-700 font-semibold text-xl mt-8 mb-3">Our Mission</h3>
          <p>
            Public safety is a shared responsibility. Traditional surveillance systems are expensive and limited in coverage. 
            Civic Eye bridges this gap by allowing citizens to voluntarily share their street-facing camera feeds with local authorities 
            during emergencies or for general monitoring, creating a denser and more effective safety net.
          </p>

          <h3 className="text-navy-700 font-semibold text-xl mt-8 mb-3">Key Features</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li><strong>Decentralized Network:</strong> Utilizing existing private infrastructure for public good.</li>
            <li><strong>AI-Powered Analytics:</strong> Real-time detection of fire, accidents, and violent incidents.</li>
            <li><strong>Privacy First:</strong> Strict protocols to ensure only public areas are monitored.</li>
            <li><strong>Rapid Response:</strong> Direct integration with Police and Fire control rooms.</li>
          </ul>

          <h3 className="text-navy-700 font-semibold text-xl mt-8 mb-3">Contact Us</h3>
          <p>
            Department of IT & Communication,<br/>
            Yojana Bhawan, Tilak Marg, C-Scheme,<br/>
            Jaipur, Rajasthan (India)
          </p>
        </div>
      </div>
    </main>
  );
}
