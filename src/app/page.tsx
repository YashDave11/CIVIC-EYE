import Navbar from "@/components/Navbar";
import { Video, Lock, Building2, Check, Landmark, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* 2. HERO SECTION */}
        <section className="bg-white pt-20 pb-24 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-medium text-navy-800 tracking-tight mb-6 leading-tight">
              Civic Eye: Smart Surveillance
              <br className="hidden md:block" />
              for Safer Cities
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
              A government initiative to connect private CCTV cameras with local
              authorities for enhanced public safety.
            </p>

            <div className="flex flex-col items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center bg-navy-800 hover:bg-navy-900 text-white text-base font-medium py-3 px-8 rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-800"
              >
                Go to Dashboard (Demo)
              </Link>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-4">
                A Smart Cities Mission Initiative
              </span>
            </div>
          </div>
        </section>

        {/* 3. THREE-COLUMN BENEFITS */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white border border-slate-200 rounded-lg p-8 flex flex-col items-center text-center h-full">
                <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center mb-6 border border-navy-100">
                  <Video className="w-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-3 tracking-tight">
                  For Camera Owners
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Share your existing CCTV feed with authorities. Simple
                  registration process.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-200 rounded-lg p-8 flex flex-col items-center text-center h-full">
                <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center mb-6 border border-navy-100">
                  <Lock className="w-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-3 tracking-tight">
                  Privacy Protected
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  You control access permissions. All footage handling follows
                  government data protection guidelines.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-slate-200 rounded-lg p-8 flex flex-col items-center text-center h-full">
                <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center mb-6 border border-navy-100">
                   <Building2 className="w-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-3 tracking-tight">
                  For Authorities
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Access shared camera feeds for emergency response and
                  investigations through secure dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS */}
        <section className="bg-white py-20 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-navy-800 text-center mb-16 tracking-tight">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-px bg-slate-200 -z-10"></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white border-2 border-navy-800 text-navy-800 rounded-full flex items-center justify-center text-lg font-medium mb-6">
                  1
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Register</h3>
                <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                  Camera owners register their CCTV details online.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white border-2 border-navy-800 text-navy-800 rounded-full flex items-center justify-center text-lg font-medium mb-6">
                  2
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Connect</h3>
                <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                  Technical team verifies and connects your camera to the
                  platform.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white border-2 border-navy-800 text-navy-800 rounded-full flex items-center justify-center text-lg font-medium mb-6">
                  3
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Monitor</h3>
                <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
                  Authorities can access feeds during emergencies with proper
                  authorization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. INFO SECTION */}
        <section className="bg-slate-50 py-20 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left: About */}
              <div>
                <h3 className="text-xl font-medium text-navy-800 mb-6 tracking-tight">
                  About the Platform
                </h3>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  Civic Eye is a Smart Cities Mission initiative to create a
                  unified surveillance network by connecting existing private CCTV
                  cameras with city authorities. This platform enhances public
                  safety coverage while maintaining strict privacy controls and
                  data protection standards.
                </p>
              </div>

              {/* Right: Features */}
              <div>
                <h3 className="text-xl font-medium text-navy-800 mb-6 tracking-tight">
                  Key Features
                </h3>
                <ul className="space-y-4">
                  {[
                    "Secure cloud storage",
                    "72-hour footage retention",
                    "Role-based access control",
                    "Audit trail logging",
                    "DPDP Act compliant",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-emerald-600 mt-1 mr-3 flex-shrink-0 w-4" strokeWidth={1.5} />
                      <span className="text-base text-slate-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

         {/* 6. CALL TO ACTION */}
       <section className="bg-white py-24 border-t border-slate-200">
         <div className="max-w-3xl mx-auto px-4 text-center">
           <h2 className="text-3xl font-medium text-navy-800 mb-4 tracking-tight">
             Register Your Camera Today
           </h2>
           <p className="text-lg text-slate-500 mb-8 font-normal">
             Help make your city safer.
           </p>
           <a href="#" className="inline-flex items-center justify-center bg-navy-800 hover:bg-navy-900 text-white text-base font-medium py-3 px-8 rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-800">
             Register Now
           </a>
         </div>
       </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-4">
                <Landmark className="text-navy-800 w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium text-navy-800 tracking-tight">
                  CIVIC EYE
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                A collaborative initiative for smarter surveillance and safer
                communities.
              </p>
            </div>

            <div className="flex flex-col md:items-center">
              <div className="flex flex-col space-y-3">
                <Link href="/about" className="text-sm text-slate-600 hover:text-navy-800 hover:underline">About Us</Link>
                <Link href="/privacy" className="text-sm text-slate-600 hover:text-navy-800 hover:underline">Privacy Policy</Link>
              </div>
            </div>

            <div className="flex flex-col md:items-end">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4" strokeWidth={1.5} />
                  <span>support@civiceye.gov.in</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="w-4" strokeWidth={1.5} />
                  <span>1800-11-2233 (Toll Free)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
