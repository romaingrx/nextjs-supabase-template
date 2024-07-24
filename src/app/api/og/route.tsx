import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import puppeteer from 'puppeteer'
import { app_settings } from '@/app_settings'

// export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const title = searchParams.get('title') || app_settings.site_name
  const subtitle = searchParams.get('subtitle')
  const content = searchParams.get('content') || app_settings.site_description
  const with_image = searchParams.get('with_image') ? true : false

  let screenshot_base64: string = ''
  if (with_image) {
    // Launch Puppeteer and take a screenshot of the homepage
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 1440 })
    await page.goto(app_settings.site_url, { waitUntil: 'networkidle2' })
    const screenshot = await page.screenshot({
      path: './public/homepage-screenshot.png',
    })
    screenshot_base64 = screenshot.toString('base64')
    // Save screenshot to public/og.png
    await browser.close()
  }

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          color: 'black',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          backgroundImage:
            'radial-gradient(rgba(0, 0, 0, 0.5) 5%, transparent 10%)',
          backgroundPosition: '0px 0px, 12px 12px',
          backgroundSize: '12px 12px',
          filter: 'blur(0.5px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <div
            style={{
              color: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4rem',
              alignItems: 'center',
              padding: '0 1rem',
            }}
          >
            <span
              style={{
                fontSize: '3rem',
                padding: '0 1rem',
              }}
            >
              {title}
              {subtitle && (
                <span style={{ fontWeight: 'normal' }}> | {subtitle}</span>
              )}
            </span>
            {content && (
              <span
                style={{
                  fontSize: '1.5rem',
                  display: 'flex',
                  padding: '0 1rem',
                  fontWeight: 'light',
                }}
              >
                {content}
              </span>
            )}
          </div>
        </div>
        {with_image && (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              height: '100%',
              flex: 1,
            }}
          >
            <img
              src={`data:image/png;base64,${screenshot_base64}`}
              alt="Homepage Screenshot"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: '10%',
                left: 0,
                zIndex: -1,
              }}
            />
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  )
}
