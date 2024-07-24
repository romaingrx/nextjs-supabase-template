import fs from 'fs'
import path from 'path'

export async function get_font_as_array_buffer(fontName: string) {
  const fontPath = path.join(process.cwd(), `./assets/fonts/${fontName}`)
  const arrayBuffer = fs.readFileSync(fontPath)
  return arrayBuffer
}
