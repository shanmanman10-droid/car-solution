import type {Metadata} from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

export const metadata: Metadata = {
  title: 'FixMyCar.ae | Online Car Problem Diagnosis in UAE',
  description: 'Record a video of your car issue, upload a vehicle photo, and get fast professional troubleshooting assistance anywhere in the UAE.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
