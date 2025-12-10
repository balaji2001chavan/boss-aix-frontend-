import "./globals.css";

export const metadata = {
  title: "BOSS AIX OS",
  description: "AI OS system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}