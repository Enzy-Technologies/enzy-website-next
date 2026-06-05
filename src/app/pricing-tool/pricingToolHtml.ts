// Internal pricing/quoting tool. Rendered verbatim inside an isolated iframe so
// its bespoke styles, theme toggle, and scripts never collide with the marketing
// site's global shell. Edit this string to update the tool itself.
export const PRICING_TOOL_HTML = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Enzy Pricing</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root {
--bg:#FAF9F6;--surface:#FFFFFF;--card:#FFFFFF;--card-tint:rgba(25,173,125,0.035);--border:rgba(11,15,20,0.10);
--text:#0B0F14;--text-sec:#4B5563;--text-mut:#6B7280;
--green:#19AD7D;--green-hov:#149067;--green-press:#0F6E4F;--green-glow:#19AD7D;
--green-dim:rgba(25,173,125,0.08);--green-soft:rgba(25,173,125,0.14);
--warn:#F4B740;--warn-dim:rgba(244,183,64,0.1);--error:#F04438;--info:#22D3EE;
--shadow-sm:0 1px 3px rgba(11,15,20,0.05);--shadow-md:0 8px 30px rgba(11,15,20,0.08);
--radius:14px;--radius-sm:10px;--radius-lg:24px;
}
[data-theme="dark"] {
--bg:#0B0F14;--surface:#0F141B;--card:rgba(255,255,255,0.035);--card-tint:rgba(25,173,125,0.05);--border:rgba(255,255,255,0.10);
--text:#F5F7FA;--text-sec:#A3ADB8;--text-mut:#6B7684;
--green:#19AD7D;--green-hov:#149067;--green-press:#0F6E4F;--green-glow:#3CD9A3;
--green-dim:rgba(25,173,125,0.12);--green-soft:rgba(25,173,125,0.2);
--warn:#F4B740;--warn-dim:rgba(244,183,64,0.12);--error:#F04438;--info:#22D3EE;
--shadow-sm:0 1px 3px rgba(0,0,0,0.3);--shadow-md:0 8px 30px rgba(0,0,0,0.4);
}
@font-face{font-family:'IvyOra Text';src:url('/fonts/IvyOraText-Regular.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'IvyOra Text';src:url('/fonts/IvyOraText-Medium.woff2') format('woff2');font-weight:500;font-style:normal;font-display:swap}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);line-height:1.5;-webkit-font-smoothing:antialiased;min-height:100vh;position:relative}
body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;background:radial-gradient(900px 520px at 80% -10%,rgba(25,173,125,.10),transparent 60%),radial-gradient(720px 480px at -5% 105%,rgba(25,173,125,.06),transparent 55%)}
.header,.app{position:relative;z-index:1}
*{transition:background-color .2s,border-color .2s,color .2s,filter .2s,opacity .2s,box-shadow .2s,transform .2s}
.header{background:color-mix(in srgb,var(--bg) 78%,transparent);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:16px 40px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
.logo{display:flex;align-items:center}
.logo-img{height:22px;width:auto;display:block;color:var(--text)}
.header-right{display:flex;align-items:center;gap:16px}
.badge{background:var(--green-dim);color:var(--green);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.header-label{color:var(--text-mut);font-size:13px}
.theme-toggle{width:52px;height:28px;background:var(--border);border-radius:14px;position:relative;cursor:pointer;transition:background .3s;border:none;padding:0;flex-shrink:0}
.theme-toggle .knob{width:24px;height:24px;background:var(--text);border-radius:50%;position:absolute;top:2px;left:2px;transition:transform .3s,background .3s;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,.3)}
.theme-toggle .knob svg{color:var(--bg);width:14px;height:14px;transition:opacity .3s}
.theme-toggle .sun{display:block}.theme-toggle .moon{display:none}
.theme-toggle.dark .knob{transform:translateX(24px)}
.theme-toggle.dark .sun{display:none}.theme-toggle.dark .moon{display:block}
.theme-toggle-wrap{display:flex;align-items:center;gap:6px}
.app{display:grid;grid-template-columns:1fr 420px;max-width:1440px;margin:0 auto;min-height:calc(100vh - 57px)}
.config-panel{padding:32px 40px 80px;overflow-y:auto}
.summary-panel{background:var(--surface);border-left:1px solid var(--border);padding:32px 28px 80px;position:sticky;top:57px;height:calc(100vh - 57px);overflow-y:auto}
.section{margin-bottom:36px}
.section-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.2px;color:var(--green);margin-bottom:10px}
.section-title{font-family:'IvyOra Text',Georgia,serif;font-size:30px;font-weight:500;margin-bottom:4px;color:var(--text);letter-spacing:-.5px;line-height:1.1}
.section-desc{font-size:14px;color:var(--text-sec);margin-bottom:20px}
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:22px 24px;box-shadow:var(--shadow-sm)}
.input-row{display:flex;align-items:center;gap:16px}
.input-row+.input-row{margin-top:16px}
.input-row label{font-size:14px;font-weight:500;min-width:140px;color:var(--text-sec)}
.input-row input[type="number"],.input-row select{flex:1;max-width:200px;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--text);background:var(--surface);outline:none}
.input-row input:focus,.input-row select:focus{border-color:var(--green);box-shadow:0 0 0 3px var(--green-dim)}
.input-row select option{background:var(--surface);color:var(--text)}
.input-hint{font-size:12px;color:var(--text-mut);font-weight:500}
.module-card{background:var(--card);border:1.5px solid var(--border);border-radius:var(--radius-lg);padding:18px 22px;cursor:pointer;transition:all .2s;user-select:none;box-shadow:var(--shadow-sm)}
.module-card:hover{border-color:var(--green);transform:translateY(-1px)}
.module-card.always-on,.module-card.selected{border-color:var(--green);background:var(--green-dim)}
.module-card+.module-card{margin-top:10px}
.module-header{display:flex;align-items:center;justify-content:space-between}
.module-name{font-size:15px;font-weight:600;display:flex;align-items:center;gap:10px;color:var(--text)}
.module-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px}
.core-icon{background:rgba(59,130,246,.15)}.sell-icon{background:rgba(244,183,64,.15)}.recruit-icon{background:rgba(25,173,125,.15)}.weather-icon{background:rgba(99,102,241,.15)}.ai-icon{background:rgba(168,85,247,.15)}.coach-icon{background:rgba(34,211,238,.15)}
.always-label{font-size:10px;color:var(--green);font-weight:700;text-transform:uppercase;letter-spacing:.6px}
.module-features{margin-top:12px;display:flex;flex-wrap:wrap;gap:6px}
.feature-chip{font-size:11px;color:var(--text-mut);background:var(--surface);padding:3px 10px;border-radius:20px;border:1px solid var(--border)}
.module-card.selected .feature-chip,.module-card.always-on .feature-chip{background:var(--green-soft);color:var(--green);border-color:transparent}
.toggle{width:40px;height:22px;background:var(--border);border-radius:11px;position:relative;cursor:pointer;transition:background .25s;flex-shrink:0}
.toggle.on{background:var(--green)}
.toggle::after{content:'';width:16px;height:16px;background:#fff;border-radius:50%;position:absolute;top:3px;left:3px;transition:transform .25s;box-shadow:0 1px 3px rgba(0,0,0,.3)}
.toggle.on::after{transform:translateX(18px)}
.sell-addons{overflow:hidden;max-height:0;opacity:0;transition:max-height .3s ease,opacity .25s ease,margin .3s ease;margin-top:0;padding:0 42px 0 42px;display:flex;flex-direction:column;gap:6px}
.sell-addons.open{max-height:300px;opacity:1;margin-top:12px}
.sell-addon{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:12px 16px;cursor:pointer;user-select:none;display:flex;align-items:center;justify-content:space-between}
.sell-addon:hover{border-color:var(--text-mut)}
.sell-addon.selected{border-color:var(--green);background:var(--green-dim)}
.sell-addon+.sell-addon{margin-top:6px}
.sell-addon-left{display:flex;align-items:center;gap:8px}
.sell-addon-name{font-size:13px;font-weight:500;color:var(--text)}
.sell-addon-right{display:flex;align-items:center;gap:8px}
.tbd-badge{font-size:9px;font-weight:700;color:var(--warn);background:var(--warn-dim);padding:2px 7px;border-radius:4px;text-transform:uppercase;letter-spacing:.5px}
.sell-addon .toggle{width:34px;height:18px;border-radius:9px}
.sell-addon .toggle::after{width:14px;height:14px;top:2px;left:2px}
.sell-addon .toggle.on::after{transform:translateX(16px)}
.summary-header{margin-bottom:24px}
.summary-header h2{font-family:'Inter',sans-serif;font-size:17px;font-weight:700;color:var(--text)}
.summary-header p{font-size:13px;color:var(--text-mut);margin-top:3px}
.price-hero{text-align:center;padding:30px 20px;background:linear-gradient(155deg,#0F6E4F,#149067 45%,#19AD7D);border-radius:var(--radius-lg);color:#fff;margin-bottom:16px;position:relative;overflow:hidden;box-shadow:0 14px 40px -12px rgba(25,173,125,.55)}
.price-hero::before{content:'';position:absolute;top:-50%;right:-25%;width:220px;height:220px;background:rgba(255,255,255,.06);border-radius:50%}
.price-hero-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;opacity:.85;margin-bottom:8px}
.price-hero-value{font-family:'IvyOra Text',Georgia,serif;font-size:52px;font-weight:400;line-height:1;position:relative;z-index:1;letter-spacing:-1px}
.price-hero-sub{font-size:13px;opacity:.7;margin-top:6px;position:relative;z-index:1}
.discount-banner{display:none;align-items:center;justify-content:center;gap:8px;background:var(--green-dim);border:1px solid rgba(25,173,125,.25);border-radius:var(--radius-sm);padding:10px 14px;margin-bottom:20px;text-align:center}
.discount-banner.show{display:flex}
.discount-banner-text{font-size:13px;color:var(--green);font-weight:500}
.discount-pct{font-family:'Inter',sans-serif;font-weight:700;font-size:14px;color:var(--green);background:var(--green-soft);padding:2px 8px;border-radius:4px}
.summary-stats{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;margin-bottom:20px}
.summary-stat{background:var(--card);padding:16px 18px}
.summary-stat .stat-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--text-mut);margin-bottom:6px}
.summary-stat .stat-value{font-family:'Inter',sans-serif;font-size:20px;font-weight:700;color:var(--text)}
.summary-stat .stat-value.small{font-size:16px}
.summary-stat .stat-note{font-size:11px;color:var(--text-mut);margin-top:2px}
.minimum-notice{background:var(--warn-dim);border:1px solid rgba(244,183,64,.25);border-radius:var(--radius-sm);padding:10px 14px;font-size:12px;color:var(--warn);margin-bottom:16px;display:none}
.minimum-notice.show{display:block}
.summary-divider{height:1px;background:var(--border);margin:18px 0}
.line-items-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--text-mut);margin-bottom:10px}
.line-item{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--border)}
.line-item:last-child{border-bottom:none}
.line-item-name{font-size:13px;color:var(--text-sec);display:flex;align-items:center;gap:8px}
.line-item-dot{width:5px;height:5px;border-radius:50%;background:var(--green);flex-shrink:0}
.line-item-value{font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:var(--text)}
.line-item-na{font-size:12px;color:var(--text-mut);font-style:italic}
.info-section h4{font-size:12px;font-weight:700;color:var(--text);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px}
.info-row{display:flex;justify-content:space-between;align-items:baseline;padding:5px 0;font-size:13px}
.info-label{color:var(--text-mut)}
.info-sub-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--text-mut);margin-top:10px;margin-bottom:4px}
.info-value{color:var(--text-sec);font-weight:500}
.info-value-mono{font-size:13px;font-weight:500;color:var(--text-sec)}
.footer-note{margin-top:28px;text-align:center;font-size:11px;color:var(--text-mut);padding-top:16px;border-top:1px solid var(--border);opacity:.7}
.billing-toggle{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:16px}
.billing-opt{position:relative;background:var(--card);border:1.5px solid var(--border);border-radius:var(--radius-lg);padding:18px 12px 15px;cursor:pointer;text-align:center;font-family:'Inter',sans-serif;color:var(--text);display:flex;flex-direction:column;align-items:center;gap:8px;transition:all .2s;box-shadow:var(--shadow-sm)}
.billing-opt:hover{border-color:var(--green);transform:translateY(-1px)}
.billing-opt.selected{border-color:var(--green);background:var(--green-dim);box-shadow:0 10px 26px -12px rgba(25,173,125,.55)}
.billing-opt-name{font-size:15px;font-weight:600}
.billing-opt-tag{font-size:11px;font-weight:700;color:var(--green);background:var(--green-soft);padding:3px 9px;border-radius:20px;text-transform:uppercase;letter-spacing:.4px}
.billing-opt-tag.none{color:var(--text-mut);background:var(--border)}
.billing-opt.selected .billing-opt-tag.none{color:var(--text-sec)}
.billing-best{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--green);color:#fff;font-size:9px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;padding:3px 10px;border-radius:20px;white-space:nowrap;box-shadow:0 3px 10px rgba(25,173,125,.5)}
.savings-callout{display:none;align-items:center;gap:13px;background:var(--green-dim);border:1px solid rgba(25,173,125,.3);border-radius:var(--radius-lg);padding:14px 16px;margin-bottom:16px}
.savings-callout.show{display:flex}
.savings-callout .sc-icon{width:36px;height:36px;border-radius:11px;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px;font-weight:700}
.savings-callout .sc-body{flex:1;min-width:0}
.savings-callout .sc-amount{font-family:'IvyOra Text',Georgia,serif;font-size:23px;font-weight:500;color:var(--green);line-height:1.1}
.savings-callout .sc-text{font-size:12px;color:var(--text-sec);margin-top:2px;line-height:1.35}
.partner-cta{display:flex;align-items:center;gap:14px;text-decoration:none;background:var(--green-dim);border:1px solid rgba(25,173,125,.3);border-radius:var(--radius-lg);padding:16px 18px;transition:all .2s}
.partner-cta:hover{border-color:var(--green);background:var(--green-soft);transform:translateY(-1px);box-shadow:0 10px 26px -12px rgba(25,173,125,.5)}
.partner-cta-body{flex:1;min-width:0}
.partner-cta-title{font-family:'IvyOra Text',Georgia,serif;font-size:17px;font-weight:500;color:var(--green);line-height:1.15}
.partner-cta-text{font-size:12px;color:var(--text-sec);margin-top:4px;line-height:1.4}
.partner-cta-arrow{flex-shrink:0;width:30px;height:30px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;transition:transform .2s}
.partner-cta:hover .partner-cta-arrow{transform:translateX(3px)}
@media(max-width:1024px){.app{grid-template-columns:1fr}.summary-panel{position:static;height:auto;border-left:none;border-top:1px solid var(--border)}.config-panel,.summary-panel{padding:24px 20px}.header{padding:14px 20px}}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
</style>
</head>
<body data-theme="light">
<div class="header">
<div class="logo"><svg class="logo-img" viewBox="0 0 2878.98 1000" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Enzy" fill="currentColor"><polygon points="1975.1 754.99 1975.1 875.68 1368.21 875.68 1368.21 786.97 1766.19 245.89 1368.75 245.89 1368.75 124.67 1966.9 124.67 1966.9 210.82 1571.32 754.99 1975.1 754.99"/><path d="M2225.41,124.68l166.22,342.5,166.2-342.5h178.79l-261.89,477.64v273.37h-166.2v-273.37l-262.43-477.64h179.32Z"/><path d="M693.23,549.96h-397.6l.17,190.64h397.6v135.08H142.36V124.31h551.04v133.04h-397.6v159.55h397.6l-.17,133.05Z"/><polygon points="843.54 874.57 843.94 392.38 1218.58 875.5 843.54 874.57"/><polygon points="1218.58 125.43 1218.58 606.69 843.02 124.5 1218.58 125.43"/></svg></div>
<div class="header-right">
<span class="badge">Internal Pricing Tool</span>
<div class="theme-toggle-wrap">
<button class="theme-toggle" id="themeToggle" aria-label="Toggle theme"><div class="knob"><svg class="moon" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill="currentColor"/></svg><svg class="sun" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3.5" fill="currentColor"/><g stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="2.5" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21.5"/><line x1="2.5" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21.5" y2="12"/><line x1="5.3" y1="5.3" x2="7" y2="7"/><line x1="17" y1="17" x2="18.7" y2="18.7"/><line x1="5.3" y1="18.7" x2="7" y2="17"/><line x1="17" y1="7" x2="18.7" y2="5.3"/></g></svg></div></button>
</div>
</div>
</div>
<div class="app">
<div class="config-panel">
<div class="section">
<div class="section-label">Step 1</div>
<div class="section-title">User Baseline</div>
<div class="section-desc">Determine the number of committed users.</div>
<div class="card"><div class="input-row">
<label for="userCount">Number of Users</label>
<input type="number" id="userCount" value="200" min="1" max="100000" step="1">
</div></div>
</div>
<div class="section">
<div class="section-label">Step 2</div>
<div class="section-title">Platform & Modules</div>
<div class="section-desc">Core is always included. Toggle add-ons below.</div>
<div class="module-card always-on" id="card-core">
<div class="module-header"><div class="module-name"><div class="module-icon core-icon">📊</div>Core Module</div><span class="always-label">Always Included</span></div>
<div class="module-features"><span class="feature-chip">Leaderboards</span><span class="feature-chip">Profiles</span><span class="feature-chip">Badges</span><span class="feature-chip">Competitions & Incentives</span><span class="feature-chip">Messaging</span><span class="feature-chip">Bot Chats</span><span class="feature-chip">Media Library</span></div>
</div>
<div class="module-card" id="card-sell">
<div class="module-header"><div class="module-name"><div class="module-icon sell-icon">💰</div>Sell Module</div><div class="toggle" id="toggle-sell"></div></div>
<div class="module-features"><span class="feature-chip">Canvassing</span><span class="feature-chip">Lead Management</span><span class="feature-chip">Digital Business Card</span><span class="feature-chip">Appt Scheduling</span><span class="feature-chip">SMS Campaigns</span></div>
<div class="sell-addons" id="sellSubgroup">
<div class="sell-addon" id="card-weather">
<div class="sell-addon-left"><span class="sell-addon-name">🗺️ Weather Overlays</span></div>
<div class="sell-addon-right"><div class="toggle" id="toggle-weather"></div></div>
</div>
<div class="sell-addon" id="card-propensity">
<div class="sell-addon-left"><span class="sell-addon-name">✨ Propensity Scores</span></div>
<div class="sell-addon-right"><span class="tbd-badge">TBD</span><div class="toggle" id="toggle-propensity"></div></div>
</div>
<div class="sell-addon" id="card-coach">
<div class="sell-addon-left"><span class="sell-addon-name">🤖 AI Coach</span></div>
<div class="sell-addon-right"><span class="tbd-badge">TBD</span><div class="toggle" id="toggle-coach"></div></div>
</div>
</div>
</div>
<div class="module-card" id="card-recruit">
<div class="module-header"><div class="module-name"><div class="module-icon recruit-icon">👥</div>Recruit Module</div><div class="toggle" id="toggle-recruit"></div></div>
<div class="module-features"><span class="feature-chip">Recruiting Center</span><span class="feature-chip">Public Recruit Link</span><span class="feature-chip">Onboarding Workflow</span><span class="feature-chip">Document Library</span></div>
</div>
</div>
<div class="section">
<div class="section-label">Step 3</div>
<div class="section-title">Billing Cadence</div>
<div class="section-desc">Annual is our standard plan and unlocks the best per-user rate.</div>
<div class="billing-toggle">
<button type="button" class="billing-opt selected" data-billing="annual"><span class="billing-best">Best Value</span><span class="billing-opt-name">Annual</span><span class="billing-opt-tag">Save 10%</span></button>
<button type="button" class="billing-opt" data-billing="quarterly"><span class="billing-opt-name">Quarterly</span><span class="billing-opt-tag">Save 5%</span></button>
<button type="button" class="billing-opt" data-billing="monthly"><span class="billing-opt-name">Monthly</span><span class="billing-opt-tag none">No Discount</span></button>
</div>
</div>
<div class="section">
<div class="section-label">Step 4</div>
<div class="section-title">Agreement Terms</div>
<div class="section-desc">Set the contract length.</div>
<div class="card"><div class="input-row">
<label for="agreementLength">Agreement Length</label>
<select id="agreementLength"><option value="12" selected>12 months</option><option value="24">24 months</option><option value="36">36 months</option></select>
<span class="input-hint" id="renewalHint">+7% / year at renewal</span>
</div></div>
</div>
</div>
<div class="summary-panel">
<div class="summary-header"><h2>Pricing Summary</h2><p>Updates live as you configure</p></div>
<div class="price-hero">
<div class="price-hero-label">Cost Per User</div>
<div class="price-hero-value" id="costPerUser">$50.00</div>
<div class="price-hero-sub" id="priceHeroSub">per user / month · billed annually</div>
</div>
<div class="savings-callout" id="savingsCallout">
<div class="sc-icon">✓</div>
<div class="sc-body"><div class="sc-amount" id="savingsAmount">$0</div><div class="sc-text" id="savingsText">saved per year vs monthly billing</div></div>
</div>
<div class="discount-banner" id="discountBanner">
<span class="discount-pct" id="discountPct">0%</span>
<span class="discount-banner-text" id="discountText">savings vs. standard pricing</span>
</div>
<div class="summary-stats">
<div class="summary-stat"><div class="stat-label">Monthly Total</div><div class="stat-value" id="monthlyTotal">$10,000</div><div class="stat-note" id="minimumNote"></div></div>
<div class="summary-stat"><div class="stat-label">Annual Cost</div><div class="stat-value" id="annualCost">$120,000</div></div>
<div class="summary-stat"><div class="stat-label">Setup Fee</div><div class="stat-value small" id="setupFee">$10,000</div><div class="stat-note">One-time fee</div></div>
<div class="summary-stat"><div class="stat-label">User Baseline</div><div class="stat-value small" id="summaryUsers">200</div><div class="stat-note">committed users</div></div>
</div>
<div class="minimum-notice" id="minimumBanner">⚠️ $500/mo minimum platform fee applies.</div>
<div class="summary-divider"></div>
<div class="line-items">
<div class="line-items-label">Module Breakdown (Monthly)</div>
<div class="line-item"><span class="line-item-name"><span class="line-item-dot"></span>Core Module</span><span class="line-item-value" id="lineCore">$7,000</span></div>
<div class="line-item" id="lineSellRow"><span class="line-item-name"><span class="line-item-dot"></span>Sell Module</span><span class="line-item-value" id="lineSell">$2,000</span></div>
<div class="line-item" id="lineWeatherRow" style="display:none"><span class="line-item-name" style="padding-left:14px"><span class="line-item-dot"></span>Weather Overlays</span><span class="line-item-value" id="lineWeather">$0</span></div>
<div class="line-item" id="linePropensityRow" style="display:none"><span class="line-item-name" style="padding-left:14px"><span class="line-item-dot"></span>Propensity Scores</span><span class="line-item-na">TBD</span></div>
<div class="line-item" id="lineCoachRow" style="display:none"><span class="line-item-name" style="padding-left:14px"><span class="line-item-dot"></span>AI Coach</span><span class="line-item-na">TBD</span></div>
<div class="line-item" id="lineRecruitRow"><span class="line-item-name"><span class="line-item-dot"></span>Recruit Module</span><span class="line-item-value" id="lineRecruit">$1,000</span></div>
</div>
<div class="summary-divider"></div>
<div class="info-section"><h4>Agreement Terms</h4>
<div class="info-row"><span class="info-label">Contract Length</span><span class="info-value" id="termLength">12 months</span></div>
<div class="info-row"><span class="info-label">Renewal Terms</span><span class="info-value-mono" id="termRenewal">+7% / year at renewal</span></div>
</div>
<div class="summary-divider"></div>
<div class="info-section"><h4>Usage Fees</h4>
<div class="info-row"><span class="info-label">Additional User</span><span class="info-value-mono" id="termAdditionalUser">$65.00 / mo per user</span></div>
<div class="info-row"><span class="info-label">E-Signed Documents</span><span class="info-value-mono">$2.50 / document</span></div>
<div class="info-row"><span class="info-label">Outbound Domestic SMS</span><span class="info-value-mono">$0.03 / SMS</span></div>
</div>
<div class="summary-divider"></div>
<div class="info-section"><h4>Available Partners</h4>
<a class="partner-cta" href="/partners" target="_blank" rel="noopener noreferrer">
<div class="partner-cta-body">
<div class="partner-cta-title">Explore the Enzy partner network</div>
<div class="partner-cta-text">Background checks, gear &amp; swag, commission &amp; payroll, and more — see every integration and offer.</div>
</div>
<span class="partner-cta-arrow">→</span>
</a>
</div>
<div class="footer-note">Enzy Confidential · Internal use only</div>
</div>
</div>
<script>
const T=[{s:1,e:200,c:35,sl:10,r:5,w:10,a:5},{s:201,e:400,c:20,sl:6,r:3,w:6,a:3},{s:401,e:600,c:10,sl:3,r:1.5,w:3,a:1.5},{s:601,e:800,c:5,sl:1.5,r:.75,w:1.5,a:.75},{s:801,e:1000,c:2.5,sl:.75,r:.375,w:.75,a:.375},{s:1001,e:1e6,c:2,sl:.6,r:.3,w:.6,a:.3}];
const S={users:200,sell:false,recruit:false,weather:false,propensity:false,coach:false,months:12,billing:'annual'};
// Billing cadence multipliers applied to the annual per-user price (annual = current tool math).
// Monthly is the standard "list" price; annual saves 10%, quarterly saves 5% off that list.
const BILL={annual:{mult:1,save:.10,sub:'billed annually'},quarterly:{mult:0.95/0.90,save:.05,sub:'billed quarterly'},monthly:{mult:1/0.90,save:0,sub:'billed monthly'}};
function mc(u,k){let t=0,rem=u;for(const tr of T){if(rem<=0)break;const sz=tr.e-tr.s+1;t+=Math.min(rem,sz)*tr[k];rem-=sz;}return t;}
function stdPPU(){let p=T[0].c;if(S.sell)p+=T[0].sl;if(S.recruit)p+=T[0].r;if(S.weather)p+=T[0].w;return p;}
function syncDeps(){
var sg=document.getElementById('sellSubgroup');
if(!S.sell){S.weather=S.propensity=S.coach=false;
['weather','propensity','coach'].forEach(function(x){var c=document.getElementById('card-'+x),t=document.getElementById('toggle-'+x);if(c)c.classList.remove('selected');if(t)t.classList.remove('on');});
if(sg)sg.classList.remove('open');
}else{if(sg)sg.classList.add('open');}
}
function calc(){const u=S.users;if(u<1)return;syncDeps();
const bl=BILL[S.billing],mult=bl.mult,listMult=BILL.monthly.mult;
const cc=mc(u,'c'),sc=S.sell?mc(u,'sl'):0,rc=S.recruit?mc(u,'r'):0,wc=S.weather?mc(u,'w'):0;
let tmA=cc+sc+rc+wc;const bm=tmA<500&&tmA>0;const emA=Math.max(tmA,500);
const em=emA*mult;const cpuA=emA/u;const cpu=cpuA*mult;const auf=Math.ceil(cpuA*1.3*10)/10;
const sp=stdPPU(),dp=sp>0?((sp-cpuA)/sp)*100:0;const mo=S.months;const rt=mo===12?'+7% / year at renewal':'Price Lock';
document.getElementById('costPerUser').textContent='$'+cpu.toFixed(2);
document.getElementById('priceHeroSub').textContent='per user / month · '+bl.sub;
document.getElementById('monthlyTotal').textContent=fc(em);document.getElementById('annualCost').textContent=fc(em*12);
document.getElementById('setupFee').textContent=fc(emA);document.getElementById('summaryUsers').textContent=u.toLocaleString();
document.getElementById('lineCore').textContent=fc(cc*mult);
document.getElementById('lineSellRow').style.display=S.sell?'flex':'none';document.getElementById('lineSell').textContent=fc(sc*mult);
document.getElementById('lineRecruitRow').style.display=S.recruit?'flex':'none';document.getElementById('lineRecruit').textContent=fc(rc*mult);
document.getElementById('lineWeatherRow').style.display=S.weather?'flex':'none';document.getElementById('lineWeather').textContent=fc(wc*mult);
document.getElementById('linePropensityRow').style.display=S.propensity?'flex':'none';
document.getElementById('lineCoachRow').style.display=S.coach?'flex':'none';
document.getElementById('termLength').textContent=mo+' months';document.getElementById('termRenewal').textContent=rt;
document.getElementById('termAdditionalUser').textContent='$'+auf.toFixed(2)+' / mo per user';
document.getElementById('renewalHint').textContent=rt;
const bn=document.getElementById('minimumBanner');if(bm){bn.classList.add('show');document.getElementById('minimumNote').textContent='$500 minimum applied';}else{bn.classList.remove('show');document.getElementById('minimumNote').textContent='';}
const sco=document.getElementById('savingsCallout'),scA=document.getElementById('savingsAmount'),scT=document.getElementById('savingsText');
const listYr=emA*listMult*12,saveYr=listYr-em*12,annualSaveYr=listYr-emA*BILL.annual.mult*12;
if(saveYr>1){sco.classList.add('show');scA.textContent=fc(saveYr);scT.textContent='saved per year vs monthly billing ('+Math.round(bl.save*100)+'% off the standard rate)';}
else if(annualSaveYr>1){sco.classList.add('show');scA.textContent=fc(annualSaveYr);scT.textContent='you could save per year by switching to annual billing';}
else{sco.classList.remove('show');}
const db=document.getElementById('discountBanner');if(dp>.5){db.classList.add('show');document.getElementById('discountPct').textContent=Math.round(dp)+'%';document.getElementById('discountText').textContent='volume savings vs. $'+sp.toFixed(0)+'/user list rate';}else{db.classList.remove('show');}}
function fc(v){return '$'+Math.round(v).toLocaleString();}
function toggleModule(m){
if(m==='weather'||m==='propensity'||m==='coach'){if(!S.sell)return;}
S[m]=!S[m];
var c=document.getElementById('card-'+m),t=document.getElementById('toggle-'+m);
if(c&&t){c.classList.toggle('selected',S[m]);t.classList.toggle('on',S[m]);}
if(m==='sell')syncDeps();
calc();}
function toggleTheme(){var b=document.body,t=document.getElementById('themeToggle');
if(b.getAttribute('data-theme')==='dark'){b.setAttribute('data-theme','light');t.classList.remove('dark');}
else{b.setAttribute('data-theme','dark');t.classList.add('dark');}}
document.addEventListener('click',function(e){
var el=e.target,tt=el.closest&&el.closest('#themeToggle');
if(tt){toggleTheme();return;}
var bo=el.closest&&el.closest('.billing-opt');
if(bo){S.billing=bo.getAttribute('data-billing');var opts=document.querySelectorAll('.billing-opt');for(var i=0;i<opts.length;i++){opts[i].classList.toggle('selected',opts[i]===bo);}calc();return;}
var sa=el.closest&&el.closest('.sell-addon');
if(sa){var id=sa.id.replace('card-','');toggleModule(id);return;}
var mc=el.closest&&el.closest('.module-card:not(.always-on)');
if(mc){var id=mc.id.replace('card-','');toggleModule(id);}
});
document.addEventListener('input',function(e){if(e.target.id==='userCount'){var v=parseInt(e.target.value);if(v>0){S.users=v;calc();}}});
document.addEventListener('change',function(e){if(e.target.id==='agreementLength'){S.months=parseInt(e.target.value);calc();}});
calc();
</script>
</body>
</html>`
