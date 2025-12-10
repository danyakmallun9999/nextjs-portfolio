'use client'


export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="mt-2 pb-20">
        {children}
      </main>
    </>
  )
} 