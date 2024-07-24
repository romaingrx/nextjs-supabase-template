import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params
  if (!id) {
    return new NextResponse('No id provided', { status: 400 })
  }

  // Stream response from source
  const response = await fetch(
    `https://source.boringavatars.com/beam/120/${id}`,
  )
  const headers = new Headers(response.headers)
  // Cache response for 1 month
  headers.set('Cache-Control', 'public, max-age=2592000, s-maxage=2592000')
  return new NextResponse(await response.blob(), {
    headers,
  })
}
