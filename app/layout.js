export const metadata = {
  title: "Elite Trader Journal",
  description: "Professional Trading Performance Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        backgroundColor: "#0a0a0a",
        color: "#D4AF37",
        fontFamily: "Arial, sans-serif"
      }}>
        {children}
      </body>
    </html>
  );
}
