'use client';
import { useState, useRef, useEffect } from 'react';
import { Video, Square, RefreshCw } from 'lucide-react';

export default function VideoRecorder({ onVideoRecorded }: { onVideoRecorded: (blob: Blob) => void }) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRecordedVideoUrl(url);
      onVideoRecorded(file);
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: { ideal: 'environment' } }, 
        audio: true 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error("Error accessing camera/microphone:", err);
      // Fallback to file upload immediately if camera fails
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
      setCameraError("Camera not found. Select a video file instead.");
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
      <input 
        type="file" 
        accept="video/*" 
        capture="environment"
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
      />
      {!stream && !recordedVideoUrl && (
        <button
          type="button"
          onClick={startCamera}
          className="h-40 w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center relative group hover:border-orange-500 transition-colors cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
             <Video className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-sm font-bold text-gray-700">Record Video</p>
          <p className="text-[10px] text-gray-400">Max 3 minutes</p>
          {cameraError && (
            <div className="absolute inset-x-2 bottom-2 text-center text-xs font-bold text-red-500 bg-red-50 rounded-full py-1 px-2 border border-red-100">{cameraError}</div>
          )}
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
            className="absolute top-4 right-4 bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-white flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Retake
          </button>
        </div>
      )}
    </div>
  );
}
