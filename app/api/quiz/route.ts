import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { quizAttempts, quizQuestions } from '@/lib/db/schema'
import { and, notInArray, eq } from 'drizzle-orm'

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const history = await db.select({ ids: quizAttempts.answeredQuestionIds }).from(quizAttempts).where(eq(quizAttempts.userId, session.user.id))
  const used = history.flatMap((row) => row.ids ?? [])
  const base = db.select().from(quizQuestions).where(eq(quizQuestions.userId, session.user.id))
  const questions = used.length ? await db.select().from(quizQuestions).where(and(eq(quizQuestions.userId, session.user.id), notInArray(quizQuestions.id, used))).limit(10) : await base.limit(10)
  return NextResponse.json({ questions: questions.sort(() => Math.random() - 0.5).map((question) => ({ ...question, options: [...question.options].sort(() => Math.random() - 0.5) })) })
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json() as { score: number; total: number; questionIds: number[]; weakAreas?: string[] }
  const weakAreas = body.weakAreas ?? []
  const feedback = body.score / Math.max(body.total, 1) >= .8 ? 'Strong performance. Keep reinforcing the concepts you have mastered.' : `Focus next on ${weakAreas.join(', ') || 'the concepts you missed'} with a targeted practice set.`
  const [attempt] = await db.insert(quizAttempts).values({ userId: session.user.id, score: body.score, total: body.total, answeredQuestionIds: body.questionIds, weakAreas, feedback }).returning()
  return NextResponse.json({ attempt, feedback, weakAreas })
}
