"use client"

import React from "react"

// Password gate styled to match the internal pricing tool's brand aesthetic:
// the same warm canvas with green radial glows, Enzy logo + badge, IvyOra serif
// heading, and green button states. Fonts come from the global next/font tokens
// (--font-inter / --font-ivyora) so they match the tool exactly. On success the
// server sets an httpOnly cookie and we reload so the server component renders
// the tool itself (its HTML is never sent until authorized).
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
        .pt-gate{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;
          background-color:#FAF9F6;
          background-image:radial-gradient(900px 520px at 80% -10%,rgba(25,173,125,.10),transparent 60%),radial-gradient(720px 480px at -5% 105%,rgba(25,173,125,.06),transparent 55%);
          font-family:var(--font-inter,'Inter',sans-serif);-webkit-font-smoothing:antialiased;}
        .pt-gate *{box-sizing:border-box;}
        .pt-gate-card{position:relative;width:100%;max-width:420px;background:#FFFFFF;border:1px solid rgba(11,15,20,0.10);border-radius:24px;padding:40px 36px 28px;text-align:center;box-shadow:0 18px 50px -20px rgba(25,173,125,.35),0 1px 3px rgba(11,15,20,0.06);}
        .pt-gate-logo{height:24px;width:auto;display:block;margin:0 auto 18px auto;color:#0B0F14;}
        .pt-gate-badge{display:inline-block;background:rgba(25,173,125,0.08);color:#19AD7D;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:24px;}
        .pt-gate-lock{width:44px;height:44px;border-radius:12px;background:rgba(25,173,125,0.14);color:#19AD7D;display:flex;align-items:center;justify-content:center;margin:0 auto 16px auto;}
        .pt-gate-lock svg{width:21px;height:21px;}
        .pt-gate-card h2{color:#0B0F14;font-family:var(--font-ivyora,Georgia,serif);font-weight:500;font-size:28px;line-height:1.1;letter-spacing:-.5px;margin:0 0 6px 0;}
        .pt-gate-sub{color:#6B7280;font-size:14px;margin:0 0 24px 0;}
        .pt-gate label{display:block;text-align:left;color:#4B5563;font-size:13px;font-weight:500;margin-bottom:8px;}
        .pt-gate input[type="password"]{width:100%;background:#FFFFFF;border:1px solid rgba(11,15,20,0.10);border-radius:10px;color:#0B0F14;font-family:inherit;font-size:14px;font-weight:500;padding:12px 14px;outline:none;transition:border-color .2s,box-shadow .2s;}
        .pt-gate input[type="password"]:focus{border-color:#19AD7D;box-shadow:0 0 0 3px rgba(25,173,125,0.10);}
        .pt-gate input[type="password"]::placeholder{color:#9AA3AD;}
        .pt-gate button{width:100%;margin-top:18px;background:#19AD7D;color:#fff;border:none;border-radius:10px;font-family:inherit;font-size:14px;font-weight:600;padding:13px 24px;cursor:pointer;transition:background-color .2s,transform .15s,box-shadow .2s;box-shadow:0 10px 26px -14px rgba(25,173,125,.6);}
        .pt-gate button:hover{background:#149067;transform:translateY(-1px);}
        .pt-gate button:active{background:#0F6E4F;transform:translateY(0);}
        .pt-gate button:disabled{opacity:.7;cursor:default;transform:none;}
        .pt-gate-fail{background:rgba(240,68,56,0.10);border:1px solid rgba(240,68,56,0.22);border-radius:10px;color:#F04438;font-size:13px;padding:10px 14px;margin-top:14px;}
        .pt-gate-foot{margin-top:24px;padding-top:16px;border-top:1px solid rgba(11,15,20,0.10);font-size:11px;color:#9AA3AD;letter-spacing:.2px;}
      `}</style>
      <div className="pt-gate-card">
        <svg
          className="pt-gate-logo"
          viewBox="0 0 2878.98 1000"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Enzy"
          fill="currentColor"
        >
          <polygon points="1975.1 754.99 1975.1 875.68 1368.21 875.68 1368.21 786.97 1766.19 245.89 1368.75 245.89 1368.75 124.67 1966.9 124.67 1966.9 210.82 1571.32 754.99 1975.1 754.99" />
          <path d="M2225.41,124.68l166.22,342.5,166.2-342.5h178.79l-261.89,477.64v273.37h-166.2v-273.37l-262.43-477.64h179.32Z" />
          <path d="M693.23,549.96h-397.6l.17,190.64h397.6v135.08H142.36V124.31h551.04v133.04h-397.6v159.55h397.6l-.17,133.05Z" />
          <polygon points="843.54 874.57 843.94 392.38 1218.58 875.5 843.54 874.57" />
          <polygon points="1218.58 125.43 1218.58 606.69 843.02 124.5 1218.58 125.43" />
        </svg>
        <span className="pt-gate-badge">Internal Pricing Tool</span>
        <div className="pt-gate-lock" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
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
            {submitting ? "Checking…" : "Unlock pricing tool"}
          </button>
          {error ? (
            <div className="pt-gate-fail" role="alert">
              Incorrect password. Please try again.
            </div>
          ) : null}
        </form>
        <div className="pt-gate-foot">Enzy Confidential · Internal use only</div>
      </div>
    </div>
  )
}
