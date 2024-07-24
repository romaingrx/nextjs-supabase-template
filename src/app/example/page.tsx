import Counter from './counter'

export const metadata = {
  title: 'Example route',
}

export default function Page() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">Example route</h1>
      <Counter />
    </div>
  )
}
