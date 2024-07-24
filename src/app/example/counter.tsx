'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="text-2xl font-bold">{count}</span>
      <Button
        onClick={() => setCount(count + 1)}
        variant={'outline'}
        className="flex items-center gap-2"
      >
        <PlusIcon className="h-4 w-4" />
        Increment
      </Button>
    </div>
  )
}
