import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/them/them';
import ClientProvider from '@/provider/ClientProvider';
import I18nProvider from '@/provider/I18nProvider';
import { ReactNode } from 'react';
import './globals.css';

const poppins = localFont({
  src: "../../public/assets/fonts/KantumruyPro-Regular.ttf",
  variable: "--font-poppins",
  weight: "400",
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "StudySesh",
//   description: "StudySesh",
//   icons: {
//     icon: "/logo.png",
//   },
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body>
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
