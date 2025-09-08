import "./styles/globals.scss";

export const metadata = {
  title: "IBM Consulting Commerce Navigator",
  description: "Product Content Automation Strategy Optimizer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
