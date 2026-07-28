import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "부산 해수욕장 성향 테스트",
  description: "다섯 가지 취향으로 나와 꼭 맞는 부산 해수욕장을 찾아보세요.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
