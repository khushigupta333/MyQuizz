'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession()
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  if (isPending) return <div className="auth-loading">Loading your workspace…</div>
  if (session?.user) return <>{children}</>
  async function submit(event: FormEvent) {
    event.preventDefault(); setError('')
    const result = mode === 'sign-in' ? await authClient.signIn.email({ email, password }) : await authClient.signUp.email({ email, password, name })
    if (result.error) { setError('Unable to continue. Check your details and try again.'); return }
    router.refresh()
  }
  return <main className="auth-screen"><section className="auth-card"><div className="brand-mark auth-mark">S</div><p className="eyebrow">SAMARTH WORKSPACE</p><h1>{mode === 'sign-in' ? 'Welcome back' : 'Create your workspace'}</h1><p className="auth-copy">Keep every quiz, competency gap, and learning milestone connected to your own profile.</p><form onSubmit={submit} className="auth-form">{mode === 'sign-up' && <label>Name<input value={name} onChange={(e) => setName(e.target.value)} required /></label>}<label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><label>Password<input type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required /></label>{error && <p className="auth-error">{error}</p>}<button className="primary-btn" type="submit">{mode === 'sign-in' ? 'Sign in' : 'Create account'}</button></form><button className="auth-switch" onClick={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')}>{mode === 'sign-in' ? 'New to Samarth? Create an account' : 'Already have an account? Sign in'}</button></section></main>
}
