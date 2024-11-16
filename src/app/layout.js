import "./globals.scss";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Inter } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Commit",
  description: "Real commitments for real events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`dark h-screen flex flex-col ${inter.className}`}>
        <Header />
        <div className="max-w-6xl w-full mx-auto py-10 px-4 md:px-6 flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
