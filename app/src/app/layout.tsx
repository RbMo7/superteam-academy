import type { Metadata, Viewport } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter, JetBrains_Mono } from 'next/font/google';

import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants';
import { Providers } from '@/providers/providers';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ['Solana', 'blockchain', 'education', 'courses', 'credentials', 'Web3'],
  authors: [{ name: 'Superteam' }],
  creator: 'Superteam',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#2f6b3f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#2f6b3f',
          borderRadius: '0.75rem',
        },
        elements: {
          formButtonPrimary: 'bg-[#2f6b3f] hover:bg-[#2f6b3f]/90 text-white shadow-sm',
          card: 'shadow-lg rounded-2xl',
          formFieldInput: 'rounded-lg',
        },
      }}
      afterSignOutUrl="/"
    >
      <html lang="en">
        <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
