'use client';
import { useState } from 'react';
import VideoRecorder from './VideoRecorder';
import PhotoCapture from './PhotoCapture';
import { useAuth } from './AuthProvider';

const CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain'];

export default function DiagnosisForm() {
  const { user, signIn } = useAuth();
  
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState(CITIES[0]);
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [vinNumber, setVinNumber] = useState('');
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold text-slate-800">Request Received!</h3>
        <p className="text-slate-600">Your vehicle diagnosis request has been received successfully.</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-6 py-3 bg-blue-900 text-white rounded-full font-bold">Submit Another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full w-full">
      <div className="p-6 lg:p-8 space-y-8 flex-1 overflow-y-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Mobile Number *</label>
              <input required type="tel" value={mobileNumber} onChange={e=>setMobileNumber(e.target.value)} placeholder="+971 50 123 4567" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-900 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase">UAE City *</label>
              <select required value={city} onChange={e=>setCity(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-900 outline-none transition-all">
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Car Make *</label>
              <input required type="text" value={carMake} onChange={e=>setCarMake(e.target.value)} placeholder="e.g. Nissan" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-900 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Car Model *</label>
              <input required type="text" value={carModel} onChange={e=>setCarModel(e.target.value)} placeholder="e.g. Patrol" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-900 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase">VIN Number</label>
              <input type="text" value={vinNumber} onChange={e=>setVinNumber(e.target.value)} placeholder="Optional" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-900 outline-none transition-all" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Issue Video *</label>
              <VideoRecorder onVideoRecorded={setVideoBlob} />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Vehicle Photo *</label>
              <PhotoCapture onPhotoCaptured={setPhotoBlob} />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8 pt-0 mt-auto shrink-0 border-t border-slate-100 pt-4">
        {user ? (
          <button disabled={isSubmitting} type="submit" className="w-full py-5 bg-blue-950 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/30 hover:bg-blue-900 transition-colors flex items-center justify-center gap-3 disabled:opacity-70">
            {isSubmitting ? 'Processing...' : 'Submit for Diagnosis'}
          </button>
        ) : (
          <button type="button" onClick={signIn} className="w-full py-5 bg-blue-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/30 hover:bg-blue-800 transition-colors flex items-center justify-center gap-3">
            Sign in with Google to Submit
          </button>
        )}
        <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">By submitting, you agree to our Terms & UAE GDPR Data Privacy rules.</p>
      </div>
    </form>
  );
}
