import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/navbar/navbar";
import { profileContent } from "@/data/profile";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://gauravkumar62024.github.io/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: profileContent.siteTitle,
    template: `%s | ${profileContent.hero.name}`,
  },
  description: profileContent.siteDescription,
  keywords: [
    "NLP researcher",
    "fact-checking",
    "multimodal NLP",
    "LLM reasoning",
    "misinformation detection",
    "IISER Bhopal",
  ],
  authors: [{ name: profileContent.hero.name }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: profileContent.hero.name,
    title: profileContent.siteTitle,
    description: profileContent.siteDescription,
    images: [
      {
        url: "/gaurav.jpg",
        width: 1200,
        height: 630,
        alt: `${profileContent.hero.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: profileContent.siteTitle,
    description: profileContent.siteDescription,
    images: ["/gaurav.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${manrope.variable} ${sourceSerif.variable} antialiased`}>
        <ThemeProvider>
          <div className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
            <Navbar />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
