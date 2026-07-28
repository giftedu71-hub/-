import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "busan-beach-match.workspace-925535.chatgpt.site";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = `${protocol}://${host}`;
  const description = "다섯 가지 취향으로 나와 꼭 맞는 부산 해수욕장을 찾아보세요.";

  return {
    metadataBase: new URL(origin),
    title: "부산 해수욕장 성향 테스트",
    description,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "부산 해수욕장 성향 테스트",
      description,
      type: "website",
      url: origin,
      images: [
        {
          url: `${origin}/og.png`,
          width: 1536,
          height: 1024,
          alt: "부산 해수욕장 성향 테스트와 여섯 바다 동물 유형",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "부산 해수욕장 성향 테스트",
      description,
      images: [`${origin}/og.png`],
    },
  };
}

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
