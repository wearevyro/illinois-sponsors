// ═══════════════════════════════════════════════════════════════
// Illinois Sponsors — Shared JavaScript
// Powered by Vyro Companies™
// ═══════════════════════════════════════════════════════════════

// ── GAS CONFIG ──
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwC1CJqNYm_1gQSGCL10nvQwMXoD6CzmIZ6RD80FBeI5zPqFVR_VzgbOFcr0otXI_2Q/exec';

// ── DEMO CREDENTIALS (remove after GAS sheet is populated) ──
const DEMO_CREDENTIALS = [
  {
    email: 'demo@raisingcanes.com', code: 'RC2026',
    name: "Raising Cane's Team", tier: 'Gold', company: "Raising Cane's",
    stats: { season:'2025–26', impressions:'24K+', events_done:'12', events_total:'79', next_event_date:'Apr 4', next_event_name:'Varsity Basketball', pa_count:'36', scoreboard_plays:'180', attendance:'24K', partnership_since:'2025', logo_file:'', onepager_file:'', social_kit_file:'', report_file:'' },
    events: [
      { date:'Jan 14, 2026', name:'Home Varsity vs. Lincoln HS', sport:'Basketball', status:'Complete' },
      { date:'Apr 4, 2026',  name:'Home Varsity vs. Naperville HS', sport:'Basketball', status:'Upcoming' },
      { date:'Apr 18, 2026', name:'Spring Track & Field Invitational', sport:'Track & Field', status:'Scheduled' },
      { date:'May 9, 2026',  name:'Regional Soccer Tournament', sport:'Soccer', status:'Scheduled' }
    ]
  },
  {
    email: 'demo@jordanbrand.com', code: 'JB2026',
    name: 'Jordan Brand Team', tier: 'Gold', company: 'Jordan Brand',
    stats: { season:'2025–26', impressions:'18K+', events_done:'8', events_total:'79', next_event_date:'Apr 6', next_event_name:'Varsity Football', pa_count:'24', scoreboard_plays:'120', attendance:'18K', partnership_since:'2025', logo_file:'', onepager_file:'', social_kit_file:'', report_file:'' },
    events: [
      { date:'Feb 2, 2026',  name:'Home Varsity vs. Evanston HS', sport:'Basketball', status:'Complete' },
      { date:'Apr 6, 2026',  name:'Home Varsity vs. Homewood HS', sport:'Football', status:'Upcoming' },
      { date:'May 3, 2026',  name:'State Track Qualifier', sport:'Track & Field', status:'Scheduled' }
    ]
  },
  {
    email: 'demo@obamafoundation.org', code: 'OBF2026',
    name: 'Obama Foundation', tier: 'Silver', company: 'Obama Foundation',
    stats: { season:'2025–26', impressions:'12K+', events_done:'6', events_total:'52', next_event_date:'Apr 10', next_event_name:'Girls Basketball', pa_count:'18', scoreboard_plays:'90', attendance:'12K', partnership_since:'2025', logo_file:'', onepager_file:'', social_kit_file:'', report_file:'' },
    events: [
      { date:'Jan 28, 2026', name:'Girls Varsity vs. Hyde Park HS', sport:'Basketball', status:'Complete' },
      { date:'Apr 10, 2026', name:'Girls Varsity Championship', sport:'Basketball', status:'Upcoming' }
    ]
  },
  {
    email: 'test@test.com', code: 'TEST123',
    name: 'Test Sponsor', tier: 'Bronze', company: 'Test Company',
    stats: { season:'2025–26', impressions:'5K+', events_done:'3', events_total:'32', next_event_date:'Apr 20', next_event_name:'Soccer Match', pa_count:'9', scoreboard_plays:'45', attendance:'5K', partnership_since:'2025', logo_file:'', onepager_file:'', social_kit_file:'', report_file:'' },
    events: [
      { date:'Mar 5, 2026',  name:'Home Varsity Soccer', sport:'Soccer', status:'Complete' },
      { date:'Apr 20, 2026', name:'Home Varsity Soccer', sport:'Soccer', status:'Upcoming' }
    ]
  }
];

// ── TIER PLACEMENTS MAP ──
const TIER_PLACEMENTS = {
  Gold: [
    { tag:'Stadium Scoreboard', name:'Static Sign · 4.5′ × 5.5′',         desc:'Displayed year-round at all home varsity events' },
    { tag:'Video Scoreboard',   name:'30-Second Ad · Varsity Events',      desc:'Plays during pregame, halftime, and postgame' },
    { tag:'Feather Flags',      name:'4 × 10′ Flags · Exterior',           desc:'Positioned at stadium entrance on all event days' },
    { tag:'Banners',            name:'4 × 3′ × 8′ Banners',               desc:'Interior and exterior placement — year-round display' },
    { tag:'Halftime Sponsor',   name:'Logo on Scoreboard · Halftime',      desc:'Your logo featured on the display at every halftime' },
    { tag:'Scrolling Ad',       name:'2′ Scrolling Digital Ad',            desc:'Scrolling display during all varsity sporting events' }
  ],
  Silver: [
    { tag:'Gym Scoreboard',     name:'Static Sign · 3.5′ × 3.5′',         desc:'Displayed year-round at all home gym events' },
    { tag:'Video Scoreboard',   name:'15-Second Ad · Varsity Events',      desc:'Plays during varsity game breaks' },
    { tag:'Feather Flags',      name:'2 × 10′ Flags · Interior Gym',      desc:'Displayed inside the gym on all event days' },
    { tag:'Banners',            name:'2 × 3′ × 8′ Banners',               desc:'Interior and exterior placement — year-round display' },
    { tag:'Scrolling Ad',       name:'2′ Scrolling Digital Ad',            desc:'Scrolling display during varsity sporting events' }
  ],
  Bronze: [
    { tag:'Feather Flag',       name:'1 × 10′ Flag',                       desc:'Displayed interior or exterior on event days' },
    { tag:'Banner',             name:'1 × 3′ × 8′ Banner',                desc:'Interior or exterior — year-round display' },
    { tag:'Scrolling Video Ad', name:'Video Ad · Varsity Events',          desc:'Scrolling video ad during varsity sporting events' }
  ],
  Supporter: [
    { tag:'Banner',             name:'1 × 3′ × 8′ Banner',                desc:'Interior or exterior — year-round display' },
    { tag:'Scrolling Video Ad', name:'Video Ad · Varsity Events',          desc:'Scrolling video scoreboard ad during events' }
  ],
  Donor: [
    { tag:'Banner',             name:'1 × 3′ × 8′ Banner',                desc:'Interior or exterior — year-round display' }
  ]
};

// ── DOM READY ──
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initReveal();
  buildFAQ();
  buildLegalPages();
  // If on portal page, load portal data
  if (document.getElementById('portal-loader')) {
    loadPortal();
  }
});

// ── ACTIVE NAV ──
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links li a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0].split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── SCROLL REVEAL ──
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  reveals.forEach(r => io.observe(r));
}

// ── MODAL ──
function openModal(tier) {
  const wrap = document.getElementById('modal-form-wrap');
  const succ = document.getElementById('modal-success');
  if (wrap) wrap.style.display = 'block';
  if (succ) succ.style.display = 'none';
  const sel = document.getElementById('m-tier');
  if (sel && tier && tier !== 'general' && tier !== 'school') {
    for (let i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === tier) { sel.selectedIndex = i; break; }
    }
  } else if (sel) { sel.selectedIndex = 0; }
  const overlay = document.getElementById('modal');
  if (overlay) { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal() {
  const overlay = document.getElementById('modal');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOutside(e) {
  if (e.target === document.getElementById('modal')) closeModal();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

async function submitForm() {
  const name    = document.getElementById('m-name')?.value.trim();
  const company = document.getElementById('m-company')?.value.trim();
  const email   = document.getElementById('m-email')?.value.trim();
  if (!name || !company || !email) { alert('Please fill in your name, company, and email to continue.'); return; }
  const payload = {
    action: 'inquiry', name, company, email,
    title:    document.getElementById('m-title')?.value.trim()    || '',
    phone:    document.getElementById('m-phone')?.value.trim()    || '',
    website:  document.getElementById('m-website')?.value.trim()  || '',
    tier:     document.getElementById('m-tier')?.value            || '',
    budget:   document.getElementById('m-budget')?.value          || '',
    timeline: document.getElementById('m-timeline')?.value        || '',
    source:   document.getElementById('m-source')?.value          || '',
    message:  document.getElementById('m-message')?.value.trim()  || '',
  };
  try { gasRequest(payload).catch(() => {}); } catch(e) {}
  const wrap = document.getElementById('modal-form-wrap');
  const succ = document.getElementById('modal-success');
  if (wrap) wrap.style.display = 'none';
  if (succ) succ.style.display = 'block';
}

// ── GAS JSONP (CORS-safe — works on GitHub Pages) ──
function gasRequest(params) {
  return new Promise((resolve, reject) => {
    if (!GAS_URL || GAS_URL.includes('YOUR_SCRIPT_ID')) { reject(new Error('GAS not configured')); return; }
    const cbName = '_gasCb_' + Date.now();
    const script = document.createElement('script');
    const timeout = setTimeout(() => { cleanup(); reject(new Error('GAS timeout')); }, 10000);
    function cleanup() { delete window[cbName]; if (script.parentNode) document.body.removeChild(script); clearTimeout(timeout); }
    window[cbName] = (data) => { cleanup(); resolve(data); };
    script.src = GAS_URL + '?' + new URLSearchParams({ ...params, callback: cbName }).toString();
    script.onerror = () => { cleanup(); reject(new Error('Script load failed')); };
    document.body.appendChild(script);
  });
}

// ── LOGIN ──
async function doLogin() {
  const email = document.getElementById('lf-email')?.value.trim().toLowerCase();
  const code  = document.getElementById('lf-pass')?.value.trim();
  if (!email || !code) { showLoginError('Please enter your email and access code.'); return; }

  let userData = null;

  // Try GAS first
  try {
    const resp = await gasRequest({ action: 'auth', email, code });
    if (resp && resp.success) {
      userData = resp; // full object with user + stats + events
    } else {
      // GAS returned error — try demo
      const demo = DEMO_CREDENTIALS.find(c => c.email === email && c.code === code);
      if (!demo) { showLoginError((resp && resp.error) || 'Invalid email or access code.'); return; }
      userData = { success: true, user: demo, stats: demo.stats, events: demo.events };
    }
  } catch(e) {
    // GAS unreachable — use demo credentials
    const demo = DEMO_CREDENTIALS.find(c => c.email === email && c.code === code);
    if (!demo) { showLoginError('Invalid email or access code. Please try again or contact partners@wearevyro.com'); return; }
    userData = { success: true, user: demo, stats: demo.stats, events: demo.events };
  }

  // Store full portal data in session
  sessionStorage.setItem('is_user',   JSON.stringify(userData.user));
  sessionStorage.setItem('is_stats',  JSON.stringify(userData.stats  || {}));
  sessionStorage.setItem('is_events', JSON.stringify(userData.events || []));

  window.location.href = 'portal.html';
}

function showLoginError(msg) {
  const el = document.getElementById('login-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

function doLogout() {
  sessionStorage.removeItem('is_user');
  sessionStorage.removeItem('is_stats');
  sessionStorage.removeItem('is_events');
  window.location.href = 'index.html';
}

// ── PORTAL LOADER ──
function loadPortal() {
  const rawUser   = sessionStorage.getItem('is_user');
  const rawStats  = sessionStorage.getItem('is_stats');
  const rawEvents = sessionStorage.getItem('is_events');

  if (!rawUser) { window.location.href = 'login.html'; return; }

  const user   = JSON.parse(rawUser);
  const stats  = rawStats  ? JSON.parse(rawStats)  : {};
  const events = rawEvents ? JSON.parse(rawEvents) : [];

  // Hide loader, show first tab
  document.getElementById('portal-loader').style.display = 'none';

  // Header bar
  setText('portal-name',      user.company || user.name);
  setText('portal-tier-badge', user.tier.toUpperCase() + ' PARTNER');
  setText('portal-firstname',  (user.name || '').split(' ')[0]);

  // Overview stats
  setText('ov-season',      stats.season      || '2025–26');
  setText('ov-impressions', stats.impressions  || '—');
  setText('ov-events',      stats.events_done ? `${stats.events_done}/${stats.events_total}` : '—');
  setText('ov-next-date',   stats.next_event_date || '—');
  setText('ov-next-name',   stats.next_event_name || '—');

  // Press kit
  buildPressKit(user, stats);

  // Placements
  buildPlacements(user.tier);

  // Events
  buildEvents(events, stats.season);

  // Reports
  setText('rp-attendance',      stats.attendance      || '—');
  setText('rp-attendance-note', stats.events_done ? `Across ${stats.events_done} events this season` : 'No events recorded yet');
  setText('rp-pa',              stats.pa_count         || '—');
  setText('rp-scoreboard',      stats.scoreboard_plays || '—');

  // Report download link
  const dlBtn = document.getElementById('rp-download-btn');
  if (dlBtn && stats.report_file) {
    dlBtn.href = `assets/downloads/${stats.report_file}`;
    dlBtn.target = '_blank';
    dlBtn.removeAttribute('download');
  }

  // Show overview tab
  showPortalTab('overview');
}

// ── PRESS KIT BUILDER ──
function buildPressKit(user, stats) {
  const company = user.company || user.name;
  const tier    = user.tier;
  const since   = stats.partnership_since || '2025';
  const season  = stats.season || '2025–26';
  const impr    = stats.impressions || 'thousands of';
  const events  = stats.events_total || 'multiple';

  setText('pk-company-name', company);

  // Short boilerplate
  const short = `${company} is a proud ${tier} Tier partner of Illinois Sponsors, powered by Vyro Companies™ — supporting Illinois school athletics and connecting their brand to communities across the state.`;

  // Full boilerplate
  const full = `${company} is proud to partner with Illinois Sponsors as a ${tier} Tier sponsor, supporting Illinois school athletics through premium brand visibility, community engagement, and investment in the next generation of student athletes. Since ${since}, this partnership — facilitated through Vyro Companies™ — has placed ${company} at the heart of Illinois community sports. Through the ${season} season, ${company} has reached ${impr} impressions across ${events} varsity events, delivering consistent brand presence from stadium scoreboards to community activations statewide.`;

  setText('pk-boilerplate-short', short);
  setText('pk-boilerplate-full',  full);

  // Social caption
  const social = `Proud to support Illinois student athletes as an Illinois Sponsors ${tier} Partner! 🏆 Through our partnership with @IllinoisSponsors and @Vyro, we're bringing our brand to schools and communities across the state — because investing in the next generation is what we're all about. #IllinoisSponsors #VyroCompanies #CommunityFirst #IllinoisSports`;
  setText('pk-social-copy', social);

  // Stats list
  const statsList = document.getElementById('pk-stats-list');
  if (statsList) {
    const rows = [
      ['Tier',                tier],
      ['Season',              season],
      ['Annual Impressions',  stats.impressions || '—'],
      ['Events Sponsored',    stats.events_total ? `${stats.events_total}/yr` : '—'],
      ['PA Announcements',    stats.pa_count || '—'],
      ['Scoreboard Ad Plays', stats.scoreboard_plays || '—'],
      ['Partnership Since',   since],
    ];
    statsList.innerHTML = rows.map(([label, val]) => `
      <div class="stat-row">
        <span style="font-size:11px;font-weight:300;color:var(--faint)">${label}</span>
        <span style="font-size:13px;font-weight:900;color:var(--white)">${val}</span>
      </div>`).join('');
  }

  // Downloads list
  const dlList = document.getElementById('pk-downloads-list');
  if (dlList) {
    const files = [
      { label: 'Logo Pack (.ZIP)',           file: stats.logo_file,     fallback: `mailto:partners@wearevyro.com?subject=Logo Pack Request - ${company}` },
      { label: 'Partnership One-Pager (.PDF)', file: stats.onepager_file, fallback: `mailto:partners@wearevyro.com?subject=One-Pager Request - ${company}` },
      { label: 'Season Impact Report (.PDF)', file: stats.report_file,   fallback: `mailto:partners@wearevyro.com?subject=Impact Report Request - ${company}` },
      { label: 'Social Kit (.ZIP)',           file: stats.social_kit_file, fallback: `mailto:partners@wearevyro.com?subject=Social Kit Request - ${company}` },
    ];
    dlList.innerHTML = files.map(f => {
      const href = f.file ? `assets/downloads/${f.file}` : f.fallback;
      const label = f.file ? '↓ Download' : '✉ Request';
      return `<a href="${href}" ${f.file ? 'target="_blank"' : ''} class="pk-file-row"><span>${f.label}</span><em>${label}</em></a>`;
    }).join('');
  }
}

// ── PLACEMENTS BUILDER ──
function buildPlacements(tier) {
  setText('pl-tier-label', tier);
  const grid = document.getElementById('placements-grid');
  if (!grid) return;
  const placements = TIER_PLACEMENTS[tier] || TIER_PLACEMENTS['Donor'];
  grid.innerHTML = placements.map(p => `
    <div style="background:var(--ink);padding:36px">
      <div style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--blue-bright);margin-bottom:8px">${p.tag}</div>
      <div style="font-size:15px;font-weight:800;color:var(--white);margin-bottom:8px">${p.name}</div>
      <div style="font-size:12px;font-weight:300;color:var(--faint);margin-bottom:14px">${p.desc}</div>
      <span style="font-size:8px;font-weight:800;letter-spacing:2px;text-transform:uppercase;background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.25);color:var(--blue-bright);padding:5px 10px">Active</span>
    </div>`).join('');
}

// ── EVENTS BUILDER ──
function buildEvents(events, season) {
  setText('ev-season-label', season || '2025–26');
  const list = document.getElementById('events-list');
  if (!list) return;
  if (!events || events.length === 0) {
    list.innerHTML = `<div style="background:var(--ink);padding:28px;text-align:center;font-size:13px;font-weight:300;color:var(--faint)">No events scheduled yet. Add events in the Portal Events tab of your Google Sheet.</div>`;
    return;
  }
  list.innerHTML = events.map(ev => {
    const isUpcoming = ev.status === 'Upcoming';
    const isComplete = ev.status === 'Complete';
    let badge, dateStyle;
    if (isComplete) {
      badge = `<span style="font-size:8px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#4ade80;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);padding:4px 8px">Complete</span>`;
      dateStyle = 'font-size:11px;font-weight:600;color:var(--faint)';
    } else if (isUpcoming) {
      badge = `<span style="font-size:8px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--blue-bright);background:var(--blue-dim);border:1px solid rgba(59,130,246,0.3);padding:4px 8px">Upcoming</span>`;
      dateStyle = 'font-size:11px;font-weight:600;color:var(--blue-bright)';
    } else {
      badge = `<span style="font-size:8px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--faint);background:var(--ghost);border:1px solid var(--line);padding:4px 8px">Scheduled</span>`;
      dateStyle = 'font-size:11px;font-weight:600;color:var(--faint)';
    }
    return `
      <div style="display:grid;grid-template-columns:130px 1fr 140px 110px;background:var(--ink);padding:20px 28px;gap:20px;align-items:center;${isUpcoming ? 'border:1px solid rgba(59,130,246,0.2)' : ''}">
        <div style="${dateStyle}">${ev.date}</div>
        <div style="font-size:13px;font-weight:${isUpcoming ? '800' : '700'};color:var(--white)">${ev.name}</div>
        <div style="font-size:11px;font-weight:300;color:var(--faint)">${ev.sport}</div>
        ${badge}
      </div>`;
  }).join('');
}

// ── PORTAL TABS ──
function showPortalTab(tab) {
  document.querySelectorAll('.portal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.portal-content').forEach(c => c.style.display = 'none');
  const btn     = document.getElementById('ptab-' + tab);
  const content = document.getElementById('ptab-content-' + tab);
  if (btn)     btn.classList.add('active');
  if (content) content.style.display = 'block';
}

// ── COPY TEXT ──
function copyText(id) {
  const el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard.writeText(el.textContent).then(() => {
    const original = el.style.borderColor;
    el.style.borderColor = 'rgba(59,130,246,0.6)';
    setTimeout(() => { el.style.borderColor = original; }, 1200);
  });
}

// kept for backwards compat
function copyBoilerplate() { copyText('pk-boilerplate-full'); }
function mockDownload(filename) { window.location.href = 'mailto:partners@wearevyro.com?subject=Asset Request: ' + filename; }

// ── HELPERS ──
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ── FAQ ──
const FAQ_DATA = [
  { q: 'How does the sponsorship placement process work?', a: 'Once you select a tier and submit your inquiry, our Vyro team handles everything — creative coordination, material production guidance, physical installation, and digital setup. You approve the creative, we handle the placement. Sponsors are responsible for the cost of advertising materials, and Vyro manages all logistics.' },
  { q: 'Who installs and maintains the signage?', a: 'Vyro coordinates all placement and installation in partnership with school athletic staff. All advertising materials stay displayed for the entire school year. If anything needs to be updated or repaired mid-season, contact your Vyro partner manager directly.' },
  { q: 'What happens if a school has lower-than-expected attendance?', a: 'Attendance figures in our materials reflect historical averages across all partner schools. Individual events vary. Our commitment is to maximize your placement visibility across all events in your tier — we do not issue credits for individual event attendance.' },
  { q: 'What are the commitment terms for Gold and Silver tiers?', a: 'Gold and Silver packages require a three-year commitment. This ensures your brand has consistent, deep presence across multiple seasons — which is where the compounding visibility effect kicks in. Bronze, Supporter, and Donor tiers are annual commitments.' },
  { q: 'What does Vyro handle versus what does the sponsor handle?', a: 'Sponsors are responsible for the cost of advertising materials and providing approved brand assets. Vyro handles all creative coordination, placement logistics, school relationships, PA scheduling, digital amplification, and seasonal reporting.' },
  { q: 'Can I choose which schools my brand is placed at?', a: 'Gold and Silver tier sponsors may request preferred schools or regions, subject to availability. We work to match sponsors with schools that align with their target community. Final placement is coordinated by Vyro to ensure equitable distribution across the network.' },
  { q: 'How do I access my sponsor portal and press kit?', a: 'Once your partnership is active, you receive an email with your portal access code. Use your business email and that code to sign in at illinoissponsors.com/login.html. Your portal includes your auto-generated press kit, placement details, event schedule, and seasonal impact reports.' },
  { q: 'Is there a minimum donation amount?', a: 'There is no formal minimum for individual donations. We list suggested tiers starting at $100 to help donors understand the impact of their contribution. All donations go directly toward Illinois school athletic programs.' },
  { q: "How do I get my access code if I've lost it?", a: "Contact partners@wearevyro.com with your business email address and company name. We'll verify your partnership and issue a new access code within one business day." },
  { q: 'Can sponsorships be co-sponsored by multiple brands?', a: 'Currently each sponsorship placement is single-brand. However, if you\'re interested in a collaborative activation with another brand, contact us — we can explore custom arrangements at the Gold tier level.' },
];

function buildFAQ() {
  const container = document.getElementById('faq-list');
  if (!container) return;
  container.innerHTML = FAQ_DATA.map((item, i) => `
    <div class="faq-item" id="faq-${i}">
      <div class="faq-q" onclick="toggleFAQ(${i})">
        <div class="faq-q-text">${item.q}</div>
        <div class="faq-icon"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>
      </div>
      <div class="faq-a">${item.a}</div>
    </div>`).join('');
}
function toggleFAQ(i) {
  const item = document.getElementById('faq-' + i);
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── DONATE ──
function selectDonate(el, amount) {
  document.querySelectorAll('.donate-tier').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  const form = document.getElementById('donate-form');
  if (form) form.style.display = 'block';
  const customWrap = document.getElementById('donate-custom-wrap');
  if (customWrap) customWrap.style.display = amount === 'custom' ? 'block' : 'none';
  const display = document.getElementById('donate-amount-display');
  if (display) display.textContent = amount === 'custom' ? 'Custom Amount' : 'Selected: $' + amount;
}
function submitDonate() {
  const name  = document.getElementById('donate-name')?.value.trim();
  const email = document.getElementById('donate-email')?.value.trim();
  if (!name || !email) { alert('Please enter your name and email.'); return; }
  const form = document.getElementById('donate-form');
  const succ = document.getElementById('donate-success');
  if (form) form.style.display = 'none';
  if (succ) succ.style.display = 'block';
}

// ── LEGAL PAGES ──
const PRIVACY_SECTIONS = [
  ['Information We Collect', 'Illinois Sponsors collects information you provide directly to us, including name, email address, company name, phone number, and any other information you choose to provide when submitting an inquiry form, donating, or accessing the sponsor portal. We do not collect payment information directly — payment processing is handled externally.'],
  ['How We Use Your Information', 'We use the information we collect to respond to sponsorship and donation inquiries, communicate about partnership opportunities, provide access to the sponsor portal, send relevant updates about events and activations, and improve our services. We do not sell your information to third parties.'],
  ['Information Sharing', 'Illinois Sponsors, operated by Vyro Companies™, does not sell, rent, or share your personal information with third parties for their marketing purposes. We may share information with service providers who assist in our operations, subject to confidentiality agreements.'],
  ['Data Security', 'We take reasonable measures to protect your information from unauthorized access. Sponsor portal access is protected by individual access codes. However, no method of transmission over the internet is 100% secure.'],
  ['Contact Us', 'For privacy questions or requests, contact us at partners@wearevyro.com. We will respond within 5 business days.'],
];
const TERMS_SECTIONS = [
  ['Acceptance of Terms', 'By accessing or using the Illinois Sponsors website, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.'],
  ['Sponsorship Agreements', 'Sponsorship commitments are formalized through separate written agreements between the sponsor and Vyro Companies™. Information on this website is for general purposes and does not constitute a binding offer. Pricing, availability, and terms are subject to change.'],
  ['Sponsor Responsibilities', 'Sponsors are responsible for the cost of advertising materials, providing approved brand assets, and complying with all applicable laws. All placements are subject to approval by Illinois Sponsors and the relevant school administration.'],
  ['Intellectual Property', 'All content on this site, including text, design, and graphics, is the property of Vyro Companies™ or its partners. You may not reproduce, distribute, or create derivative works without written permission.'],
  ['Limitation of Liability', 'Illinois Sponsors and Vyro Companies™ are not liable for indirect, incidental, or consequential damages arising from your use of this website or participation in sponsorship programs.'],
  ['Governing Law', 'These terms are governed by the laws of the State of Illinois. Any disputes shall be resolved in Illinois courts.'],
  ['Contact', 'For questions about these terms, contact partners@wearevyro.com.'],
];
function buildLegalPages() {
  const build = (id, sections) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = sections.map(([title, body]) => `
      <div style="margin-bottom:48px">
        <div style="font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--blue-bright);margin-bottom:12px">${title}</div>
        <p style="font-size:14px;font-weight:300;color:var(--dim);line-height:1.9">${body}</p>
      </div>`).join('');
  };
  build('privacy-content', PRIVACY_SECTIONS);
  build('terms-content',   TERMS_SECTIONS);
}
