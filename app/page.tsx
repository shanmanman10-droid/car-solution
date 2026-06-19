import DiagnosisForm from '@/components/DiagnosisForm';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="h-screen bg-slate-50 text-slate-900 flex flex-col overflow-hidden font-sans">
      <nav className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">F</div>
          <span className="text-2xl font-extrabold tracking-tight text-blue-900">FixMyCar<span className="text-orange-600">.ae</span></span>
        </div>
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-600">
            <div className="w-5 h-3 bg-red-600 relative overflow-hidden rounded-sm">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-green-700"></div>
            </div>
            United Arab Emirates
          </div>
          <button className="px-5 py-2 bg-blue-900 text-white rounded-full text-sm font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-colors">Login</button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row gap-10 p-6 lg:p-10 overflow-y-auto">
        <div className="w-full lg:w-2/5 flex flex-col justify-center space-y-10 shrink-0">
          <div className="space-y-4">
            <span className="px-4 py-1 bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full">Modern AI Diagnosis</span>
            <h1 className="text-4xl sm:text-5xl lg:text-[2.8rem] xl:text-5xl font-extrabold text-blue-950 leading-tight">
              Show Your Car Problem. <br/>
              <span className="text-orange-600">Get Solutions Fast.</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Record a video of the issue, snap a photo of your vehicle, and receive professional troubleshooting from experts across the UAE.
            </p>
          </div>

          <div className="space-y-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm max-w-md">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-3">Quick Process</h3>
            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold">1</div>
                <span className="text-sm font-medium">Explain the issue via Video</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold">2</div>
                <span className="text-sm font-medium">Snap vehicle rear photo</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold">3</div>
                <span className="text-sm font-medium">Receive expert diagnosis</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border border-green-100 max-w-md w-fit">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
               <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-green-800 uppercase tracking-tight">Secure & Private</p>
              <p className="text-sm text-green-700">UAE Data Privacy Compliant Interface</p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-[40px] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden flex flex-col min-h-[600px] h-full sm:h-auto">
          <div className="p-6 lg:p-8 bg-slate-50 border-b flex justify-between items-center shrink-0">
            <div>
              <h2 className="text-xl font-bold text-blue-950">Vehicle Diagnosis Form</h2>
              <p className="text-sm text-slate-500">Complete your submission in 3 minutes</p>
            </div>
            <div className="hidden sm:flex gap-1">
              <div className="w-8 h-1 bg-blue-900 rounded-full"></div>
              <div className="w-8 h-1 bg-blue-900 rounded-full"></div>
              <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden relative">
            <DiagnosisForm />
          </div>
        </div>
      </main>
      
      <footer className="h-12 bg-blue-950 text-white/60 text-[10px] flex items-center px-6 lg:px-10 gap-4 lg:gap-8 uppercase tracking-widest shrink-0 overflow-x-auto whitespace-nowrap">
        <span>&copy; {new Date().getFullYear()} FixMyCar.ae</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> 1,240 Requests Resolved</div>
          <div className="hidden md:flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> 42 Experts Online</div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Link href="#" className="hover:text-white hidden sm:block">Terms</Link>
          <Link href="#" className="hover:text-white hidden sm:block">Privacy</Link>
          <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.847 1.706 5.461l-.957 3.498 3.734-.96zm11.367-7.854c-.327-.164-1.938-.957-2.239-1.067-.301-.11-.521-.164-.74.164-.221.328-.849 1.067-1.041 1.286-.192.219-.384.247-.712.083-.327-.164-1.382-.509-2.633-1.625-.973-.867-1.63-1.94-1.821-2.268-.192-.328-.021-.505.143-.668.148-.146.327-.384.492-.576.164-.192.219-.328.328-.548.11-.219.055-.411-.027-.575-.082-.164-.74-1.785-1.013-2.441-.267-.639-.539-.553-.74-.563-.19-.011-.41-.012-.629-.012-.22 0-.575.083-.876.411-.3.328-1.15 1.123-1.15 2.739 0 1.616 1.177 3.177 1.341 3.396.164.219 2.316 3.536 5.611 4.96.783.338 1.395.541 1.872.693.788.251 1.505.216 2.073.131.632-.094 1.938-.792 2.212-1.559.273-.767.273-1.424.192-1.559-.082-.137-.3-.22-.627-.383z"/></svg>
            Live Support
          </div>
        </div>
      </footer>
    </div>
  );
}
