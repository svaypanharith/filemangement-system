"use client";
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/them/them';
import ClientProvider from '@/provider/ClientProvider';
import I18nProvider from '@/provider/I18nProvider';
import { ReactNode } from 'react';
import './globals.css';

const kantumruy = localFont({
  src: [
    {
      path: '../../public/assets/fonts/KantumruyPro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-kantumruy',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${kantumruy.variable}`}>
      <head>
        <style jsx global>{`
          :root {
            --font-kantumruy: ${kantumruy.style.fontFamily};
          }
          body {
            font-family: var(--font-kantumruy), sans-serif;
          }
        `}</style>
      </head>
      <body className={`${kantumruy.variable} font-sans`}>
        <ClientProvider>
          <I18nProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </I18nProvider>
        </ClientProvider>
      </body>
    </html>
  );
}