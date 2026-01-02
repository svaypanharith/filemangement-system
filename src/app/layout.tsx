import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import I18nProvider from "@/provider/I18nProvider";
import { SnackBarAppToaster } from "@/hooks/usesnack-bar";
import LoadLanguageProvider from "@/provider/LoadLanguageProvider";
import ClientProvider from "@/provider/ClientProvider";
import { AuthProvider } from "@/provider/AuthProvider";
import { ThemeProvider } from "@/provider/ThemProvider";

const poppins = localFont({
  src: "../../public/assets/fonts/KantumruyPro-Regular.ttf",
  variable: "--font-poppins",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EKASA",
  description: "EKASA",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ClientProvider>
            <I18nProvider>
              <LoadLanguageProvider>
                <AuthProvider>
                  {children}</AuthProvider>
              </LoadLanguageProvider>
            </I18nProvider>
          </ClientProvider>
        </ThemeProvider>

        <SnackBarAppToaster />
      </body>
    </html>
  );
}