"use client"

import React from "react"

// Password gate styled to match the internal pricing tool's light aesthetic.
// On success the server sets an httpOnly cookie and we reload so the server
// component renders the tool itself (its HTML is never sent until authorized).
export function PricingGate() {
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(false)
    try {
      const res = await fetch("/pricing-tool/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        window.location.reload()
        return
      }
      setError(true)
    } catch {
      setError(true)
    }
    setSubmitting(false)
  }

  return (
    <div className="pt-gate">
      <style>{`
        .pt-gate{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background-color:#F7F9FC;font-family:'Inter',sans-serif;padding:24px;}
        .pt-gate *{box-sizing:border-box;}
        .pt-gate-content{width:100%;max-width:400px;padding:40px;text-align:center;}
        .pt-gate-lock{width:96px;height:96px;opacity:0.2;margin:0 auto 24px auto;display:block;color:#0F1720;}
        .pt-gate h2{color:#0F1720;font-family:'Inter',sans-serif;font-weight:700;font-size:22px;letter-spacing:-0.3px;margin:0 0 4px 0;}
        .pt-gate-sub{color:#6B7280;font-size:14px;margin:0 0 24px 0;}
        .pt-gate label{display:block;text-align:left;color:#6B7280;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;margin-bottom:8px;}
        .pt-gate input[type="password"]{width:100%;background-color:#FFFFFF;border:1px solid #D6DEE6;border-radius:6px;color:#0F1720;font-family:'Inter',sans-serif;font-size:14px;padding:12px 16px;outline:none;transition:border-color .2s,box-shadow .2s;}
        .pt-gate input[type="password"]:focus{border-color:#19AD7D;box-shadow:0 0 0 3px rgba(25,173,125,0.1);}
        .pt-gate input[type="password"]::placeholder{color:#6B7280;}
        .pt-gate button{width:100%;margin-top:16px;background-color:#19AD7D;color:#fff;border:none;border-radius:6px;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;padding:12px 24px;cursor:pointer;transition:background-color .2s;}
        .pt-gate button:hover{background-color:#149067;}
        .pt-gate button:active{background-color:#0F6E4F;}
        .pt-gate button:disabled{opacity:.7;cursor:default;}
        .pt-gate-fail{background-color:rgba(240,68,56,0.1);border:1px solid rgba(240,68,56,0.2);border-radius:6px;color:#F04438;font-size:13px;padding:10px 14px;margin-top:12px;}
      `}</style>
      <div className="pt-gate-content">
        <svg
          className="pt-gate-lock"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <h2>Protected Page</h2>
        <p className="pt-gate-sub">Enter the password to continue.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="pt-password">Password</label>
          <input
            id="pt-password"
            type="password"
            autoFocus
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Checking…" : "Submit"}
          </button>
          {error ? (
            <div className="pt-gate-fail" role="alert">
              Incorrect password. Please try again.
            </div>
          ) : null}
        </form>
      </div>
    </div>
  )
}
