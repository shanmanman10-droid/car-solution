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
        <h3 className="text-2xl font-bold text-gray-900">Request Received!</h3>
        <p className="text-gray-500">Your vehicle diagnosis request has been received successfully.</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-colors">Submit Another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full w-full">
      <div className="p-5 lg:p-8 space-y-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Mobile Number *</label>
              <input required type="tel" value={mobileNumber} onChange={e=>setMobileNumber(e.target.value)} placeholder="+971 50 123 4567" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase">UAE City *</label>
              <select required value={city} onChange={e=>setCity(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all">
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Car Make *</label>
              <input required type="text" value={carMake} onChange={e=>setCarMake(e.target.value)} placeholder="e.g. Nissan" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Car Model *</label>
              <input required type="text" value={carModel} onChange={e=>setCarModel(e.target.value)} placeholder="e.g. Patrol" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase">VIN Number</label>
              <input type="text" value={vinNumber} onChange={e=>setVinNumber(e.target.value)} placeholder="Optional" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" />
            </div>
          </div>

          <div className="space-y-8 lg:space-y-6">
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Issue Video *</label>
              <VideoRecorder onVideoRecorded={setVideoBlob} />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Vehicle Photo *</label>
              <PhotoCapture onPhotoCaptured={setPhotoBlob} />
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 lg:p-8 pt-6 mt-auto shrink-0 border-t border-gray-100">
        {user ? (
          <button disabled={isSubmitting} type="submit" className="w-full py-4 lg:py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 disabled:opacity-70">
            {isSubmitting ? 'Processing...' : 'Submit for Diagnosis'}
          </button>
        ) : (
          <button type="button" onClick={signIn} className="w-full py-4 lg:py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-3">
            Sign in with Google to Submit
          </button>
        )}
        <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest">By submitting, you agree to our Terms & UAE GDPR Data Privacy rules.</p>
      </div>
    </form>
  );
}
