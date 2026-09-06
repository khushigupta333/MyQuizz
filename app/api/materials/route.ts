import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { materials } from '@/lib/db/schema'

const allowed = new Set(['application/pdf','text/plain','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.presentationml.presentation'])
export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const formData = await request.formData(); const files = formData.getAll('files').filter((value): value is File => value instanceof File)
  if (!files.length || files.length > 20) return NextResponse.json({ error: 'Upload up to 20 files.' }, { status: 400 })
  const saved = []
  for (const file of files) {
    if (!allowed.has(file.type) || file.size > 25 * 1024 * 1024) continue
    const blob = await put(`materials/${session.user.id}/${crypto.randomUUID()}-${file.name}`, file, { access: 'private' })
    const [row] = await db.insert(materials).values({ userId: session.user.id, filename: file.name, pathname: blob.pathname, mimeType: file.type, size: file.size }).returning()
    saved.push(row)
  }
  return NextResponse.json({ materials: saved })
}
