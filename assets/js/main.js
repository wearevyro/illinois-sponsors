// ═══════════════════════════════════════════════════════════════
// Illinois Sponsors — main.js
// Newly Acquired By Vyro Companies™
// ═══════════════════════════════════════════════════════════════

// ── INQUIRY ENDPOINT (FormSubmit → contact@illinoissponsors.com) ──
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/contact@illinoissponsors.com';

// ── DOM READY ──
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initMobileNav();
  initReveal();
  buildFAQ();
  buildLegalPages();
});

// ── MOBILE NAV ──
function initMobileNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const links = nav.querySelector('.nav-links');
  const right = nav.querySelector('.nav-right');
  if (!links) return;
  const btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-label', 'Toggle menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span>';
  if (right) nav.insertBefore(btn, right); else nav.appendChild(btn);
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── ACTIVE NAV ──
function setActiveNav() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  if (parts.length > 1 && parts[parts.length - 1] === 'index.html') parts.pop();
  const current = parts.length ? parts[parts.length - 1] : 'index.html';
  const nested = parts.length > 1 ? parts.join('/') : null;
  const section = parts.length > 1 ? parts[0] : null;
  document.querySelectorAll('.nav-links li a').forEach(a => {
    const base = (a.getAttribute('href') || '').split('#')[0].replace(/^\//, '').replace(/\/$/, '');
    if (base === current || (parts.length === 0 && base === 'index.html')) a.classList.add('active');
    if (nested && base === nested) a.classList.add('active');
    if (section && base === section + '.html') a.classList.add('active');
  });
}

// ── SCROLL REVEAL ──
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
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
  if (sel && tier && tier !== 'general') {
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
  if (!name || !company || !email) {
    alert('Please fill in your name, company, and email to continue.');
    return;
  }
  const payload = {
    action:   'inquiry',
    name,
    company,
    email,
    title:    document.getElementById('m-title')?.value.trim()    || '',
    phone:    document.getElementById('m-phone')?.value.trim()    || '',
    website:  document.getElementById('m-website')?.value.trim()  || '',
    tier:     document.getElementById('m-tier')?.value            || '',
    budget:   document.getElementById('m-budget')?.value          || '',
    timeline: document.getElementById('m-timeline')?.value        || '',
    source:   document.getElementById('m-source')?.value          || '',
    message:  document.getElementById('m-message')?.value.trim()  || '',
  };
  try { sendInquiry(payload).catch(() => {}); } catch(e) {}
  const wrap = document.getElementById('modal-form-wrap');
  const succ = document.getElementById('modal-success');
  if (wrap) wrap.style.display = 'none';
  if (succ) succ.style.display = 'block';
}

// ── FORM TRANSPORT (FormSubmit AJAX — works from static GitHub Pages) ──
function sendInquiry(params) {
  return fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      _subject: 'Illinois Sponsors — new ' + (params.action || 'inquiry'),
      _template: 'table',
      ...params,
    }),
  }).then(r => r.json());
}

// ── FAQ ──
const FAQ_DATA = [
  // General
  { q: 'What is Illinois Sponsors?', a: 'Illinois Sponsors is a sports, media, entertainment, and community influence company. We build visibility through partnerships, activations, sponsorships, and cultural engagement — helping brands, businesses, organizations, and initiatives connect with real Illinois communities at every level. We are part of Vyro Companies™.' },
  { q: 'Who can become a sponsor or partner?', a: 'Any brand, business, or organization that wants to connect with Illinois communities is a fit. We work with local businesses, regional brands, national companies, nonprofits, and community initiatives — across sports, entertainment, media, and cultural programming. If you want real community presence in Illinois, we can build something.' },
  { q: 'How do I get started?', a: 'Fill out the inquiry form on our site or email us directly at contact@illinoissponsors.com. Our team responds within 24 hours with options tailored to your goals, budget, and target audience. No commitment required to start the conversation.' },
  { q: 'How does the partnership process work?', a: 'You tell us your goals, budget, and audience. We build a custom package from our catalog — selecting the right combination of placements, activations, and media options to match exactly what you need. Once you approve, Vyro handles all creative coordination, logistics, and execution. You review and approve all creative before anything goes live.' },
  { q: 'How long does it take to go live?', a: 'Once your agreement is finalized and brand assets are submitted, Vyro begins coordination within two weeks. Most partnerships are fully activated within 30 days of signing.' },
  // Sports
  { q: 'What sports and athletic events do you cover?', a: 'We cover 12+ sports and disciplines across Illinois — Football, Basketball, Soccer, Track & Field, Volleyball, Baseball, Softball, Wrestling, Swimming, Cross Country, Tennis, Cheer & Dance, and multi-sport tournaments. Both high school and independent athletic events are part of our network.' },
  { q: 'Can I sponsor just one sport or one school?', a: 'Yes. Our catalog is designed to be flexible. You can sponsor a single sport, a single school, a single event, or a combination — you are not locked into a fixed package. We build around your goals.' },
  { q: 'What do school partners receive from the program?', a: 'School partners receive direct revenue that flows toward athletic programming — equipment, travel, uniforms, and operational costs. Vyro handles all creative, installation, and partner management so there is zero administrative burden on the school. Partners also participate in scholarship and recognition programs that benefit students directly.' },
  // Entertainment
  { q: 'Does Illinois Sponsors work in entertainment, not just sports?', a: 'Absolutely. Entertainment is a core pillar. We work with live music events, concerts, cultural festivals, film and TV productions, red carpet and premiere placements, entertainment venues, and talent partnerships with Illinois-based artists, performers, and creators. Sports and entertainment are equally part of what we do.' },
  { q: 'Can my brand be associated with musicians or entertainers?', a: 'Yes. We facilitate brand association with Illinois-based entertainers, musicians, and performers through endorsement content, event co-appearances, and social amplification. We also coordinate Creator Content Series and Brand Ambassador packages that extend across both sports and entertainment talent.' },
  { q: 'What types of entertainment events can we sponsor?', a: 'Concerts, live music showcases, cultural festivals, film premieres, award ceremonies, red carpet events, and Illinois Sponsors\' own entertainment productions. On-site activation, stage branding, social coverage, and VIP experiences are all available across our entertainment event network.' },
  // Media
  { q: 'What media placements are available?', a: 'We offer broadcast mentions and voiceovers, podcast sponsorships, brand storytelling series, film and TV integration, presenting sponsorships of Illinois Sponsors media properties, press and editorial co-branding, digital social posts, email newsletter placements, highlight reel sponsorships, and live event social coverage.' },
  { q: 'Can my brand be featured in broadcast or livestream coverage?', a: 'Yes. Broadcast mentions, sponsor voiceovers, and pre/post-roll brand placement in official game and event broadcasts are available. Coverage runs live and on replay across all distribution channels — reaching viewers beyond the venue.' },
  // Process & Logistics
  { q: 'What does Illinois Sponsors handle vs. what does the sponsor handle?', a: 'Sponsors provide approved brand assets and cover the cost of advertising materials. Illinois Sponsors — through Vyro — handles all creative coordination, placement logistics, partner relationships, installation, digital amplification, and performance reporting. Our goal is zero operational burden on the sponsor.' },
  { q: 'How is performance measured and reported?', a: 'Sponsors receive performance reporting that covers reach, event attendance, social engagement, media coverage, and placement visibility. Reporting frequency depends on the package — some include quarterly reports, others include a full season recap and impact summary at year end.' },
  { q: 'Can multiple brands co-sponsor an event or placement?', a: 'Certain event and activation placements allow for multiple non-competing sponsors. Single-brand exclusivity is available at the presenting sponsor level. Contact us to discuss what structure works best for your goals.' },
  { q: 'Is there a minimum investment to get started?', a: 'We have options at multiple investment levels — from individual social posts and newsletter placements to full-season presenting sponsorships. There is no minimum to start a conversation. Tell us your budget range and we will find the right fit from the catalog.' },
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
  const payload = {
    action:  'donation',
    name,
    email,
    amount:  document.getElementById('donate-amount-display')?.textContent || '',
    custom:  document.getElementById('donate-custom')?.value.trim() || '',
    message: document.getElementById('donate-msg')?.value.trim() || '',
  };
  try { sendInquiry(payload).catch(() => {}); } catch(e) {}
  const form = document.getElementById('donate-form');
  const succ = document.getElementById('donate-success');
  if (form) form.style.display = 'none';
  if (succ) succ.style.display = 'block';
}

// ── LEGAL PAGES ──
const PRIVACY_SECTIONS = [
  ['Information We Collect', 'Illinois Sponsors collects information you provide directly to us, including name, email address, company name, phone number, and any other information you choose to provide when submitting an inquiry form or donating. We do not collect payment information directly.'],
  ['How We Use Your Information', 'We use the information we collect to respond to sponsorship and donation inquiries, communicate about partnership opportunities, send relevant updates about events and activations, and improve our services. We do not sell your information to third parties.'],
  ['Information Sharing', 'Illinois Sponsors, operated by Vyro Companies™, does not sell, rent, or share your personal information with third parties for their marketing purposes. We may share information with service providers who assist in our operations, subject to confidentiality agreements.'],
  ['Data Security', 'We take reasonable measures to protect your information from unauthorized access. However, no method of transmission over the internet is 100% secure.'],
  ['Contact Us', 'For privacy questions or requests, contact us at contact@illinoissponsors.com. We will respond within 5 business days.'],
];

const TERMS_SECTIONS = [
  ['Acceptance of Terms', 'By accessing or using the Illinois Sponsors website, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.'],
  ['Sponsorship Agreements', 'Sponsorship commitments are formalized through separate written agreements between the sponsor and Vyro Companies™. Information on this website is for general purposes and does not constitute a binding offer. Pricing, availability, and terms are subject to change.'],
  ['Sponsor Responsibilities', 'Sponsors are responsible for the cost of advertising materials, providing approved brand assets, and complying with all applicable laws. All placements are subject to approval by Illinois Sponsors and the relevant school administration.'],
  ['Intellectual Property', 'All content on this site, including text, design, and graphics, is the property of Vyro Companies™ or its partners. You may not reproduce, distribute, or create derivative works without written permission.'],
  ['Limitation of Liability', 'Illinois Sponsors and Vyro Companies™ are not liable for indirect, incidental, or consequential damages arising from your use of this website or participation in sponsorship programs.'],
  ['Governing Law', 'These terms are governed by the laws of the State of Illinois. Any disputes shall be resolved in Illinois courts.'],
  ['Contact', 'For questions about these terms, contact contact@illinoissponsors.com.'],
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

// ── PLAYON SKIN ENHANCEMENTS ──
(function(){
  var nav = document.querySelector('.nav');
  var bar = document.querySelector('.po-progress');
  function onScroll(){
    if(nav) nav.classList.toggle('stuck', window.scrollY > 40);
    if(bar){
      var h = document.documentElement;
      var p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.width = (p*100).toFixed(2) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // count-up figures
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var figs = document.querySelectorAll('[data-count]');
  if(figs.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var prefix = el.getAttribute('data-prefix') || '';
        var sfx = el.getAttribute('data-suffix') || '';
        var dec = (target % 1 !== 0) ? 1 : 0;
        if(reduced){ el.innerHTML = prefix + target.toFixed(dec) + (sfx?'<span class="sfx">'+sfx+'</span>':''); return; }
        var start = null, dur = 1400;
        function step(ts){
          if(!start) start = ts;
          var k = Math.min(1, (ts - start) / dur);
          var v = (target) * (1 - Math.pow(1 - k, 3));
          el.innerHTML = prefix + v.toFixed(dec) + (sfx?'<span class="sfx">'+sfx+'</span>':'');
          if(k < 1) requestAnimationFrame(step);
          else el.innerHTML = prefix + target.toFixed(dec) + (sfx?'<span class="sfx">'+sfx+'</span>':'');
        }
        requestAnimationFrame(step);
      });
    }, {threshold:0.4});
    figs.forEach(function(f){ io.observe(f); });
  }

  // hero headline lines: JS-driven so a JS failure leaves them visible
  var heroLines = document.querySelectorAll('.po-hero .line > span');
  if(heroLines.length && !reduced){
    heroLines.forEach(function(s){ s.style.transform = 'translateY(110%)'; });
    requestAnimationFrame(function(){ requestAnimationFrame(function(){
      heroLines.forEach(function(s,i){
        s.style.transition = 'transform .9s cubic-bezier(.16,1,.3,1) ' + (0.08 + i*0.11) + 's';
        s.style.transform = 'translateY(0)';
      });
    });});
  }
})();
