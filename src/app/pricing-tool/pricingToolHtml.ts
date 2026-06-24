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
--warn:#D97706;--warn-dim:rgba(244,183,64,0.1);--error:#F04438;--info:#22D3EE;
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
.sell-addons{overflow:hidden;max-height:0;opacity:0;transition:max-height .3s ease,opacity .25s ease,margin .3s ease;margin-top:0;padding:0 0 0 42px;display:flex;flex-direction:column;gap:6px}
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
.price-hero-unit{font-family:'Inter',sans-serif;font-size:22px;font-weight:600;opacity:.75;letter-spacing:0;margin-left:4px}
.price-hero-sub{font-size:13px;opacity:.7;margin-top:6px;position:relative;z-index:1}
.price-hero.ph-quarterly{background:linear-gradient(155deg,#149067,#19AD7D 45%,#34C495);box-shadow:0 14px 40px -12px rgba(52,196,149,.5)}
.price-hero.ph-monthly{background:linear-gradient(155deg,#B45309,#D97706 45%,#F59E0B);box-shadow:0 14px 40px -12px rgba(217,119,6,.5)}
.meta-discount{flex-wrap:wrap;align-items:center;gap:6px;margin-top:8px}
.md-pct{font-size:11px;font-weight:700;color:var(--green);background:var(--green-soft);padding:3px 9px;border-radius:20px;text-transform:uppercase;letter-spacing:.4px}
.md-text{font-size:11px;font-weight:700;color:var(--green)}
.totals-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);overflow:hidden;margin-bottom:16px}
.totals-row{display:flex}
.total-block{flex:1;padding:18px 20px;min-width:0}
.total-divider{width:1px;background:var(--border);margin:16px 0}
.total-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--text-mut);margin-bottom:7px}
.total-value{font-family:'Inter',sans-serif;font-size:25px;font-weight:800;color:var(--text);line-height:1;letter-spacing:-.5px}
.total-note{font-size:11px;color:var(--text-mut);margin-top:6px;min-height:13px}
.savings-bar{display:none;align-items:center;gap:10px;background:var(--green-dim);border-top:1px solid rgba(25,173,125,.22);padding:12px 18px}
.savings-bar.show{display:flex}
.sb-check{width:22px;height:22px;border-radius:6px;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0}
.sb-text{flex:1;min-width:0;font-size:12.5px;color:var(--text-sec);line-height:1.35}
.sb-text b{color:var(--green);font-weight:700;font-size:13.5px}
.sb-tag{flex-shrink:0;font-size:9px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;padding:3px 8px;border-radius:20px;white-space:nowrap}
.savings-bar.best .sb-tag{background:var(--green);color:#fff}
.savings-bar.good .sb-tag{background:var(--green-soft);color:var(--green)}
.savings-bar.alert{background:var(--warn-dim);border-top-color:rgba(244,183,64,.35)}
.savings-bar.alert .sb-check{background:var(--warn);color:#0B0F14}
.savings-bar.alert .sb-text b{color:var(--warn)}
.savings-bar.alert .sb-tag{display:none}
.summary-meta{display:flex;gap:10px;margin-bottom:16px}
.meta-item{flex:1;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:12px 14px}
.meta-label{display:block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--text-mut);margin-bottom:5px}
.meta-line{display:flex;align-items:baseline;gap:6px}
.meta-value{font-family:'Inter',sans-serif;font-size:16px;font-weight:700;color:var(--text)}
.meta-sub{font-size:10px;color:var(--text-mut);font-weight:500}
.minimum-notice{background:var(--warn-dim);border:1px solid rgba(244,183,64,.25);border-radius:var(--radius-sm);padding:10px 14px;font-size:12px;color:var(--warn);margin-bottom:16px;display:none}
.minimum-notice.show{display:block}
.summary-divider{height:1px;background:var(--border);margin:18px 0}
.line-items-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--text-mut);margin-bottom:10px}
.bd-row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:9px 0}
.bd-name{display:flex;align-items:center;gap:10px;font-size:13.5px;font-weight:600;color:var(--text);min-width:0}
.bd-ico{width:24px;height:24px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}
.bd-val{font-family:'Inter',sans-serif;font-size:14px;font-weight:700;color:var(--text);white-space:nowrap}
.bd-sep{border-top:1px solid var(--border);margin-top:4px;padding-top:14px}
.bd-addon{padding:7px 0 7px 36px;position:relative}
.bd-addon .bd-name{font-size:12.5px;font-weight:500;color:var(--text-sec)}
.bd-addon .bd-val{font-size:13px;font-weight:600;color:var(--text-sec)}
.bd-addon::before{content:'';position:absolute;left:12px;top:-4px;width:13px;height:20px;border-left:1.5px solid var(--border);border-bottom:1.5px solid var(--border);border-bottom-left-radius:7px}
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
.partner-cta{display:flex;align-items:center;gap:14px;text-decoration:none;background:var(--green-dim);border:1px solid rgba(25,173,125,.3);border-radius:var(--radius-lg);padding:16px 18px;transition:all .2s}
.partner-cta:hover{border-color:var(--green);background:var(--green-soft);transform:translateY(-1px);box-shadow:0 10px 26px -12px rgba(25,173,125,.5)}
.partner-cta-body{flex:1;min-width:0}
.partner-cta-title{font-family:'IvyOra Text',Georgia,serif;font-size:17px;font-weight:500;color:var(--green);line-height:1.15}
.partner-cta-text{font-size:12px;color:var(--text-sec);margin-top:4px;line-height:1.4}
.partner-cta-arrow{flex-shrink:0;width:30px;height:30px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;transition:transform .2s}
.partner-cta:hover .partner-cta-arrow{transform:translateX(3px)}
.module-card.always-on .feature-chip-ai,.feature-chip-ai{background:linear-gradient(135deg,#19AD7D,#22D3EE);color:#fff;border:none;font-weight:700;box-shadow:0 1px 6px rgba(25,173,125,.35)}
.core-addons{margin-top:12px;padding-left:42px;display:flex;flex-direction:column;gap:8px}
.ai-price-badge{font-size:11px;font-weight:700;color:var(--green);background:var(--green-soft);padding:3px 9px;border-radius:20px;white-space:nowrap}
.bd-row.enterprise .bd-name{color:var(--warn)}
.bd-row.enterprise .bd-val{color:var(--warn)}
.ai-ent-note{font-size:11px;color:var(--warn);line-height:1.4;margin:5px 0 2px;padding-left:36px}
.ai-upgrade-note{font-size:12px;color:var(--text-sec);line-height:1.45}
.ai-upgrade-note b{color:var(--green);font-weight:700}
.discounts-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:16px 18px;margin-bottom:16px}
.dc-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.dc-title{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--text-mut)}
.dc-tag{font-size:9px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;padding:3px 8px;border-radius:20px;background:var(--green);color:#fff}
.dc-tag.good{background:var(--green-soft);color:var(--green)}
.dc-tag.none{display:none}
.dc-row{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:5px 0;font-size:13px}
.dc-label{color:var(--text-sec);display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;min-width:0}
.dc-sub{font-size:10px;color:var(--text-mut);text-transform:uppercase;letter-spacing:.4px}
.dc-pct{font-size:10px;font-weight:700;color:var(--green);background:var(--green-soft);padding:2px 7px;border-radius:20px}
.dc-val{font-family:'Inter',sans-serif;font-weight:700;color:var(--text);white-space:nowrap}
.dc-disc .dc-val{color:var(--green)}
.dc-row.dc-final{border-top:1px solid var(--border);margin-top:6px;padding-top:12px}
.dc-final .dc-label{font-weight:700;color:var(--text);font-size:14px}
.dc-final .dc-val{font-size:18px;letter-spacing:-.3px}
.dc-avail{opacity:.7}
.dc-avail .dc-val{color:var(--text-mut);font-weight:600;font-style:italic}
.dc-avail .dc-pct{background:var(--border);color:var(--text-mut)}
.dc-note{font-size:11px;color:var(--text-mut);margin-top:10px;line-height:1.4}
.dc-note.nudge{color:var(--warn)}
.dc-u{font-size:12px;color:var(--text-mut);font-weight:600}
.dc-permonth{padding-top:2px}
.dc-permonth .dc-label,.dc-permonth .dc-val{font-size:12px;color:var(--text-mut);font-weight:600}
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
<div class="section-title">Module Selection</div>
<div class="section-desc">Core is always included. Toggle add-ons below.</div>
<div class="module-card always-on" id="card-core">
<div class="module-header"><div class="module-name"><div class="module-icon core-icon">📊</div>Core Module</div><span class="always-label">Always Included</span></div>
<div class="module-features"><span class="feature-chip feature-chip-ai">✨ Enzy AI</span><span class="feature-chip">Leaderboards</span><span class="feature-chip">Profiles</span><span class="feature-chip">Goals</span><span class="feature-chip">Badges</span><span class="feature-chip">Competitions & Incentives</span><span class="feature-chip">Messaging</span><span class="feature-chip">Library</span></div>
<div class="core-addons">
<div class="sell-addon" id="card-enzyai">
<div class="sell-addon-left"><span class="sell-addon-name">✨ Enzy AI Pro</span></div>
<div class="sell-addon-right"><span class="ai-price-badge" id="enzyaiPrice">+$10 / user</span><div class="toggle" id="toggle-enzyai"></div></div>
</div>
<div class="ai-upgrade-note">Unlocks the full <b>agentic experience</b> with <b>20× the usage</b> — set up <b>automations</b> where your AI agent proactively messages you, nudges teammates, and takes action on your behalf.</div>
</div>
</div>
<div class="module-card" id="card-sell">
<div class="module-header"><div class="module-name"><div class="module-icon sell-icon">💰</div>Sell Module</div><div class="toggle" id="toggle-sell"></div></div>
<div class="module-features"><span class="feature-chip">Canvassing</span><span class="feature-chip">Lead Management</span><span class="feature-chip">Digital Business Card</span><span class="feature-chip">Calendar</span></div>
<div class="sell-addons" id="sellSubgroup">
<div class="sell-addon" id="card-weather">
<div class="sell-addon-left"><span class="sell-addon-name">🗺️ Weather Overlays</span></div>
<div class="sell-addon-right"><span class="ai-price-badge" id="weatherPrice">+$10 / user</span><div class="toggle" id="toggle-weather"></div></div>
</div>
</div>
</div>
<div class="module-card" id="card-recruit">
<div class="module-header"><div class="module-name"><div class="module-icon recruit-icon">👥</div>Recruit Module</div><div class="toggle" id="toggle-recruit"></div></div>
<div class="module-features"><span class="feature-chip">Recruiting Center</span><span class="feature-chip">Public Recruit Form</span><span class="feature-chip">Onboarding</span></div>
</div>
</div>
<div class="section">
<div class="section-label">Step 3</div>
<div class="section-title">Billing Cadence</div>
<div class="section-desc">Annual is our standard plan and unlocks the best per-user rate.</div>
<div class="billing-toggle">
<button type="button" class="billing-opt selected" data-billing="annual"><span class="billing-best">Best Value</span><span class="billing-opt-name">Annual</span><span class="billing-opt-tag">Save 20%</span></button>
<button type="button" class="billing-opt" data-billing="quarterly"><span class="billing-opt-name">Quarterly</span><span class="billing-opt-tag">Save 10%</span></button>
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
</div></div>
</div>
</div>
<div class="summary-panel">
<div class="summary-header"><h2>Pricing Summary</h2><p>Updates live as you configure</p></div>
<div class="price-hero ph-annual" id="priceHero">
<div class="price-hero-label">Cost Per User</div>
<div class="price-hero-value"><span id="costPerUser">$32.00</span><span class="price-hero-unit">/mo</span></div>
<div class="price-hero-sub" id="priceHeroSub">billed annually</div>
</div>
<div class="discounts-card" id="discountsCard">
<div class="dc-head"><span class="dc-title">Price breakdown</span><span class="dc-tag" id="dcTag">Best value</span></div>
<div class="dc-row"><span class="dc-label">List price</span><span class="dc-val" id="dcList">$96,000</span></div>
<div class="dc-row dc-disc" id="dcVolRow" style="display:none"><span class="dc-label">Volume discount <span class="dc-pct" id="dcVolPct">0%</span></span><span class="dc-val" id="dcVol">−$0</span></div>
<div class="dc-row dc-disc" id="dcBillRow"><span class="dc-label"><span id="dcBillName">Annual billing</span> <span class="dc-pct" id="dcBillPct">20%</span></span><span class="dc-val" id="dcBill">−$19,200</span></div>
<div class="dc-row dc-final"><span class="dc-label">Your price</span><span class="dc-val"><span id="dcFinal">$76,800</span><span class="dc-u"> /yr</span></span></div>
<div class="dc-note" id="dcNote" style="display:none"></div>
</div>
<div class="minimum-notice" id="minimumBanner">⚠️ $500/mo minimum platform fee applies.</div>
<div class="summary-meta">
<div class="meta-item"><span class="meta-label">Setup Fee</span><div class="meta-line"><span class="meta-value" id="setupFee">$6,400</span><span class="meta-sub">one-time</span></div></div>
<div class="meta-item"><span class="meta-label">Baseline</span><div class="meta-line"><span class="meta-value" id="summaryUsers">200</span><span class="meta-sub">users</span></div></div>
</div>
<div id="breakdownSection">
<div class="summary-divider"></div>
<div class="line-items">
<div class="line-items-label">Per user breakdown</div>
<div class="bd-row bd-parent"><span class="bd-name"><span class="bd-ico core-icon">📊</span>Core Module</span><span class="bd-val" id="lineCore">$32.00</span></div>
<div class="bd-row bd-addon" id="lineEnzyaiRow" style="display:none"><span class="bd-name">Enzy AI Pro</span><span class="bd-val" id="lineEnzyai">$12.00</span></div>
<div class="ai-ent-note" id="aiEntNote" style="display:none">*Custom-priced above 200 seats — loop in an AI specialist to scope.</div>
<div class="bd-row bd-parent bd-sep" id="lineSellRow"><span class="bd-name"><span class="bd-ico sell-icon">💰</span>Sell Module</span><span class="bd-val" id="lineSell">$10.00</span></div>
<div class="bd-row bd-addon" id="lineWeatherRow" style="display:none"><span class="bd-name">Weather Overlays</span><span class="bd-val" id="lineWeather">$10.00</span></div>
<div class="bd-row bd-parent bd-sep" id="lineRecruitRow"><span class="bd-name"><span class="bd-ico recruit-icon">👥</span>Recruit Module</span><span class="bd-val" id="lineRecruit">$5.00</span></div>
</div>
</div>
<div class="summary-divider"></div>
<div class="info-section"><h4>Agreement Terms</h4>
<div class="info-row"><span class="info-label">Contract Length</span><span class="info-value" id="termLength">12 months</span></div>
<div class="info-row"><span class="info-label">Renewal Terms</span><span class="info-value-mono" id="termRenewal">+7% / year at renewal</span></div>
</div>
<div class="summary-divider"></div>
<div class="info-section"><h4>Usage Fees</h4>
<div class="info-row"><span class="info-label">Additional User</span><span class="info-value-mono" id="termAdditionalUser">$42 / mo per user</span></div>
<div class="info-row"><span class="info-label">E-Signed Documents</span><span class="info-value-mono">$2.50 / document</span></div>
<div class="info-row"><span class="info-label">Outbound Domestic SMS</span><span class="info-value-mono">$0.03 / SMS</span></div>
</div>
<div class="summary-divider"></div>
<div class="info-section"><h4>Available Partners</h4>
<a class="partner-cta" href="/partners" target="_blank" rel="noopener noreferrer">
<div class="partner-cta-body">
<div class="partner-cta-title">Explore the Enzy partner network</div>
<div class="partner-cta-text">Gear &amp; swag, commission &amp; payroll, background checks, and more — see every integration and offer.</div>
</div>
<span class="partner-cta-arrow">→</span>
</a>
</div>
</div>
</div>
<script>
const T=[{s:1,e:200,c:32,sl:12,r:8,w:8,a:12},{s:201,e:400,c:20,sl:6,r:3,w:6,a:3},{s:401,e:600,c:10,sl:3,r:1.5,w:3,a:1.5},{s:601,e:800,c:5,sl:1.5,r:.75,w:1.5,a:.75},{s:801,e:1000,c:2.5,sl:.75,r:.375,w:.75,a:.375},{s:1001,e:1e6,c:2,sl:.6,r:.3,w:.6,a:.3}];
const S={users:200,sell:false,recruit:false,weather:false,enzyai:false,months:12,billing:'annual'};
// Billing cadence multipliers applied to the annual per-user price (annual = the base rate stored in T).
// Monthly is the full "list" price (annual / 0.80); quarterly sits between (annual / 0.80 * 0.90).
// Net: annual saves exactly 20% vs monthly, quarterly saves exactly 10% vs monthly.
const BILL={annual:{mult:1,save:.20,sub:'billed annually'},quarterly:{mult:0.90/0.80,save:.10,sub:'billed quarterly'},monthly:{mult:1/0.80,save:0,sub:'billed monthly'}};
function mc(u,k){let t=0,rem=u;for(const tr of T){if(rem<=0)break;const sz=tr.e-tr.s+1;t+=Math.min(rem,sz)*tr[k];rem-=sz;}return t;}
function stdPPU(){let p=T[0].c;if(S.sell)p+=T[0].sl;if(S.recruit)p+=T[0].r;if(S.weather)p+=T[0].w;return p;}
function syncDeps(){
var sg=document.getElementById('sellSubgroup');
if(!S.sell){S.weather=false;
['weather'].forEach(function(x){var c=document.getElementById('card-'+x),t=document.getElementById('toggle-'+x);if(c)c.classList.remove('selected');if(t)t.classList.remove('on');});
if(sg)sg.classList.remove('open');
}else{if(sg)sg.classList.add('open');}
}
function calc(){const u=S.users;if(u<1)return;syncDeps();
const bl=BILL[S.billing],mult=bl.mult,listMult=BILL.monthly.mult;
const cc=mc(u,'c'),sc=S.sell?mc(u,'sl'):0,rc=S.recruit?mc(u,'r'):0,wc=S.weather?mc(u,'w'):0;
const aiOn=S.enzyai,aiCustom=aiOn&&u>200,aiCost=(aiOn&&u<=200)?u*12:0;
const moduleA=cc+sc+rc+wc;let tmA=moduleA+aiCost;const bm=tmA<500&&tmA>0;const emA=Math.max(tmA,500);
const em=emA*mult;const cpuA=emA/u;const cpu=cpuA*mult;const auf=Math.round(cpuA*1.3);
const sp=stdPPU();const mo=S.months;const rt=mo===12?'+7% / year at renewal':'Price Lock';
document.getElementById('costPerUser').textContent='$'+cpu.toFixed(2);
document.getElementById('priceHeroSub').textContent=bl.sub;
document.getElementById('priceHero').className='price-hero ph-'+S.billing;
document.getElementById('setupFee').textContent=fc(emA);document.getElementById('summaryUsers').textContent=u.toLocaleString();
document.getElementById('breakdownSection').style.display=(S.sell||S.recruit||S.weather||S.enzyai)?'block':'none';
document.getElementById('lineCore').textContent='$'+(cc*mult/u).toFixed(2);
var aiRow=document.getElementById('lineEnzyaiRow');aiRow.style.display=aiOn?'flex':'none';
document.getElementById('lineEnzyai').textContent=aiCustom?'Custom*':'$'+(aiCost*mult/u).toFixed(2);
aiRow.classList.toggle('enterprise',aiOn&&aiCustom);
document.getElementById('aiEntNote').style.display=(aiOn&&aiCustom)?'block':'none';
document.getElementById('enzyaiPrice').textContent=u>200?'Custom pricing':'+$12 / user';
document.getElementById('lineSellRow').style.display=S.sell?'flex':'none';document.getElementById('lineSell').textContent='$'+(sc*mult/u).toFixed(2);
document.getElementById('lineRecruitRow').style.display=S.recruit?'flex':'none';document.getElementById('lineRecruit').textContent='$'+(rc*mult/u).toFixed(2);
document.getElementById('lineWeatherRow').style.display=S.weather?'flex':'none';document.getElementById('lineWeather').textContent='$'+(wc*mult/u).toFixed(2);
var wppu=mc(u,'w')/u;document.getElementById('weatherPrice').textContent='+$'+(wppu%1===0?wppu:wppu.toFixed(2))+' / user';
document.getElementById('termLength').textContent=mo+' months';document.getElementById('termRenewal').textContent=rt;
document.getElementById('termAdditionalUser').textContent='$'+auf+' / mo per user';
const bn=document.getElementById('minimumBanner');if(bm){bn.classList.add('show');}else{bn.classList.remove('show');}
// Itemized discounts: list price -> volume -> billing -> your price (annual figures; always sums to final).
var stdNoVolYr=Math.max(u*sp+aiCost,500);
var finalYr=em*12;
var billDiscYr=emA*(listMult-mult)*12;
var volDiscYr=(stdNoVolYr-emA)*listMult*12;if(volDiscYr<1)volDiscYr=0;
var listYr=finalYr+billDiscYr+volDiscYr;
var volPct=stdNoVolYr>0?Math.round((stdNoVolYr-emA)/stdNoVolYr*100):0;
var billPct=Math.round((listMult-mult)/listMult*100);
document.getElementById('dcList').textContent=fc(listYr);
document.getElementById('dcFinal').textContent=fc(finalYr);
var volRow=document.getElementById('dcVolRow');
if(volDiscYr>0){volRow.style.display='flex';document.getElementById('dcVolPct').textContent=volPct+'%';document.getElementById('dcVol').textContent='−'+fc(volDiscYr);}else{volRow.style.display='none';}
var billRow=document.getElementById('dcBillRow'),dcTag=document.getElementById('dcTag'),dcNote=document.getElementById('dcNote'),cadName=S.billing==='annual'?'Annual':S.billing==='quarterly'?'Quarterly':'Monthly';
if(S.billing==='monthly'){
billRow.classList.add('dc-avail');billRow.style.display='flex';
document.getElementById('dcBillName').textContent='Annual billing';document.getElementById('dcBillPct').textContent='20%';document.getElementById('dcBill').textContent='available';
dcTag.textContent='';dcTag.className='dc-tag none';
dcNote.style.display='block';dcNote.className='dc-note nudge';dcNote.textContent="You're on the monthly list price — switch to annual to save "+fc(emA*(listMult-1)*12)+"/yr.";
}else{
billRow.classList.remove('dc-avail');billRow.style.display='flex';
document.getElementById('dcBillName').textContent=cadName+' billing';document.getElementById('dcBillPct').textContent=billPct+'%';document.getElementById('dcBill').textContent='−'+fc(billDiscYr);
dcTag.textContent=S.billing==='annual'?'Best value':'Better deal';dcTag.className='dc-tag'+(S.billing==='quarterly'?' good':'');
dcNote.style.display='none';
}
}
function fc(v){return '$'+Math.round(v).toLocaleString();}
function toggleModule(m){
if(m==='weather'){if(!S.sell)return;}
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
