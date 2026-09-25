import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Edukando — Tudo o que a sua escola precisa. Em um só lugar.',
  description:
    'Plataforma educacional que conecta direção, professores, famílias e alunos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
