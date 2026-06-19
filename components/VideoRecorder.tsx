'use client';
import { useState, useRef, useEffect } from 'react';
import { Video, Square, RefreshCw } from 'lucide-react';

export default function VideoRecorder({ onVideoRecorded }: { onVideoRecorded: (blob: Blob) => void }) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please ensure permissions are granted.");
    }
  };

  const startRecording = () => {
    if (!stream) return;
    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedVideoUrl(url);
      onVideoRecorded(blob);
      
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const retakeVideo = () => {
    setRecordedVideoUrl(null);
    startCamera();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      {!stream && !recordedVideoUrl && (
        <button
          type="button"
          onClick={startCamera}
          className="h-40 w-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center group hover:border-orange-500 transition-colors cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
             <Video className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-sm font-bold text-slate-700">Record Video</p>
          <p className="text-[10px] text-slate-400">Max 3 minutes</p>
        </button>
      )}

      {stream && !recordedVideoUrl && (
        <div className="relative w-full rounded-2xl overflow-hidden bg-black aspect-[4/3] flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className="w-14 h-14 bg-white/20 backdrop-blur-sm border-4 border-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                <div className="w-6 h-6 bg-red-600 rounded-full"></div>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className="w-14 h-14 bg-white/20 backdrop-blur-sm border-4 border-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors animate-pulse"
              >
                <Square className="w-5 h-5 text-red-600 fill-current" />
              </button>
            )}
          </div>
          {isRecording && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></div>
              <span className="text-xs font-bold text-white uppercase tracking-widest">Recording</span>
            </div>
          )}
        </div>
      )}

      {recordedVideoUrl && (
        <div className="relative w-full rounded-2xl overflow-hidden bg-black aspect-[4/3]">
          <video
            src={recordedVideoUrl}
            controls
            playsInline
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={retakeVideo}
            className="absolute top-4 right-4 bg-white/90 text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-white flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Retake
          </button>
        </div>
      )}
    </div>
  );
}
