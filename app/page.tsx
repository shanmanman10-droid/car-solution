import DiagnosisForm from '@/components/DiagnosisForm';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-white text-slate-900 flex flex-col font-sans">
      <nav className="h-16 lg:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-10 flex-shrink-0 z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl lg:text-2xl">F</div>
          <span className="text-xl lg:text-2xl font-extrabold tracking-tight text-gray-900">FixMyCar<span className="text-orange-600">.ae</span></span>
        </div>
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-500">
            <div className="w-5 h-3 bg-red-600 relative overflow-hidden rounded-sm">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-green-700"></div>
            </div>
            United Arab Emirates
          </div>
          <button className="px-5 py-2 hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-full text-sm font-semibold transition-colors">Login</button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col xl:flex-row gap-8 lg:gap-12 p-4 lg:p-10 w-full max-w-7xl mx-auto">
        <div className="w-full xl:w-5/12 flex flex-col justify-center space-y-8 shrink-0 py-4 lg:py-10">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-widest rounded-full">Modern AI Diagnosis</span>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Show Your Car Problem. <br/>
              <span className="text-gray-400">Get Solutions Fast.</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Record a video of the issue, snap a photo of your vehicle, and receive professional troubleshooting from experts across the UAE.
            </p>
          </div>

          <div className="space-y-4 bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm max-w-md">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quick Process</h3>
            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm">1</div>
                <span className="text-sm font-medium text-gray-700">Explain the issue via Video</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm">2</div>
                <span className="text-sm font-medium text-gray-700">Snap vehicle rear photo</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm">3</div>
                <span className="text-sm font-medium text-gray-700">Receive expert diagnosis</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl max-w-md w-fit">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 shrink-0">
               <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-700 uppercase tracking-tight">Secure & Private</p>
              <p className="text-sm text-gray-500">UAE Data Privacy Compliant Interface</p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col h-auto xl:h-[800px] mt-4 xl:mt-0 overflow-hidden">
          <div className="p-5 lg:p-6 bg-white border-b border-gray-100 flex justify-between items-center shrink-0">
            <div>
              <h2 className="text-lg lg:text-xl font-bold text-gray-900">Vehicle Diagnosis Form</h2>
              <p className="text-xs lg:text-sm text-gray-500">Complete your submission in 3 minutes</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto w-full relative">
            <DiagnosisForm />
          </div>
        </div>
      </main>
      
      <footer className="h-16 lg:h-12 border-t border-gray-100 bg-white text-gray-400 text-[10px] flex flex-col lg:flex-row justify-center lg:justify-between items-center px-4 lg:px-10 py-2 lg:py-0 gap-2 uppercase tracking-widest shrink-0">
        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} FixMyCar.ae</span>
          <div className="hidden sm:flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> 1,240 Requests Resolved</div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-gray-900 hidden sm:block transition-colors">Terms</Link>
          <Link href="#" className="hover:text-gray-900 hidden sm:block transition-colors">Privacy</Link>
          <div className="flex items-center gap-2 bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full shrink-0">
            Live Support
          </div>
        </div>
      </footer>
    </div>
  );
}
