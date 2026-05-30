// Internal pricing/quoting tool. Rendered verbatim inside an isolated iframe so
// its bespoke styles, theme toggle, and scripts never collide with the marketing
// site's global shell. Edit this string to update the tool itself.
export const PRICING_TOOL_HTML = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Enzy Pricing</title>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root {
--bg:#F7F9FC;--surface:#FFFFFF;--card:#F1F4F8;--border:#D6DEE6;
--text:#0F1720;--text-sec:#4B5563;--text-mut:#6B7280;
--green:#19AD7D;--green-hov:#149067;--green-press:#0F6E4F;--green-glow:#19AD7D;
--green-dim:rgba(25,173,125,0.1);--green-soft:rgba(25,173,125,0.15);
--warn:#F4B740;--warn-dim:rgba(244,183,64,0.1);--error:#F04438;--info:#22D3EE;
--shadow-sm:0 1px 3px rgba(0,0,0,0.06);--shadow-md:0 4px 16px rgba(0,0,0,0.08);
--radius:10px;--radius-sm:6px;--radius-lg:14px;
}
[data-theme="dark"] {
--bg:#0B0F14;--surface:#11161D;--card:#161C24;--border:#232C38;
--text:#F5F7FA;--text-sec:#A3ADB8;--text-mut:#6B7684;
--green:#19AD7D;--green-hov:#149067;--green-press:#0F6E4F;--green-glow:#3CD9A3;
--green-dim:rgba(25,173,125,0.12);--green-soft:rgba(25,173,125,0.18);
--warn:#F4B740;--warn-dim:rgba(244,183,64,0.12);--error:#F04438;--info:#22D3EE;
--shadow-sm:0 1px 3px rgba(0,0,0,0.3);--shadow-md:0 4px 16px rgba(0,0,0,0.35);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);line-height:1.5;-webkit-font-smoothing:antialiased;min-height:100vh}
*{transition:background-color .2s,border-color .2s,color .2s,filter .2s,opacity .2s,box-shadow .2s}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);line-height:1.5;-webkit-font-smoothing:antialiased;min-height:100vh;}
.header{background:var(--surface);border-bottom:1px solid var(--border);padding:14px 40px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
.logo-img{height:28px;width:auto;object-fit:contain;transition:filter .3s}
.logo-img{filter:invert(1)}
[data-theme="dark"] .logo-img{filter:none}
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
.section-title{font-family:'Instrument Serif',Georgia,serif;font-size:28px;font-weight:400;margin-bottom:4px;color:var(--text);letter-spacing:-.3px}
.section-desc{font-size:14px;color:var(--text-sec);margin-bottom:20px}
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:22px 24px}
.input-row{display:flex;align-items:center;gap:16px}
.input-row+.input-row{margin-top:16px}
.input-row label{font-size:14px;font-weight:500;min-width:140px;color:var(--text-sec)}
.input-row input[type="number"],.input-row select{flex:1;max-width:200px;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--text);background:var(--surface);outline:none}
.input-row input:focus,.input-row select:focus{border-color:var(--green);box-shadow:0 0 0 3px var(--green-dim)}
.input-row select option{background:var(--surface);color:var(--text)}
.input-hint{font-size:12px;color:var(--text-mut);font-weight:500}
.module-card{background:var(--card);border:1.5px solid var(--border);border-radius:var(--radius);padding:18px 22px;cursor:pointer;transition:all .2s;user-select:none}
.module-card:hover{border-color:var(--text-mut)}
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
.price-hero{text-align:center;padding:28px 20px;background:linear-gradient(135deg,#0F6E4F,#149067 40%,#19AD7D);border-radius:var(--radius-lg);color:#fff;margin-bottom:20px;position:relative;overflow:hidden}
.price-hero::before{content:'';position:absolute;top:-50%;right:-25%;width:220px;height:220px;background:rgba(255,255,255,.06);border-radius:50%}
.price-hero-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;opacity:.85;margin-bottom:8px}
.price-hero-value{font-family:'Instrument Serif',Georgia,serif;font-size:48px;font-weight:400;line-height:1;position:relative;z-index:1}
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
@media(max-width:1024px){.app{grid-template-columns:1fr}.summary-panel{position:static;height:auto;border-left:none;border-top:1px solid var(--border)}.config-panel,.summary-panel{padding:24px 20px}.header{padding:14px 20px}}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
</style>
</head>
<body data-theme="light">
<div class="header">
<div class="logo"><img src="data:image/png;base64,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" alt="Enzy" class="logo-img"></div>
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
<div class="price-hero-sub">per user / month</div>
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
<div class="info-row"><span class="info-label">Victig</span><span class="info-value-mono">~$35 / background check</span></div>
<div class="info-row"><span class="info-label">The Poser Company</span><span class="info-value-mono">Gear & swag</span></div>
<div class="info-row"><span class="info-label">Truwear</span><span class="info-value-mono">Gear & swag</span></div>
<div class="info-row"><span class="info-label">Sequifi</span><span class="info-value-mono">Commission & payroll</span></div>
<div class="info-row"><span class="info-label">Stakt</span><span class="info-value-mono">Commission & payroll</span></div>
</div>
<div class="footer-note">Enzy Confidential · Internal use only</div>
</div>
</div>
<script>
const T=[{s:1,e:200,c:35,sl:10,r:5,w:10,a:5},{s:201,e:400,c:20,sl:6,r:3,w:6,a:3},{s:401,e:600,c:10,sl:3,r:1.5,w:3,a:1.5},{s:601,e:800,c:5,sl:1.5,r:.75,w:1.5,a:.75},{s:801,e:1000,c:2.5,sl:.75,r:.375,w:.75,a:.375},{s:1001,e:1e6,c:2,sl:.6,r:.3,w:.6,a:.3}];
const S={users:200,sell:false,recruit:false,weather:false,propensity:false,coach:false,months:12};
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
const cc=mc(u,'c'),sc=S.sell?mc(u,'sl'):0,rc=S.recruit?mc(u,'r'):0,wc=S.weather?mc(u,'w'):0;
let tm=cc+sc+rc+wc;const bm=tm<500&&tm>0;const em=Math.max(tm,500);const cpu=em/u;const auf=Math.ceil(cpu*1.3*10)/10;
const sp=stdPPU(),dp=sp>0?((sp-cpu)/sp)*100:0;const mo=S.months;const rt=mo===12?'+7% / year at renewal':'Price Lock';
document.getElementById('costPerUser').textContent='$'+cpu.toFixed(2);
document.getElementById('monthlyTotal').textContent=fc(em);document.getElementById('annualCost').textContent=fc(em*12);
document.getElementById('setupFee').textContent=fc(em);document.getElementById('summaryUsers').textContent=u.toLocaleString();
document.getElementById('lineCore').textContent=fc(cc);
document.getElementById('lineSellRow').style.display=S.sell?'flex':'none';document.getElementById('lineSell').textContent=fc(sc);
document.getElementById('lineRecruitRow').style.display=S.recruit?'flex':'none';document.getElementById('lineRecruit').textContent=fc(rc);
document.getElementById('lineWeatherRow').style.display=S.weather?'flex':'none';document.getElementById('lineWeather').textContent=fc(wc);
document.getElementById('linePropensityRow').style.display=S.propensity?'flex':'none';
document.getElementById('lineCoachRow').style.display=S.coach?'flex':'none';
document.getElementById('termLength').textContent=mo+' months';document.getElementById('termRenewal').textContent=rt;
document.getElementById('termAdditionalUser').textContent='$'+auf.toFixed(2)+' / mo per user';
document.getElementById('renewalHint').textContent=rt;
const bn=document.getElementById('minimumBanner');if(bm){bn.classList.add('show');document.getElementById('minimumNote').textContent='$500 minimum applied';}else{bn.classList.remove('show');document.getElementById('minimumNote').textContent='';}
const db=document.getElementById('discountBanner');if(dp>.5){db.classList.add('show');document.getElementById('discountPct').textContent=Math.round(dp)+'%';document.getElementById('discountText').textContent='savings vs. $'+sp.toFixed(0)+'/user standard pricing';}else{db.classList.remove('show');}}
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
