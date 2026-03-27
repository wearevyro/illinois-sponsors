// ═══════════════════════════════════════════════════════════════
// Illinois Sponsors — Shared JavaScript
// Powered by Vyro Companies™
// ═══════════════════════════════════════════════════════════════

// ── GAS CONFIG ──
// Replace with your deployed Google Apps Script Web App URL
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwC1CJqNYm_1gQSGCL10nvQwMXoD6CzmIZ6RD80FBeI5zPqFVR_VzgbOFcr0otXI_2Q/exec';

const DEMO_CREDENTIALS = [
  { email: 'demo@raisingcanes.com',    code: 'RC2026',  name: "Raising Cane's Team", tier: 'Gold',      company: "Raising Cane's"   },
  { email: 'demo@jordanbrand.com',     code: 'JB2026',  name: 'Jordan Brand Team',   tier: 'Gold',      company: 'Jordan Brand'     },
  { email: 'demo@obamafoundation.org', code: 'OBF2026', name: 'Obama Foundation',    tier: 'Silver',    company: 'Obama Foundation' },
  { email: 'test@test.com',            code: 'TEST123', name: 'Test Sponsor',        tier: 'Bronze',    company: 'Test Company'     },
];

// ── ACTIVE NAV LINK ──
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links li a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === 'index.html' && href === '/') || href.includes(path)) {
      a.classList.add('active');
    }
  });
  initReveal();
  buildFAQ();
  buildLegalPages();
  initDonate();
});

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
    const timeout = setTimeout(() => { cleanup(); reject(new Error('GAS timeout')); }, 8000);
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

  let user = null;
  try {
    const resp = await gasRequest({ action: 'auth', email, code });
    if (resp && resp.success) user = resp.user;
    else { showLoginError((resp && resp.error) || 'Invalid email or access code.'); return; }
  } catch(e) {
    const demo = DEMO_CREDENTIALS.find(c => c.email === email && c.code === code);
    if (!demo) { showLoginError('Invalid email or access code. Please try again or contact partners@wearevyro.com'); return; }
    user = demo;
  }

  sessionStorage.setItem('is_user', JSON.stringify(user));
  window.location.href = 'portal.html';
}

function showLoginError(msg) {
  const el = document.getElementById('login-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

function doLogout() {
  sessionStorage.removeItem('is_user');
  window.location.href = 'index.html';
}

// ── PORTAL ──
function loadPortal() {
  const raw = sessionStorage.getItem('is_user');
  if (!raw) { window.location.href = 'login.html'; return; }
  const user = JSON.parse(raw);
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('portal-name', user.company || user.name);
  set('portal-firstname', user.name.split(' ')[0]);
  set('portal-tier-badge', user.tier.toUpperCase() + ' PARTNER');
  set('pk-company-name', user.company || user.name);
  set('pk-tier-stat', user.tier.toUpperCase());
  const bp = document.getElementById('pk-boilerplate');
  if (bp) bp.textContent = `${user.company} is proud to partner with Illinois Sponsors as a ${user.tier} Tier sponsor, supporting Illinois school athletics through premium brand visibility, community engagement, and investment in the next generation of student athletes. This partnership, facilitated through Vyro Companies™, places ${user.company} at the heart of Illinois community sports — from stadium scoreboards to varsity events statewide.`;
  showPortalTab('overview');
}

function showPortalTab(tab) {
  document.querySelectorAll('.portal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.portal-content').forEach(c => c.classList.remove('active'));
  const btn = document.getElementById('ptab-' + tab);
  const content = document.getElementById('ptab-content-' + tab);
  if (btn) btn.classList.add('active');
  if (content) content.classList.add('active');
}

function copyBoilerplate() {
  const text = document.getElementById('pk-boilerplate')?.textContent;
  if (text) navigator.clipboard.writeText(text).then(() => alert('Boilerplate copied to clipboard.'));
}

function mockDownload(filename) {
  window.location.href = 'mailto:partners@wearevyro.com?subject=Asset Request: ' + filename;
}

// ── FAQ ──
const FAQ_DATA = [
  { q: 'How does the sponsorship placement process work?', a: 'Once you select a tier and submit your inquiry, our Vyro team handles everything — creative coordination, material production guidance, physical installation, and digital setup. You approve the creative, we handle the placement. Sponsors are responsible for the cost of advertising materials, and Vyro manages all logistics.' },
  { q: 'Who installs and maintains the signage?', a: 'Vyro coordinates all placement and installation in partnership with school athletic staff. All advertising materials stay displayed for the entire school year. If anything needs to be updated or repaired mid-season, contact your Vyro partner manager directly.' },
  { q: 'What happens if a school has lower-than-expected attendance?', a: 'Attendance figures in our materials reflect historical averages across all partner schools. Individual events vary. Our commitment is to maximize your placement visibility across all events in your tier — we do not issue credits for individual event attendance.' },
  { q: 'What are the commitment terms for Gold and Silver tiers?', a: 'Gold and Silver packages require a three-year commitment. This ensures your brand has consistent, deep presence across multiple seasons — which is where the compounding visibility effect kicks in. Bronze, Supporter, and Donor tiers are annual commitments.' },
  { q: 'What does Vyro handle versus what does the sponsor handle?', a: 'Sponsors are responsible for the cost of advertising materials and providing approved brand assets (logos, ad creatives). Vyro handles all creative coordination, placement logistics, school relationships, PA scheduling, digital amplification, and seasonal reporting.' },
  { q: 'Can I choose which schools my brand is placed at?', a: 'Gold and Silver tier sponsors may request preferred schools or regions, subject to availability. We work to match sponsors with schools that align with their target community. Final placement is coordinated by Vyro to ensure equitable distribution across the network.' },
  { q: 'How do I access my sponsor portal and press kit?', a: 'Once your partnership is active, you receive an email with your portal access code. Use your business email and that code to sign in at illinoissponsors.com/login. Your portal includes your press kit, placement details, event schedule, and seasonal impact reports.' },
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
let selectedDonateAmount = null;

function initDonate() {
  // auto-init if donate tiers exist on page
}

function selectDonate(el, amount) {
  document.querySelectorAll('.donate-tier').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  selectedDonateAmount = amount;
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
  const buildSection = (id, sections) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = sections.map(([title, body]) => `
      <div style="margin-bottom:48px">
        <div style="font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--blue-bright);margin-bottom:12px">${title}</div>
        <p style="font-size:14px;font-weight:300;color:var(--dim);line-height:1.9">${body}</p>
      </div>`).join('');
  };
  buildSection('privacy-content', PRIVACY_SECTIONS);
  buildSection('terms-content', TERMS_SECTIONS);
}
