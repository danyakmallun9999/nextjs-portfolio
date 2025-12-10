'use client'


export default function LayoutProjects({
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