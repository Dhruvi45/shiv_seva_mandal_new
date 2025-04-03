// app/(default)/layout.tsx
import Header from '@/components/header'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}