#!/usr/bin/env python3
"""Generate dedicated sub-pages for every nav dropdown item.
Run from repo root: python3 build_subpages.py
"""
import os

# ── Shared chrome (absolute paths — pages live in subdirectories) ──

HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
<div class="util"><strong>Illinois Sponsors</strong><span>Sports · Media · Sponsorship · Advisory</span><strong>contact@illinoissponsors.com</strong></div>
<nav class="nav">
  <a href="/index.html" class="nav-logo"><span class="logo-il">ILLINOIS</span><span class="logo-sp">SPONSORS</span></a>
  <ul class="nav-links">
    <li class="has-sub"><a href="/what-we-do.html">What We Do</a>
      <ul class="sub">
        <li><a href="/what-we-do/media/">Media</a></li>
        <li><a href="/what-we-do/sponsorship/">Sponsorship</a></li>
        <li><a href="/what-we-do/advisory/">Advisory &amp; Services</a></li>
      </ul>
    </li>
    <li class="has-sub"><a href="/who-we-serve.html">Who We Serve</a>
      <ul class="sub">
        <li><a href="/who-we-serve/pro/">Pro</a></li>
        <li><a href="/who-we-serve/college/">College</a></li>
        <li><a href="/who-we-serve/youth/">Youth</a></li>
        <li><a href="/who-we-serve/brands/">Brands</a></li>
      </ul>
    </li>
    <li><a href="/how-we-win.html">How We Win</a></li>
    <li><a href="/catalog.html">Catalog</a></li>
    <li><a href="/thought-leadership.html">Thought Leadership</a></li>
    <li><a href="/news.html">News</a></li>
    <li class="has-sub"><a href="/about.html">About</a>
      <ul class="sub">
        <li><a href="/about/mission/">Our Mission</a></li>
        <li><a href="/contact.html">Contact</a></li>
        <li><a href="/faq.html">FAQ</a></li>
      </ul>
    </li>
    <li><a href="/careers.html">Careers</a></li>
  </ul>
  <div class="nav-right">
    <a href="#" class="btn-blue" onclick="openModal('{tier}');return false;">Partner With Us</a>
  </div>
</nav>
"""

FOOTER = """<footer class="footer">
  <div class="footer-grid">
    <div>
      <a href="/index.html" class="f-logo"><span class="logo-il">ILLINOIS</span><span class="logo-sp">SPONSORS</span></a>
      <p class="f-desc">Your brand expansion team. We help brands enter and grow across sports, music, and entertainment through licensing, NIL, sponsorships, and strategic partnerships.</p>
    </div>
    <div class="f-col"><h5>What We Do</h5><ul>
      <li><a href="/what-we-do/media/">Media</a></li>
      <li><a href="/what-we-do/sponsorship/">Sponsorship</a></li>
      <li><a href="/what-we-do/advisory/">Advisory &amp; Services</a></li>
      <li><a href="/catalog.html">Catalog</a></li>
    </ul></div>
    <div class="f-col"><h5>Who We Serve</h5><ul>
      <li><a href="/who-we-serve/pro/">Pro</a></li>
      <li><a href="/who-we-serve/college/">College</a></li>
      <li><a href="/who-we-serve/youth/">Youth</a></li>
      <li><a href="/who-we-serve/brands/">Brands</a></li>
    </ul></div>
    <div class="f-col"><h5>Company</h5><ul>
      <li><a href="/about.html">About</a></li>
      <li><a href="/about/mission/">Our Mission</a></li>
      <li><a href="/how-we-win.html">How We Win</a></li>
      <li><a href="/thought-leadership.html">Thought Leadership</a></li>
      <li><a href="/news.html">News</a></li>
      <li><a href="/careers.html">Careers</a></li>
      <li><a href="/contact.html">Contact</a></li>
    </ul></div>
  </div>
  <div class="footer-legal"><a href="/privacy.html">Privacy Policy</a><a href="/terms.html">Terms of Service</a><a href="/faq.html">FAQ</a><a href="/contact.html">Contact</a></div>
  <div class="footer-base"><p>© 2026 Illinois Sponsors. All rights reserved.</p><p>Sports · Media · Sponsorship · Advisory</p></div>
</footer>
<div class="modal-overlay" id="modal" onclick="closeModalOutside(event)">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">×</button>
    <div id="modal-form-wrap">
      <div class="modal-over">Partnership Inquiry</div>
      <div class="modal-title">Let's Build a Partnership.</div>
      <p class="modal-sub">Tell us about your brand and objectives. Our team follows up within one business day with inventory, pricing, and availability tailored to your goals.</p>
      <div style="display:flex;flex-direction:column;gap:0">
        <div class="form-section-label">Contact Information</div>
        <div class="form-row" style="margin-bottom:1px"><div class="form-field"><div class="form-label">First &amp; Last Name <span>*</span></div><input class="modal-input" type="text" id="m-name" placeholder="Jane Smith"></div><div class="form-field"><div class="form-label">Title / Role</div><input class="modal-input" type="text" id="m-title" placeholder="VP of Marketing"></div></div>
        <div class="form-row" style="margin-bottom:1px"><div class="form-field"><div class="form-label">Company <span>*</span></div><input class="modal-input" type="text" id="m-company" placeholder="Acme Corp"></div><div class="form-field"><div class="form-label">Business Email <span>*</span></div><input class="modal-input" type="email" id="m-email" placeholder="jane@acmecorp.com"></div></div>
        <div class="form-row" style="margin-bottom:20px"><div class="form-field"><div class="form-label">Phone</div><input class="modal-input" type="tel" id="m-phone" placeholder="(312) 555-0100"></div><div class="form-field"><div class="form-label">Website</div><input class="modal-input" type="text" id="m-website" placeholder="www.yourcompany.com"></div></div>
        <div class="form-divider"></div>
        <div class="form-section-label">Partnership Details</div>
        <div class="form-row" style="margin-bottom:1px"><div class="form-field"><div class="form-label">Area of Interest <span>*</span></div><select class="modal-select" id="m-tier"><option value="">Select an area</option><option value="Media">Media</option><option value="Sponsorship">Sponsorship</option><option value="Advisory">Advisory &amp; Services</option><option value="Catalog">Full Catalog</option><option value="Not sure">Not sure yet</option></select></div><div class="form-field"><div class="form-label">Budget Range</div><select class="modal-select" id="m-budget"><option value="">Select a range</option><option value="under-5k">Under $5,000</option><option value="5k-15k">$5,000 – $15,000</option><option value="15k-50k">$15,000 – $50,000</option><option value="50k-100k">$50,000 – $100,000</option><option value="100k+">$100,000+</option><option value="flexible">Flexible</option></select></div></div>
        <div class="form-row" style="margin-bottom:1px"><div class="form-field"><div class="form-label">Timeline</div><select class="modal-select" id="m-timeline"><option value="">Select timeline</option><option value="asap">As soon as possible</option><option value="1month">Within 1 month</option><option value="3months">Within 3 months</option><option value="next-season">Next season</option><option value="exploring">Just exploring</option></select></div><div class="form-field"><div class="form-label">How Did You Hear About Us?</div><select class="modal-select" id="m-source"><option value="">Select one</option><option value="referral">Referral</option><option value="search">Online search</option><option value="social">Social media</option><option value="property">Through a property</option><option value="event">At an event</option><option value="other">Other</option></select></div></div>
        <div class="form-row full"><div class="form-field"><div class="form-label">Message / Notes</div><textarea class="modal-textarea" id="m-message" placeholder="Tell us about your brand, target audience, or objectives..."></textarea></div></div>
        <button class="modal-submit" onclick="submitForm()">Submit Inquiry →</button>
        <p class="modal-note">No commitment required. Our team responds within one business day.</p>
      </div>
    </div>
    <div class="modal-success" id="modal-success">
      <div class="modal-success-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
      <h3>Inquiry Received</h3>
      <p>Thank you. Our team will be in touch within one business day.<br><br><span class="blue">contact@illinoissponsors.com</span></p>
    </div>
  </div>
</div>
<script src="/assets/js/main.js"></script>
</body>
</html>
"""


def stat(idx, num, em, label, note):
    e = f"<em>{em}</em>" if em else ""
    return (f'<div class="s-cell"><div class="s-idx">{idx}</div><div class="s-num">{num}{e}</div>'
            f'<div class="s-label">{label}</div><div class="s-note">{note}</div></div>')


def detail(k, h, paras, items):
    ps = "".join(f"<p>{p}</p>" for p in paras)
    lis = "".join(f"<li>{i}</li>" for i in items)
    return (f'<div class="detail"><div><div class="detail-k">{k}</div><h2 class="detail-h">{h}</h2></div>'
            f'<div class="detail-body">{ps}<ul class="detail-list">{lis}</ul></div></div>')


def proof(tag, big, label, desc):
    return (f'<div class="proof"><div class="proof-tag">{tag}</div><div class="proof-big">{big}</div>'
            f'<div class="proof-label">{label}</div><div class="proof-desc">{desc}</div></div>')


def page(path, title, desc, tier, over, h1, h1_thin, sub, stats, details, proofs, proof_over, proof_h, cta_over, cta_h, cta_blue, cta_sub):
    hero = (f'<div class="page-hero"><div class="page-hero-over">{over}</div><div class="page-hero-rule"></div>'
            f'<h1 class="page-hero-h1">{h1}<br><span class="thin">{h1_thin}</span></h1>'
            f'<p class="page-hero-sub">{sub}</p></div>')
    stats_html = f'<div class="stats">{"".join(stats)}</div>'
    details_html = f'<section class="sec">{"".join(details)}</section>'
    proofs_html = (f'<section class="sec alt"><div class="sec-top"><div><div class="sec-over">{proof_over}</div>'
                   f'<div class="sec-h2">{proof_h}</div></div></div>'
                   f'<div class="proof3">{"".join(proofs)}</div></section>')
    cta = (f'<section class="cta-band"><div class="cta-over">{cta_over}</div>'
           f'<div class="cta-h">{cta_h} <span class="blue">{cta_blue}</span></div>'
           f'<p class="cta-sub">{cta_sub}</p>'
           f'<div class="hero-btns"><a href="#" class="btn-hero-blue" onclick="openModal(\'{tier}\');return false;">Partner With Us</a>'
           f'<a href="/catalog.html" class="btn-hero-void">View the Catalog</a></div>'
           f'<a href="mailto:contact@illinoissponsors.com" class="cta-email">contact@illinoissponsors.com</a></section>')
    html = HEAD.format(title=title, desc=desc, tier=tier) + hero + stats_html + details_html + proofs_html + cta + FOOTER
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, "w").write(html)
    print("wrote", path)


# ═══════════════════ WHAT WE DO · MEDIA ═══════════════════
page(
    "what-we-do/media/index.html",
    "Media — What We Do — Illinois Sponsors",
    "Broadcast, streaming, digital, and social media placement from Illinois Sponsors. Put your brand inside the content Illinois audiences already watch.",
    "Media",
    "What We Do · 01", "Media.", "Every screen that matters.",
    "We place brands inside the broadcasts, streams, and content Illinois audiences already follow, then extend that reach across social and digital so one partnership works on every screen.",
    [
        stat("01", "100", "K+", "Annual Impressions", "Broadcast, streaming, signage, and social combined"),
        stat("02", "4", "", "Distribution Channels", "Broadcast, streaming, social, and email working together"),
        stat("03", "12", "+", "Sports & Categories", "From varsity football to live entertainment"),
        stat("04", "52", "wk", "Always-On Coverage", "Content and placement that runs beyond game day"),
    ],
    [
        detail("01 · Broadcast &amp; Streaming", "Broadcast &amp; Streaming",
               ["Live game and event coverage is the most valuable attention in Illinois sports. We place brands inside official broadcasts and livestreams with mentions, voiceovers, and pre and post roll placement that reaches viewers at the venue and far beyond it.",
                "Coverage runs live and on replay across every distribution channel, so a single placement keeps working long after the final whistle."],
               ["Broadcast mentions &amp; voiceovers", "Livestream integration", "Pre &amp; post roll placement", "Presenting sponsorships", "Replay &amp; on-demand coverage", "Play-by-play features", "Halftime &amp; segment sponsorship", "Season-long media packages"]),
        detail("02 · Digital &amp; Social", "Digital &amp; Social",
               ["Fans follow their teams every day, not just on game day. Our digital and social inventory puts brands inside the feeds, newsletters, and highlight reels that Illinois communities check constantly.",
                "Every digital placement is reported on real engagement, so you know exactly what your investment delivered."],
               ["Social media placement", "Email newsletter placement", "Highlight &amp; recap sponsorship", "Live event social coverage", "Creator content series", "Brand ambassador programs", "Digital display &amp; takeovers", "Engagement reporting"]),
        detail("03 · Content &amp; Editorial", "Content &amp; Editorial",
               ["Some stories deserve more than a logo. We produce branded content series, podcast sponsorships, and editorial features that tie a brand to the moments and people Illinois audiences care about.",
                "Content is built once and distributed everywhere, giving partners a library of assets that compounds in value over time."],
               ["Branded content series", "Podcast sponsorship", "Press &amp; editorial co-branding", "Film &amp; TV integration", "Storytelling features", "Athlete &amp; talent features", "Photography &amp; video assets", "Content licensing"]),
    ],
    [
        proof("Reach", "100K+", "Measurable Delivery", "Media is sold on measurable delivery, not impressions on paper. Every placement reports reach and engagement."),
        proof("Frequency", "365", "Days of Presence", "Broadcast, digital, and content work together so your brand shows up all year, not just on game day."),
        proof("Proof", "100%", "Transparent Reporting", "Every media partnership includes reporting that shows exactly where your brand appeared and who saw it."),
    ],
    "Why Media Works", "Attention you can <span class=\"thin\">measure.</span>",
    "Build Your Media Presence", "Every Screen.", "One Partnership.",
    "Tell us your audience and objectives. We will build a media package that reaches Illinois on every screen it watches.",
)

# ═══════════════════ WHAT WE DO · SPONSORSHIP ═══════════════════
page(
    "what-we-do/sponsorship/index.html",
    "Sponsorship — What We Do — Illinois Sponsors",
    "Venue signage, presenting rights, and event activation from Illinois Sponsors. Own the moments Illinois fans remember.",
    "Sponsorship",
    "What We Do · 02", "Sponsorship.", "Own the live moment.",
    "From venue signage to presenting rights and on-site activation, sponsorship embeds your brand in the live experience of Illinois sports and entertainment.",
    [
        stat("01", "40", "+", "Properties Represented", "Schools, venues, and events across the state of Illinois"),
        stat("02", "36", "+", "Sponsorship Options", "Placements, packages, and partnership tiers in the catalog"),
        stat("03", "12", "+", "Sports & Categories", "Single sport, single venue, or statewide packages"),
        stat("04", "1", "", "Point of Contact", "One team manages creative, installation, and reporting"),
    ],
    [
        detail("01 · Venue &amp; Signage", "Venue &amp; Signage",
               ["Physical presence still wins. Field signage, scoreboard branding, and venue placement put your brand in front of engaged audiences at the exact moment their attention peaks.",
                "We handle valuation, creative production, and installation end to end, so your only job is approving the artwork."],
               ["Field &amp; court signage", "Scoreboard &amp; video board", "Concourse &amp; entrance branding", "Ticket &amp; program placement", "Team apparel &amp; equipment", "Venue naming opportunities", "Seasonal &amp; permanent installs", "Creative production included"]),
        detail("02 · Presenting &amp; Title Rights", "Presenting &amp; Title Rights",
               ["The strongest position in sports marketing is owning the event itself. Presenting and title rights attach your brand to the games, tournaments, and series that define a season.",
                "Category exclusivity is available at the presenting level, so your competitors are locked out of the moments you own."],
               ["Event title rights", "Series &amp; tournament presenting", "Season presenting packages", "Category exclusivity", "Trophy &amp; award naming", "Broadcast integration included", "Press &amp; media co-branding", "Multi-year options"]),
        detail("03 · Activation &amp; Experiential", "Activation &amp; Experiential",
               ["Signage builds awareness. Activation builds relationships. On-site sampling, fan experiences, and hospitality turn a logo into a conversation with the exact audience you want to reach.",
                "Our team designs and staffs every activation, so the experience matches your brand standards without pulling your people from their day jobs."],
               ["On-site sampling &amp; demos", "Fan zone experiences", "Hospitality &amp; VIP access", "Giveaways &amp; promotions", "Halftime activations", "Community appearances", "Data capture &amp; lead generation", "Full staffing included"]),
    ],
    [
        proof("Presence", "40+", "Properties in Network", "Your brand can show up at one venue or across the state. Packages scale to your footprint."),
        proof("Exclusivity", "1", "Brand Per Category", "Presenting-level partners lock out their competitors from the properties and events they own."),
        proof("Execution", "0", "Operational Burden", "We manage creative, installation, staffing, and reporting. You approve, we execute."),
    ],
    "Why Sponsorship Works", "Be part of <span class=\"thin\">the moment.</span>",
    "Own Your Moment", "The Moments Fans", "Remember.",
    "Tell us where you want to show up. We will build a sponsorship package with the placements, rights, and activations that fit.",
)

# ═══════════════════ WHAT WE DO · ADVISORY ═══════════════════
page(
    "what-we-do/advisory/index.html",
    "Advisory & Services — What We Do — Illinois Sponsors",
    "Partnership strategy, valuation, NIL and licensing guidance, and performance reporting from Illinois Sponsors. The operating layer behind every partnership.",
    "Advisory",
    "What We Do · 03", "Advisory", "&amp; Services.",
    "The operating layer behind every partnership. We value inventory on real audience data, navigate NIL and licensing, manage activation, and report on outcomes.",
    [
        stat("01", "360", "°", "Partnership Management", "Strategy, execution, and reporting under one roof"),
        stat("02", "24", "hr", "Partner Response", "Every partnership inquiry answered within one business day"),
        stat("03", "100", "%", "Transparent Reporting", "Every engagement reports on delivery and outcomes"),
        stat("04", "1", "", "Operating Team", "No handoffs between agencies, vendors, and middlemen"),
    ],
    [
        detail("01 · Strategy &amp; Valuation", "Strategy &amp; Valuation",
               ["Most sports partnerships are priced on guesswork. Ours are priced on real audience data. We value every piece of inventory before you commit, so you know what attention actually costs and what it should return.",
                "Strategy comes first: your objectives, your audience, and your budget shape the package, not the other way around."],
               ["Inventory valuation", "Partnership strategy", "Audience &amp; market analysis", "Budget planning", "Competitive positioning", "Package design", "Negotiation support", "Renewal &amp; growth planning"]),
        detail("02 · NIL, Licensing &amp; Compliance", "NIL, Licensing &amp; Compliance",
               ["NIL, licensing, and multimedia rights each carry their own approval paths, restrictions, and pitfalls. We navigate them daily, so your brand enters sports without the missteps that burn budgets and relationships.",
                "Every engagement is structured to keep your brand compliant with school, conference, and state requirements from day one."],
               ["NIL program design", "Athlete marketing agreements", "Licensing guidance", "Multimedia rights (MMR)", "School &amp; conference approvals", "Compliance review", "Contract structure", "Brand safety standards"]),
        detail("03 · Reporting &amp; Renewal", "Reporting &amp; Renewal",
               ["A partnership you cannot measure is a donation. Every engagement includes reporting on reach, engagement, attendance, and placement delivery, matched against the goals we set together at the start.",
                "Reporting feeds renewal: what worked scales up, what underperformed gets replaced, and your investment compounds season over season."],
               ["Performance reporting", "Reach &amp; engagement metrics", "Attendance &amp; delivery tracking", "Quarterly reviews", "Season recaps", "ROI analysis", "Renewal recommendations", "Growth roadmaps"]),
    ],
    [
        proof("Insight", "0", "Guesswork", "Every recommendation is grounded in audience data, valuation models, and what we see across the market."),
        proof("Speed", "2", "Weeks to Coordination", "Once an agreement is signed and assets are in, coordination begins within two weeks."),
        proof("Trust", "1", "Accountable Partner", "Strategy, execution, and reporting live with one team. No finger-pointing between vendors."),
    ],
    "Why Advisory Works", "A system, not <span class=\"thin\">a gamble.</span>",
    "Start With Strategy", "Turn Attention", "Into Revenue.",
    "Tell us your objectives. We will show you what the right partnership looks like, what it costs, and what it should return.",
)

# ═══════════════════ WHO WE SERVE · PRO ═══════════════════
page(
    "who-we-serve/pro/index.html",
    "Pro — Who We Serve — Illinois Sponsors",
    "Illinois Sponsors connects brands with professional sports properties, venues, and events across Illinois, and helps pro properties grow partnership revenue.",
    "Sponsorship",
    "Who We Serve · 01", "Pro.", "The biggest stages in Illinois.",
    "Professional sports carry the largest audiences and the strongest emotional pull in the state. We connect brands to that stage and help pro properties turn attention into partnership revenue.",
    [
        stat("01", "9", "M+", "Illinois Market", "One of the largest sports markets in the country"),
        stat("02", "365", "", "Days of Programming", "Games, events, and content across every season"),
        stat("03", "12", "+", "Sports & Categories", "Team sports, individual sports, and live events"),
        stat("04", "1", "", "Trusted Gateway", "One relationship opens the professional landscape"),
    ],
    [
        detail("01 · For Brands", "For Brands Entering Pro Sports",
               ["Professional sports inventory is powerful but hard to navigate: rights are fragmented, pricing is opaque, and the best placements never reach the open market. We source, value, and negotiate pro-level inventory on your behalf.",
                "Whether you want venue presence, broadcast integration, or athlete partnerships, we build the package and manage it end to end."],
               ["Venue &amp; arena placement", "Broadcast &amp; streaming integration", "Athlete partnerships", "Hospitality &amp; client entertainment", "Event sponsorship", "Category exclusivity", "Pricing &amp; valuation guidance", "Single point of management"]),
        detail("02 · For Properties", "For Pro Properties",
               ["Teams, venues, and event operators sit on inventory that brands want but rarely see. We package, price, and sell that inventory so properties capture full value without building a sales operation in-house.",
                "Our reporting standards give your partners proof of delivery, which is what turns one-season deals into multi-year relationships."],
               ["Inventory audit &amp; valuation", "Partnership sales", "Package design", "Sponsor servicing", "Renewal management", "Reporting &amp; proof of delivery", "Category strategy", "Revenue growth planning"]),
        detail("03 · The Illinois Landscape", "The Illinois Pro Landscape",
               ["Illinois is one of the most complete sports markets in America: major league franchises, minor league clubs, professional events, and the venues that host them, all inside one state.",
                "That density is an advantage. A single Illinois strategy can reach urban and regional audiences through professional sports without buying national media."],
               ["Major market reach", "Minor league &amp; regional clubs", "Professional events &amp; tours", "Venue network", "Urban &amp; regional coverage", "Cross-property packages", "Season &amp; multi-year options", "Statewide strategy"]),
    ],
    [
        proof("Scale", "9M+", "Statewide Audience", "Professional sports reach every corner of Illinois, from Chicago to the river towns."),
        proof("Access", "1", "Relationship", "One partnership with us opens inventory across the professional landscape."),
        proof("Return", "100%", "Managed Delivery", "Every pro placement is managed and reported by our team, end to end."),
    ],
    "Why Pro", "The largest stage <span class=\"thin\">in the state.</span>",
    "Enter the Pro Landscape", "Play at the", "Highest Level.",
    "Tell us your brand and your goals. We will show you what professional sports in Illinois can deliver.",
)

# ═══════════════════ WHO WE SERVE · COLLEGE ═══════════════════
page(
    "who-we-serve/college/index.html",
    "College — Who We Serve — Illinois Sponsors",
    "Illinois Sponsors helps brands enter college sports through NIL, multimedia rights, and campus partnerships, and helps colleges grow partnership revenue.",
    "Sponsorship",
    "Who We Serve · 02", "College.", "NIL, MMR, and the campus economy.",
    "College sports is where the biggest opportunity and the most complexity meet. We help brands enter through NIL, multimedia rights, and campus partnerships, with compliance handled from day one.",
    [
        stat("01", "$2.2", "B", "Projected NIL Market", "Name, image, and likeness is reshaping college sports"),
        stat("02", "$30", "B+", "Sports Media Rights", "Annual media rights value across the industry"),
        stat("03", "60", "+", "Illinois Campuses", "Universities and colleges with athletic programs statewide"),
        stat("04", "0", "", "Compliance Shortcuts", "Every program is structured to school and state rules"),
    ],
    [
        detail("01 · NIL Programs", "NIL Programs",
               ["NIL lets brands partner directly with college athletes, but the rules differ by school, conference, and state. We design NIL programs that get approved, launch fast, and hold up to scrutiny.",
                "From single-athlete deals to full roster programs, we handle sourcing, agreements, deliverables, and payment so your team never touches the administrative burden."],
               ["Athlete sourcing &amp; matching", "NIL agreement structure", "Deliverable management", "Content approval workflows", "Payment administration", "School &amp; conference compliance", "Campaign reporting", "Roster-wide programs"]),
        detail("02 · Multimedia Rights", "Multimedia Rights (MMR)",
               ["Multimedia rights control the sponsorable inventory around college athletics: broadcasts, venues, digital channels, and events. We help brands buy into MMR inventory at fair value, and help programs package rights that sell.",
                "MMR is where college partnerships scale: one agreement can cover signage, broadcast, digital, and hospitality across a full athletic year."],
               ["MMR inventory access", "Broadcast &amp; streaming placement", "Venue &amp; facility branding", "Digital &amp; social inventory", "Game day activation", "Hospitality packages", "Valuation &amp; negotiation", "Multi-season agreements"]),
        detail("03 · Campus &amp; Community", "Campus &amp; Community",
               ["College audiences extend far beyond the stadium: students, alumni, faculty, and the towns that live around campus. Partnerships here build affinity with an audience at the exact age brand loyalties form.",
                "We build campus programs that reach students where they are, from athletics to campus events to the local businesses that serve them."],
               ["Student audience programs", "Alumni engagement", "Campus event sponsorship", "Local market activation", "Recruiting-season visibility", "Scholarship &amp; award programs", "Community initiatives", "Year-round presence"]),
    ],
    [
        proof("Timing", "Now", "The NIL Window", "Early movers in NIL are building athlete relationships their competitors will pay a premium to match later."),
        proof("Coverage", "60+", "Campuses Statewide", "From flagship universities to community colleges, Illinois higher education reaches every county."),
        proof("Safety", "100%", "Compliance First", "Every college program is structured to school, conference, and state requirements before launch."),
    ],
    "Why College", "Where loyalty <span class=\"thin\">is formed.</span>",
    "Enter College Sports", "The Campus Is", "The Market.",
    "NIL, MMR, or campus partnerships: tell us your goals and we will map the college opportunity that fits.",
)

# ═══════════════════ WHO WE SERVE · YOUTH ═══════════════════
page(
    "who-we-serve/youth/index.html",
    "Youth — Who We Serve — Illinois Sponsors",
    "Illinois Sponsors connects brands with high school athletics and youth sports across Illinois, where community trust is built.",
    "Sponsorship",
    "Who We Serve · 03", "Youth.", "Where community trust is built.",
    "High school and youth sports are the heartbeat of Illinois communities. Brands that show up here are not advertising to an audience, they are investing in a town, and families remember it.",
    [
        stat("01", "800", "+", "Illinois High Schools", "Athletic programs in every community in the state"),
        stat("02", "74", "%", "Brand Loyalty", "Consumers report stronger loyalty to brands that invest in local sports"),
        stat("03", "12", "+", "Sports &amp; Seasons", "Fall, winter, and spring programming all year"),
        stat("04", "0", "", "Admin Burden on Schools", "We handle creative, installation, and management"),
    ],
    [
        detail("01 · High School Athletics", "High School Athletics",
               ["Friday nights fill stadiums in every Illinois town. High school athletics deliver engaged, local, repeat audiences at a fraction of professional pricing, with a community-goodwill halo no other channel matches.",
                "Sponsorship revenue flows directly toward athletic programming: equipment, travel, uniforms, and operations. Your brand is visibly funding the local team."],
               ["Stadium &amp; gym signage", "Scoreboard sponsorship", "Game day announcements", "Program &amp; ticket placement", "Team sponsorships", "Season packages", "Multi-school bundles", "Direct program funding"]),
        detail("02 · Youth Clubs &amp; Leagues", "Youth Clubs &amp; Leagues",
               ["Club sports, travel teams, and community leagues reach families year-round, on weekends, and across county lines. The audience is parents with buying power and a deep emotional stake in where they spend.",
                "From tournament sponsorship to uniform placement, youth sports puts brands inside the weekend routine of thousands of Illinois families."],
               ["Tournament sponsorship", "League partnerships", "Uniform &amp; equipment branding", "Facility signage", "Event activation", "Family-facing promotions", "Regional coverage", "Season &amp; annual packages"]),
        detail("03 · Community Impact", "Community Impact",
               ["Youth sports sponsorship is the rare marketing spend that reads as generosity, because it is. Scholarship programs, equipment donations, and recognition awards attach your brand to moments families never forget.",
                "We structure community programs that deliver real impact and real visibility, and we report on both."],
               ["Scholarship programs", "Equipment &amp; facility support", "Player recognition awards", "Community events", "Youth camps &amp; clinics", "Local hero features", "Cause-aligned campaigns", "Impact reporting"]),
    ],
    [
        proof("Trust", "74%", "Loyalty Lift", "Consumers are measurably more loyal to brands that visibly invest in their local sports and communities."),
        proof("Reach", "800+", "Communities", "Every Illinois town has a team. Youth sports reaches audiences no media buy can touch."),
        proof("Value", "6×", "Faster Growth", "Brands embedded in community culture grow up to six times faster than those relying on paid media alone."),
    ],
    "Why Youth", "The community <span class=\"thin\">channel.</span>",
    "Invest in Community", "Fund the Team.", "Win the Town.",
    "Tell us the communities you care about. We will build a youth sports program that delivers visibility and goodwill together.",
)

# ═══════════════════ WHO WE SERVE · BRANDS ═══════════════════
page(
    "who-we-serve/brands/index.html",
    "Brands — Who We Serve — Illinois Sponsors",
    "Illinois Sponsors is the brand expansion team for companies entering sports. One partner for strategy, inventory, execution, and reporting.",
    "general",
    "Who We Serve · 04", "Brands.", "Your way into sports.",
    "You know sports is where your audience lives. We are the team that gets you there: one partner for strategy, inventory, execution, and proof, across every level of Illinois sports.",
    [
        stat("01", "1", "", "Point of Contact", "Strategy, buying, execution, and reporting in one team"),
        stat("02", "36", "+", "Catalog Options", "Placements and packages across every level and budget"),
        stat("03", "24", "hr", "Response Time", "Every inquiry answered within one business day"),
        stat("04", "100", "%", "Accountable Spend", "Every placement is tied to defined inventory and reported delivery"),
    ],
    [
        detail("01 · A System, Not a Gamble", "A System, Not a Gamble",
               ["Most brands enter sports through a cold pitch, a favor, or a guess. Then the approvals stall, the pricing balloons, and the ROI never shows up. We replace that with a system: defined inventory, transparent pricing, and reporting that proves delivery.",
                "We know every pitfall, approval path, and bottleneck that kills ROI, because we have been the ones navigating them."],
               ["Defined inventory &amp; pricing", "Objective-first strategy", "Approval path navigation", "Compliance handled", "Predictable timelines", "Transparent reporting", "One accountable team", "Renewal-ready results"]),
        detail("02 · Every Level, One Partner", "Every Level, One Partner",
               ["Pro reach, college relevance, youth trust: each level of sports delivers something different. We build cross-level programs so your brand gets the right mix, purchased and managed through one relationship.",
                "Start with a single placement or a statewide program. The catalog scales with your ambition and your budget."],
               ["Pro, college, &amp; youth access", "Cross-level packages", "NIL &amp; athlete marketing", "Licensing &amp; MMR", "Media &amp; content", "Sponsorship &amp; activation", "Budget-matched options", "Statewide coverage"]),
        detail("03 · Built for Founders &amp; CMOs", "Built for Founders &amp; CMOs",
               ["We work like an extension of your team, and we move faster than internal teams ever could, because this is all we do. You get senior attention, direct answers, and a partner whose incentives match yours: results that renew.",
                "The sports world is a massive opportunity. NIL is projected to hit $2.2B and sports media rights exceed $30B annually. Most brands never capture the value. We exist to change that."],
               ["Senior-level attention", "Direct, fast communication", "No agency bloat", "Founder-friendly pricing", "Pilot-to-scale paths", "Quarterly business reviews", "Market intelligence", "Long-term growth planning"]),
    ],
    [
        proof("Speed", "24hr", "First Response", "Your inquiry is answered by a decision-maker within one business day, with real options attached."),
        proof("Fit", "36+", "Ways to Start", "From a single social placement to a statewide presenting package, there is an entry point for every budget."),
        proof("Proof", "100%", "Reported Delivery", "Every partnership closes its season with a report that shows what ran, who saw it, and what it returned."),
    ],
    "Why Brands Choose Us", "Sports without <span class=\"thin\">the waste.</span>",
    "Start the Conversation", "Tap Into Sports", "Without Wasting Money.",
    "Tell us your brand, your audience, and your budget. We will show you exactly what sports can deliver, before you spend a dollar.",
)

# ═══════════════════ ABOUT · MISSION ═══════════════════
page(
    "about/mission/index.html",
    "Our Mission — Illinois Sponsors",
    "The mission of Illinois Sponsors: help brands enter and grow across sports, music, and entertainment, and help Illinois communities capture the value.",
    "general",
    "About · Our Mission", "Our", "Mission.",
    "We exist to help brands turn sports partnerships into real ROI, and to make sure the schools, venues, and communities of Illinois capture the value their attention creates.",
    [
        stat("01", "2", "", "Sides Served", "Brands that want to reach Illinois, and properties that command its attention"),
        stat("02", "100", "%", "Aligned Incentives", "We win when partnerships renew, not when they are signed"),
        stat("03", "24", "hr", "Response Standard", "Speed is a value, not a slogan"),
        stat("04", "1", "", "Operating Standard", "Premium execution on every engagement, at every level"),
    ],
    [
        detail("01 · Why We Exist", "Why We Exist",
               ["Sports is a massive economic engine, but the value flows unevenly. Brands waste budgets on partnerships that never report a result. Schools and venues undersell inventory because no one values it properly. Both sides lose.",
                "Illinois Sponsors exists to fix that exchange: partnerships priced on real data, executed by one accountable team, and reported honestly enough to earn renewal."],
               ["Fair valuation on both sides", "Measurable partnerships", "Honest reporting", "Renewal-driven incentives", "Community revenue flow", "Professional standards", "Long-term relationships", "Value that compounds"]),
        detail("02 · How We Operate", "How We Operate",
               ["We are advisory-first. Strategy precedes selling, valuation precedes pricing, and reporting closes every loop. If a partnership does not fit your goals, we say so and show you what would.",
                "We move fast, communicate directly, and take on the operational burden ourselves: creative, installation, compliance, and management all run through our team."],
               ["Advisory before inventory", "Data-driven valuation", "Direct communication", "Full-service execution", "Compliance built in", "No hidden economics", "Speed as a standard", "Accountability in writing"]),
        detail("03 · Where We Are Going", "Where We Are Going",
               ["The partnership economy around sports, music, and entertainment is growing faster than the infrastructure that supports it. NIL is projected to reach $2.2B. Sports media rights exceed $30B a year. The systems connecting brands to that value have not kept up.",
                "We are building that infrastructure for Illinois first: the inventory, the standards, and the operating layer that make partnerships work for everyone involved."],
               ["Statewide partnership network", "Standardized inventory &amp; pricing", "Best-in-class reporting", "NIL &amp; licensing infrastructure", "Community reinvestment", "Category-defining standards", "Illinois first, then beyond", "Built for the long term"]),
    ],
    [
        proof("Principle", "1st", "Advisory First", "Strategy and honest counsel come before anything is sold. That order never reverses."),
        proof("Standard", "100%", "Delivery Reported", "Every partnership ends its season with proof of what ran and what it returned."),
        proof("Commitment", "∞", "Long-Term View", "We build for renewals and relationships, not transactions. The incentives stay aligned."),
    ],
    "What We Stand For", "Built on <span class=\"thin\">alignment.</span>",
    "Work With Us", "Partnerships That", "Prove Themselves.",
    "Whether you are a brand entering sports or a property ready to grow, our mission is the same: make the partnership worth renewing.",
)

print("done")
