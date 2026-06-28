'use client';
import { useState, useRef, useEffect } from 'react';
import { Camera, Image as ImageIcon, RefreshCw } from 'lucide-react';

export default function PhotoCapture({ onPhotoCaptured }: { onPhotoCaptured: (blob: Blob) => void }) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      setCapturedPhotoUrl(url);
      onPhotoCaptured(file);
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: { ideal: 'environment' } },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.warn("Could not access environment camera:", err);
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(fallbackStream);
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
        }
      } catch (fallbackErr: any) {
        console.error("Camera access failed entirely:", fallbackErr);
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
        setCameraError("Camera not found. Select a photo instead.");
      }
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCapturedPhotoUrl(url);
            onPhotoCaptured(blob);
            
            if (stream) {
              stream.getTracks().forEach(track => track.stop());
              setStream(null);
            }
          }
        }, 'image/jpeg', 0.9);
      }
    }
  };

  const retakePhoto = () => {
    setCapturedPhotoUrl(null);
    startCamera();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      <input 
        type="file" 
        accept="image/*" 
        capture="environment"
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
      />
      {!stream && !capturedPhotoUrl && (
        <button
          type="button"
          onClick={startCamera}
          className="h-40 w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center relative group hover:border-blue-500 transition-colors cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
             <ImageIcon className="w-6 h-6 text-blue-800" />
          </div>
          <p className="text-sm font-bold text-gray-700">Take Rear Photo</p>
          <p className="text-[10px] text-gray-400">Vehicle Identification</p>
          {cameraError && (
            <div className="absolute inset-x-2 bottom-2 text-center text-xs font-bold text-red-500 bg-red-50 rounded-full py-1 px-2 border border-red-100">{cameraError}</div>
          )}
        </button>
      )}

      {stream && !capturedPhotoUrl && (
        <div className="relative w-full rounded-2xl overflow-hidden bg-black aspect-[4/3] flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
            <button
              type="button"
              onClick={takePhoto}
              className="w-14 h-14 bg-white/20 backdrop-blur-sm border-4 border-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors group"
            >
              <div className="w-12 h-12 bg-white rounded-full group-hover:scale-95 transition-transform"></div>
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {capturedPhotoUrl && (
        <div className="relative w-full rounded-2xl overflow-hidden bg-black aspect-[4/3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={capturedPhotoUrl}
            alt="Captured vehicle"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={retakePhoto}
            className="absolute top-4 right-4 bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-white flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Retake
          </button>
        </div>
      )}
    </div>
  );
}
