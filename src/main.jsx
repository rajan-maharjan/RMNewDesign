import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import NepaliCalendar from './calendar.js';
import './site.css';

function sitePath(path) {
  const pathname = window.location.pathname;
  const basePath = pathname.endsWith('/') ? pathname : pathname.slice(0, pathname.lastIndexOf('/') + 1);
  return `${basePath}${path.replace(/^\/+/, '')}`;
}

const imageRoot = sitePath('/assets/images/');
const navItems = [
  ['Home', '/'], ['About', '/about.html'], ['Expertise', '/expertise.html'],
  ['Portfolio', '/projects.html'], ['Photography', '/photography.html'],
  ['Videos', '/videos.html'], ['Blog', '/blog.html'], ['Tools', '/tools.html'],
  ['Contact', '/contact.html']
];
const workItems = [
  { name: 'Toastmaster Mentor-Mentee Portal', category: 'Community', image: 'mentor-mentee.jpg', description: 'A Toastmasters community portal supporting mentor-mentee connections and ongoing development.', href: 'https://rajanmaharjan.com.np/mentor-mentee/' },
  { name: 'Toastmasters Agenda Builder', category: 'Community', image: 'agenda-builder.jpg', description: 'An interactive meeting agenda generator with speech-duration calculations, role checklists, ballot sheets, and PDF export.', href: '/project-detail.html' },
  { name: 'Nepali Date Converter (BS ↔ AD)', category: 'Utility', image: 'date-convertor.jpg', description: 'A Bikram Sambat and Gregorian date converter, paired with a public JSON REST API.', href: '/date-converter.html' },
  { name: 'SWIFT Messaging Audit & Reconciliation', category: 'Enterprise', image: 'swift.jpg', description: 'An enterprise banking tool that audits SWIFT messages against core banking journal entries and highlights reconciliation issues.', href: '/expertise.html' },
  { name: 'Janamat Biweekly News Portal', category: 'Development', image: 'works/janamat.jpg', description: 'A regional news publishing portal with content categorization, editorial approvals, and newspaper archive indexing.', href: 'http://janamat.com.np/' },
  { name: 'LabPlus Pathology Platform', category: 'Development', image: 'works/labplus.jpg', description: 'An Australian pathology platform supporting test bookings, clinic locations, and medical service listings.', href: 'http://labplus.com.au' },
  { name: 'University Grants Commission (UGC)', category: 'Development', image: 'works/ugc.jpg', description: 'An institutional portal for academic research grants, accreditation, and higher-education information.', href: 'http://ugcnepal.edu.np' },
  { name: 'Advance Alarm Technology', category: 'Development', image: 'works/advance-alarm.jpg', description: 'A web presence for a technology and security systems provider.', href: null },
  { name: 'FIRM Solutions Australia', category: 'Development', image: 'works/firm.jpg', description: 'A business website for a professional services company.', href: null },
  { name: 'Diamond Handicraft', category: 'Development', image: 'works/diamondhandicraft.jpg', description: 'An online showcase for Nepalese handicraft products and makers.', href: null }
];
const photos = [
  ['bhaktapur-pond.jpg', 'Quiet reflections in Bhaktapur', 'Heritage'],
  ['blue-sky-sunrise-19112021.jpg', 'First light over the valley', 'Nature'],
  ['tea-garden.jpg', 'Tea gardens in the hills', 'Nature'],
  ['rani-mahal-wall.jpg', 'Rani Mahal, Palpa', 'Heritage'],
  ['kid-boating.jpg', 'A moment on the water', 'Moments'],
  ['rainbow.jpg', 'After the rain', 'Nature'],
  ['round-about.jpg', 'City rhythms', 'Urban'],
  ['sugar-on-coffee.jpg', 'A little pause', 'Moments']
];
const expertise = [
  ['Digital Banking & Finacle CBS', 'Core banking platforms, Finacle scripting and integrations, SWIFT messaging, Video KYC, and digital banking operations.', ['Finacle CBS', 'Banking APIs', 'SWIFT']],
  ['Enterprise Data & DBA', 'Administration and performance tuning for business-critical Oracle, Microsoft SQL Server, and MySQL environments.', ['Oracle', 'MSSQL', 'MySQL']],
  ['Automation & Power Platform', 'Process automation with UiPath and Microsoft Power Platform to improve service and operations.', ['UiPath', 'Power Automate', 'Power Apps']],
  ['Application Engineering', 'Full-stack development for useful, maintainable digital products and internal business applications.', ['PHP', 'Laravel', 'Python', 'JavaScript']],
  ['Architecture & Transformation', 'Connecting technology strategy with secure, resilient systems and measurable improvements.', ['Solution design', 'Integration', 'Transformation']],
  ['Communication & Leadership', 'Helping teams communicate clearly, learn together, and grow through Toastmasters and mentoring.', ['Toastmasters', 'Mentoring', 'Public speaking']]
];
const posts = [
  { id: 'excel-oracle', category: 'Database & PHP', title: 'How to Import Excel Data into Oracle Table Using PHP', date: 'Oct 29, 2023 · 4 min read', excerpt: 'A technical guide to reading spreadsheets with PHPExcel and Oracle OCI8, processing batches, and inserting data into relational tables.' },
  { id: 'ai-video', category: 'AI & Innovation', title: 'Creating AI Video and Story: Modern Generative Tools', date: 'Mar 22, 2024 · 3 min read', excerpt: 'A workflow using ChatGPT and Gemini for story outlines, Leonardo.ai for visual assets, and LeiaPix to animate frames.' },
  { id: 'toastmasters-clubs', category: 'Toastmasters & Leadership', title: 'Toastmasters Clubs in Nepal: Directory & Meeting Timings', date: 'Mar 22, 2024 · 6 min read', excerpt: 'A reference to Toastmasters clubs in Nepal, including areas, venues, and weekly meeting times.' },
  { id: 'nepse-brokers', category: 'Finance & Markets', title: 'List of Stock Brokers Listed in NEPSE', date: 'Feb 29, 2024 · 4 min read', excerpt: 'A directory of licensed Nepal Stock Exchange broker firms, addresses, and trading information.' },
  { id: 'focus', category: 'Literary & Personal', title: 'Ways to Increase FOCUS in a Distracted World', date: 'Jan 23, 2024 · 3 min read', excerpt: 'Practical ideas for deep work, including reducing distractions, seeking natural light, and visual grounding.' },
  { id: 'childrens-day', category: 'Literary & Personal', title: 'बाल दिवस — बाल अधिकार र यथार्थ', date: 'Poem · नेपाली', excerpt: 'A Nepali-language reflection on children’s rights and the realities children face.' },
  { id: 'beloved-mother', category: 'Literary & Personal', title: 'My Beloved Mother (In Memory of My Late Mother)', date: 'Personal reflection', excerpt: 'A personal tribute remembering a beloved mother.' },
  { id: 'unrealized-love', category: 'Literary & Personal', title: 'UNREALIZED LOVE: Reflections on Perspective', date: 'Personal reflection', excerpt: 'A personal essay on love, memory, and perspective.' }
];

function currentPage() {
  const path = window.location.pathname.toLowerCase();
  if (path === '/' || path.endsWith('/index.html')) return 'home';
  const filename = path.split('/').pop().replace('.html', '');
  if (filename === 'my-clicks') return 'photography';
  if (filename === 'articles') return 'blog';
  return filename;
}

function Header({ page }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('rm_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const date = NepaliCalendar.getToday();
  useEffect(() => {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('rm_theme', theme);
  }, [theme]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  const activePath = sitePath(page === 'home' ? '/' : `/${page}.html`);
  const dateText = date.bs
    ? `${date.ad.date} ${date.ad.monthName} ${date.ad.year} · वि.सं ${date.bs.nepaliYearNum} ${date.bs.nmonth} ${date.bs.nepaliDateNum}`
    : `${date.ad.date} ${date.ad.monthName} ${date.ad.year}`;
  return <>
    <header className="site-header"><div className="container header-inner">
      <a className="site-brand" href={sitePath('/')} aria-label="Rajan Maharjan home"><img className="brand-avatar" src={`${imageRoot}profile.jpg`} alt="" /><span className="brand-details"><span className="brand-name">Rajan Maharjan</span><span className="brand-tagline">Digital Banking & Technology</span></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([label, href]) => <a key={href} className={`nav-link ${activePath === sitePath(href) ? 'active' : ''}`} href={sitePath(href)}>{label}</a>)}</nav>
      <div className="header-actions"><a className="date-pill-widget" href={sitePath('/date-converter.html')} title="Open Nepali Date Converter"><span className="date-dot" /><span>{dateText}</span></a>
        <button className="theme-toggle-btn" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '☀' : '☾'}</button>
        <button className="mobile-nav-toggle" type="button" aria-label="Open navigation menu" aria-expanded={open} onClick={() => setOpen(true)}>☰</button>
      </div>
    </div></header>
    {open && <div className="mobile-drawer-overlay open" onClick={() => setOpen(false)} />}
    <aside className={`mobile-drawer ${open ? 'open' : ''}`} aria-label="Mobile navigation">
      <div className="mobile-drawer-header"><a className="site-brand" href={sitePath('/')}><img className="brand-avatar" src={`${imageRoot}profile.jpg`} alt="" /><span className="brand-name">Rajan Maharjan</span></a><button className="mobile-drawer-close" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>×</button></div>
      <ul className="mobile-nav-list">{navItems.map(([label, href]) => <li className="mobile-nav-item" key={href}><a className={activePath === sitePath(href) ? 'active' : ''} href={sitePath(href)} onClick={() => setOpen(false)}>{label}</a></li>)}<li className="mobile-nav-item"><a className={page === 'date-converter' ? 'active' : ''} href={sitePath('/date-converter.html')} onClick={() => setOpen(false)}>Nepali Date Converter</a></li></ul>
      <p className="drawer-date">{dateText}</p>
    </aside>
  </>;
}

function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-main"><div><a className="brand-name" href={sitePath('/')}>Rajan Maharjan</a><p>Technology, thoughtful leadership, and stories through the lens.</p></div>
      <div className="footer-links"><a href={sitePath('/about.html')}>About</a><a href={sitePath('/projects.html')}>Portfolio</a><a href={sitePath('/date-converter.html')}>Date Converter</a><a href={sitePath('/contact.html')}>Contact</a></div>
      <div className="footer-links"><a href="https://linkedin.com/in/rajanmaharjan" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://youtube.com/@RajanMaharjan" target="_blank" rel="noreferrer">YouTube ↗</a><a href="https://500px.com/p/rajan_maharjan" target="_blank" rel="noreferrer">500px ↗</a></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Rajan Maharjan. All rights reserved.</span><a href="#top">Back to top ↑</a></div>
  </div></footer>;
}

function PageIntro({ eyebrow, title, text }) {
  return <section className="page-intro"><div className="container"><span className="section-pill">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></section>;
}
function SectionHeading({ eyebrow, title, text }) {
  return <div className="section-header"><span className="section-pill">{eyebrow}</span><h2 className="section-title">{title}</h2>{text && <p className="section-description">{text}</p>}</div>;
}
function ProjectGrid({ items }) {
  return <div className="projects-grid">{items.map(item => {
    const external = item.href?.startsWith('http');
    const destination = item.href ? (external ? item.href : sitePath(item.href)) : undefined;
    return <article className="card project-card" key={item.name}>{destination ? <a href={destination} className="project-thumb-box" target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}><img className="project-thumb" src={`${imageRoot}${item.image}`} alt="" loading="lazy" /></a> : <div className="project-thumb-box"><img className="project-thumb" src={`${imageRoot}${item.image}`} alt="" loading="lazy" /></div>}<div className="project-body"><span className="project-cat">{item.category}</span><h3 className="project-title">{destination ? <a href={destination} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{item.name}</a> : item.name}</h3><p>{item.description}</p>{destination && <a className="read-more-link" href={destination} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{external ? 'Visit site ↗' : 'Explore project →'}</a>}</div></article>;
  })}</div>;
}
function PhotoGrid({ items, onSelect }) {
  return <div className="photo-masonry">{items.map(([filename, title, category], index) => <button className="photo-item" type="button" key={filename} onClick={() => onSelect?.(index)}><img className="photo-img" src={`${imageRoot}clicks/${filename}`} alt={title} loading="lazy" /><span className="photo-overlay"><span className="photo-title">{title}</span><small>{category}</small></span></button>)}</div>;
}
function BlogGrid({ items }) {
  return <div className="blog-grid">{items.map(post => <article className="card blog-card" key={post.title}><span className="project-cat">{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><span className="blog-meta">{post.date}</span><a className="read-more-link" href={sitePath(`/article.html?post=${post.id}`)}>Read more →</a></article>)}</div>;
}
function ContactCta() {
  return <section className="section"><div className="container"><div className="cta-panel"><span className="section-pill">Let's connect</span><h2>Have a project or collaboration in mind?</h2><p>I’m always glad to connect with people working on thoughtful technology, digital banking, and community initiatives.</p><a className="btn btn-primary" href={sitePath('/contact.html')}>Get in touch →</a></div></div></section>;
}

function HomePage() {
  return <main id="top">
    <section className="hero-section"><div className="container"><div className="hero-grid"><div className="hero-content">
      <div className="hero-badge"><span className="status-dot" />Manager — Digital Banking @ Nabil Bank</div><h1 className="hero-title">Rajan <span className="text-gradient">Maharjan</span></h1>
      <p className="hero-tagline">Building Digital Experiences.<br />Capturing Perspectives. Inspiring Growth.</p><p className="hero-lead">A space where technology, enterprise innovation, creative vision, and leadership converge. Over 15 years designing mission-critical banking solutions, scalable automation workflows, and digital experiences.</p>
      <div className="hero-cta-group"><a className="btn btn-primary" href={sitePath('/projects.html')}>Explore my work →</a><a className="btn btn-secondary" href={sitePath('/photography.html')}>View photography</a></div>
      <div className="hero-metrics"><div className="metric-item"><strong className="metric-number">15+</strong><span className="metric-label">Years in technology</span></div><div className="metric-item"><strong className="metric-number">MBA</strong><span className="metric-label">BE Computer Engineering</span></div><div className="metric-item"><strong className="metric-number">∞</strong><span className="metric-label">Ideas to make useful</span></div></div>
    </div><div className="hero-visual"><div className="portrait-wrapper"><div className="portrait-glow" /><div className="portrait-frame"><img className="portrait-img" src={`${imageRoot}rajan-pp.jpg`} alt="Rajan Maharjan" /></div><div className="floating-badge badge-top"><span className="badge-icon">✦</span><span><b className="badge-text-title">Digital Transformation</b><small className="badge-text-sub">Technology with purpose</small></span></div><div className="floating-badge badge-bottom"><span className="badge-icon">◉</span><span><b className="badge-text-title">Toastmasters Leader</b><small className="badge-text-sub">Communication & mentorship</small></span></div></div></div></div></div></section>
    <section className="section" style={{ background: 'var(--bg-surface-subtle)' }}><div className="container"><SectionHeading eyebrow="Introduction" title="Bridging technical architecture & strategic leadership" text="Combining computer engineering rigor with management insight to lead digital banking operations, automation, and high-impact digital initiatives." /><div className="card card-glass intro-card"><p>As <strong>Manager – Digital Banking at Nabil Bank Limited</strong>, I work across digital transformation, system integration, and process re-engineering. My technical domain spans Finacle Core Banking, enterprise databases, and intelligent process automation with UiPath and Microsoft Power Platform.</p><p>Beyond banking technology, I build useful applications, share knowledge through Toastmasters, and find new perspectives through photography.</p><div className="intro-meta"><span>⌖ Kathmandu, Nepal</span><span>▣ MBA & BE Computer Engineering</span><a href={sitePath('/about.html')}>Read my story →</a></div></div></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="Core capabilities" title="Where I bring experience" text="Architecting robust systems that work at enterprise scale while keeping people and outcomes at the center." /><div className="expertise-grid">{expertise.slice(0, 3).map(([name, description, tags]) => <article className="card expertise-card" key={name}><div className="expertise-icon-wrap">✳</div><h3 className="expertise-title">{name}</h3><p className="expertise-text">{description}</p><div className="tag-cloud">{tags.map(tag => <span className="tag-pill" key={tag}>{tag}</span>)}</div></article>)}</div><div className="center-action"><a className="btn btn-ghost" href={sitePath('/expertise.html')}>Explore all expertise →</a></div></div></section>
    <section className="section" style={{ background: 'var(--bg-surface-subtle)' }}><div className="container"><SectionHeading eyebrow="Selected work" title="Projects with a purpose" text="Tools and digital experiences that bring people, processes, and technology together." /><ProjectGrid items={workItems.slice(0, 3)} /><div className="center-action"><a className="btn btn-secondary" href={sitePath('/projects.html')}>See portfolio</a></div></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="Photography" title="Perspective through the lens" text="A few moments, textures, and places from Nepal and beyond." /><PhotoGrid items={photos.slice(0, 4)} /><div className="center-action"><a className="btn btn-ghost" href={sitePath('/photography.html')}>Explore the gallery →</a></div></div></section>
    <section className="section" style={{ background: 'var(--bg-surface-subtle)' }}><div className="container"><SectionHeading eyebrow="Ideas & reflections" title="Learning in public" text="Technology is only part of the story. I also write about leadership, communication, and building useful things." /><BlogGrid items={posts.slice(0, 2)} /><div className="center-action"><a className="btn btn-ghost" href={sitePath('/blog.html')}>More from the blog →</a></div></div></section>
    <ContactCta />
  </main>;
}

function AboutPage() {
  return <main id="top"><PageIntro eyebrow="About me" title="Technology, people, and a life of learning" text="A career built around solving practical problems with technology—and helping teams move forward together." />
    <section className="section"><div className="container content-narrow"><SectionHeading eyebrow="My story" title="A technologist who enjoys connecting the dots" /><div className="card narrative-card"><p>I’m Rajan Maharjan, a technology professional based in Kathmandu, Nepal. My work sits at the intersection of digital banking, enterprise architecture, database administration, and automation. I enjoy understanding the real problem behind a request and building reliable solutions that make work better.</p><p>Over the years, I’ve worked with core banking platforms, business-critical data systems, and automation technologies. I also build web applications and practical tools, including a Nepali date converter and the Toastmasters Agenda Builder.</p><p>Outside work, photography helps me slow down and notice the details; Toastmasters has helped me become a more intentional communicator and leader.</p></div></div></section>
    <section className="section" style={{ background: 'var(--bg-surface-subtle)' }}><div className="container"><SectionHeading eyebrow="Experience" title="Career highlights" /><div className="timeline"><article className="timeline-item"><span className="timeline-date">Current</span><div><h3>Manager — Digital Banking</h3><p>Nabil Bank Limited · Leading digital banking initiatives, integrations, and operational improvements.</p></div></article><article className="timeline-item"><span className="timeline-date">Earlier roles</span><div><h3>Banking technology & enterprise systems</h3><p>Progressive experience across core banking, application development, database administration, and technology operations.</p></div></article></div></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="Education" title="Engineering foundations, management perspective" /><div className="expertise-grid two-column"><article className="card simple-card"><h3>MBA</h3><p>ACE Institute of Management</p></article><article className="card simple-card"><h3>BE, Computer Engineering</h3><p>Kathmandu Engineering College, Tribhuvan University</p></article></div></div></section><ContactCta /></main>;
}
function ExpertisePage() {
  return <main id="top"><PageIntro eyebrow="Expertise" title="Technology that moves organizations forward" text="A blend of hands-on engineering, enterprise systems experience, and strategic delivery." /><section className="section"><div className="container"><div className="expertise-grid">{expertise.map(([name, description, tags]) => <article className="card expertise-card" key={name}><div className="expertise-icon-wrap">✳</div><h2 className="expertise-title">{name}</h2><p className="expertise-text">{description}</p><div className="tag-cloud">{tags.map(tag => <span className="tag-pill" key={tag}>{tag}</span>)}</div></article>)}</div></div></section><ContactCta /></main>;
}
function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', ...new Set(workItems.map(item => item.category))];
  const results = filter === 'All' ? workItems : workItems.filter(item => item.category === filter);
  return <main id="top"><PageIntro eyebrow="Portfolio" title="Selected projects & digital tools" text="A collection of applications, enterprise initiatives, and community tools shaped by practical needs." /><section className="section"><div className="container"><div className="filter-tabs" role="group" aria-label="Filter projects">{filters.map(value => <button className={`filter-tab ${filter === value ? 'active' : ''}`} type="button" key={value} onClick={() => setFilter(value)}>{value}</button>)}</div><ProjectGrid items={results} /></div></section><ContactCta /></main>;
}
function ProjectDetailPage() {
  return <main id="top"><PageIntro eyebrow="Featured case study" title="Toastmasters Agenda Builder" text="A practical planning companion that helps club leaders turn a meeting agenda into a clear, collaborative experience." /><section className="section"><div className="container content-narrow"><div className="card narrative-card"><h2>The challenge</h2><p>Toastmasters meeting leaders coordinate roles, timing, and information. A clear agenda makes it easier for members to prepare and for meetings to run smoothly.</p><h2>A focused solution</h2><p>The Agenda Builder brings the planning workflow into one accessible tool. It helps organizers assemble meeting roles and details in a shareable format, reducing repetitive setup and improving clarity.</p><h2>Community impact</h2><p>Built to support communication and leadership practice, the tool helps clubs focus on learning together and creating a welcoming meeting.</p><a className="btn btn-primary" href="https://rajanmaharjan.com.np/agenda-builder/index.php" target="_blank" rel="noreferrer">Open Agenda Builder ↗</a></div></div></section></main>;
}
function PhotographyPage() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const filters = ['All', ...new Set(photos.map(photo => photo[2]))];
  const items = photos.filter(photo => filter === 'All' || photo[2] === filter);
  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') setSelected(null);
      if (selected !== null && event.key === 'ArrowRight') setSelected((selected + 1) % items.length);
      if (selected !== null && event.key === 'ArrowLeft') setSelected((selected - 1 + items.length) % items.length);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, items.length]);
  return <main id="top"><PageIntro eyebrow="Photography" title="A collection of moments & places" text="Mobile photography, everyday details, and landscapes from Nepal—capturing the small moments that make a place memorable." /><section className="section"><div className="container"><div className="filter-tabs" role="group" aria-label="Filter photographs">{filters.map(value => <button className={`filter-tab ${filter === value ? 'active' : ''}`} type="button" key={value} onClick={() => { setFilter(value); setSelected(null); }}>{value}</button>)}</div><PhotoGrid items={items} onSelect={setSelected} /><div className="center-action"><a className="btn btn-secondary" href="https://500px.com/p/rajan_maharjan" target="_blank" rel="noreferrer">Find me on 500px ↗</a></div></div></section>{selected !== null && items[selected] && <div className="lightbox" role="dialog" aria-modal="true" aria-label={items[selected][1]} onClick={() => setSelected(null)}><button type="button" className="lightbox-close" aria-label="Close" onClick={() => setSelected(null)}>×</button><button className="lightbox-arrow previous" type="button" aria-label="Previous photo" onClick={event => { event.stopPropagation(); setSelected((selected - 1 + items.length) % items.length); }}>‹</button><img src={`${imageRoot}clicks/${items[selected][0]}`} alt={items[selected][1]} onClick={event => event.stopPropagation()} /><button className="lightbox-arrow next" type="button" aria-label="Next photo" onClick={event => { event.stopPropagation(); setSelected((selected + 1) % items.length); }}>›</button><p>{items[selected][1]}</p></div>}</main>;
}
function VideosPage() {
  const videos = [
    ['Add Google Analytics in WordPress w/o Plugin', 'oFyT_AUlDN0', 'Technical Tutorial'],
    ['Ganesh Pooja in Patan - 2071', 'DTz_Zz5auqY', 'Culture & Traditions'],
    ['Halesi Mahadev of Khotang', 'MFk7bPBTkLA', 'Sacred Pilgrimage'],
    ['Canyoning Down Himalayan Waterfalls', 'ju5w_iaDHgg', 'Adventure & Outdoor'],
    ['Resham Filili Performed by Chinese Artist', 'RH9UcoGmP34', 'Music & Arts'],
    ['Highway — Tinkune to New Baneshwor', 'LZpM6u6fUC4', 'Travel'],
    ['Cruise Dinner in Bangkok, Thailand', '0DncnA5Tlek', 'Travel']
  ];
  const [playing, setPlaying] = useState(null);
  return <main id="top"><PageIntro eyebrow="Videos" title="Knowledge sharing & travel highlights" text="Technology tutorials, culture, travel, and everyday moments from Nepal and beyond." /><section className="section"><div className="container"><div className="videos-grid">{videos.map(([title, id, category], index) => <article className="card video-card" key={id}><button className="video-thumb-wrap" type="button" onClick={() => setPlaying(playing === index ? null : index)} aria-label={`Play ${title}`}>{playing === index ? <iframe title={title} src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <><img className="video-thumb" src={`https://img.youtube.com/vi/${id}/sddefault.jpg`} alt={title} loading="lazy" /><span className="video-play-btn">▶</span></>}</button><div className="video-content"><span className="project-cat">{category}</span><h3 className="video-title">{title}</h3><a className="btn btn-secondary btn-sm" href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div></article>)}</div></div></section></main>;
}
function BlogPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(posts.map(post => post.category))];
  const results = posts.filter(post => (category === 'All' || post.category === category) && `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase()));
  return <main id="top"><PageIntro eyebrow="Blog & insights" title="Articles, technical guides & thoughts" text="Writing about PHP and databases, AI tools, Toastmasters, finance, and personal reflections." /><section className="section"><div className="container"><label className="search-field"><span>Search articles</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search titles and topics…" /></label><div className="filter-tabs" role="group" aria-label="Filter articles">{categories.map(value => <button type="button" key={value} className={`filter-tab ${category === value ? 'active' : ''}`} onClick={() => setCategory(value)}>{value}</button>)}</div><BlogGrid items={results} />{results.length === 0 && <p className="empty-state">No articles match that search. Try another keyword.</p>}</div></section></main>;
}
function ArticlePage() {
  const post = posts.find(item => item.id === new URLSearchParams(window.location.search).get('post')) || posts[0];
  return <main id="top"><PageIntro eyebrow={post.category} title={post.title} text={post.excerpt} /><article className="section"><div className="container content-narrow narrative-card"><p className="article-meta">{post.date}</p><p>{post.excerpt}</p><p>This article is part of Rajan Maharjan’s collection of practical guides, resources, and personal writing.</p><a className="read-more-link" href={sitePath('/blog.html')}>← Back to articles</a></div></article></main>;
}
function ToolsPage() {
  const tools = [
    ['Nepali Date Converter', 'Convert dates between Bikram Sambat and the Gregorian calendar.', '/date-converter.html', 'Open converter →'],
    ['Toastmaster Mentor-Mentee Portal', 'A Toastmasters community portal supporting mentor-mentee connections and ongoing development.', 'https://rajanmaharjan.com.np/mentor-mentee', 'Open portal ↗'],
    ['Toastmasters Agenda Builder', 'Plan club meeting agendas and coordinate speaker and meeting roles.', 'https://rajanmaharjan.com.np/agenda-builder/index.php', 'Open tool ↗'],
    ['Nepali Date API', 'Integrate today’s Nepali date or date conversions into your application.', '/date-converter.html#api-documentation', 'Read API docs →']
  ];
  return <main id="top"><PageIntro eyebrow="Tools & utilities" title="Small tools, useful outcomes" text="Utilities for everyday tasks, community building, and developers working with dates." /><section className="section"><div className="container tools-grid">{tools.map(([name, text, href, action]) => <article className="card tool-card" key={name}><span className="section-pill">Utility</span><h2>{name}</h2><p>{text}</p><a className="btn btn-secondary" href={href.startsWith('http') ? href : sitePath(href)}>{action}</a></article>)}</div></section></main>;
}

const nepaliMonthsLatin = ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
function DateConverterPage() {
  const today = NepaliCalendar.getToday();
  const [mode, setMode] = useState('e2n');
  const [day, setDay] = useState(String(today.ad.date));
  const [month, setMonth] = useState(String(today.ad.month));
  const [year, setYear] = useState(String(today.ad.year));
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [sandbox, setSandbox] = useState('// Choose an example to preview a response.');
  const [copied, setCopied] = useState(false);
  const minYear = mode === 'e2n' ? 1944 : 2000;
  const maxYear = mode === 'e2n' ? 2033 : 2090;
  function convert(event) {
    event?.preventDefault();
    const converted = mode === 'e2n'
      ? NepaliCalendar.engToNep(Number(year), Number(month), Number(day))
      : NepaliCalendar.nepToEng(Number(year), Number(month), Number(day));
    setResult(converted);
    setError(converted ? '' : `That date is invalid or outside the supported range (${minYear}–${maxYear} ${mode === 'e2n' ? 'AD' : 'BS'}).`);
  }
  function changeMode(nextMode) {
    setMode(nextMode); setResult(null); setError('');
    if (nextMode === 'e2n') { setDay(String(today.ad.date)); setMonth(String(today.ad.month)); setYear(String(today.ad.year)); }
    else if (today.bs) { setDay(String(today.bs.date)); setMonth(String(today.bs.month)); setYear(String(today.bs.year)); }
    else { setDay('1'); setMonth('1'); setYear('2000'); }
  }
  function setToday() {
    if (mode === 'e2n') { setDay(String(today.ad.date)); setMonth(String(today.ad.month)); setYear(String(today.ad.year)); }
    else if (today.bs) { setDay(String(today.bs.date)); setMonth(String(today.bs.month)); setYear(String(today.bs.year)); }
    setResult(null); setError('');
  }
  async function copyResult() {
    const text = mode === 'e2n' ? `${result.nepaliDateNum} ${result.nmonth}, ${result.nepaliYearNum} (${result.day})` : result.formattedEnglish;
    try { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
    catch { setError('Could not access the clipboard. Please select and copy the result manually.'); }
  }
  function sandboxExample(type) {
    if (type === 'np') {
      const bs = today.bs;
      setSandbox(JSON.stringify({ status: bs ? 'success' : 'outside_supported_range', dateType: 'np', year: bs?.year ?? null, yearDevanagari: bs?.nepaliYearNum ?? null, month: bs?.month ?? null, monthName: bs?.nmonth ?? null, date: bs?.date ?? null, dayOfWeek: bs?.day ?? null, formatted: bs?.formattedNepali ?? null }, null, 2));
    } else if (type === 'en') {
      setSandbox(JSON.stringify({ status: 'success', dateType: 'en', year: today.ad.year, month: today.ad.month, monthName: today.ad.monthName, date: today.ad.date, dayOfWeek: today.ad.dayName, formatted: today.ad.formatted }, null, 2));
    } else {
      const converted = NepaliCalendar.engToNep(2026, 10, 12);
      setSandbox(JSON.stringify({ status: converted ? 'success' : 'outside_supported_range', dateType: 'e2n', input: '12-10-2026', result: converted?.formattedNepali ?? null }, null, 2));
    }
  }
  const monthNames = mode === 'e2n' ? NepaliCalendar.englishMonths : NepaliCalendar.nepaliMonths;
  return <main id="top"><PageIntro eyebrow="Online utility" title="Nepali Date Converter (BS ↔ AD)" text="Convert dates between Nepali Bikram Sambat (वि.सं.) and the Gregorian calendar with instant, client-side calculations." />
    <section className="section converter-section"><div className="container"><div className="converter-card">
      <div className="converter-type-selector" role="radiogroup" aria-label="Conversion direction"><label className="converter-radio-label"><input type="radio" name="conversionMode" checked={mode === 'e2n'} onChange={() => changeMode('e2n')} /><span>English (AD) → Nepali (BS)</span></label><label className="converter-radio-label"><input type="radio" name="conversionMode" checked={mode === 'n2e'} onChange={() => changeMode('n2e')} /><span>Nepali (BS) → English (AD)</span></label></div>
      <form onSubmit={convert}><div className="converter-form-grid">
        <div className="form-group"><label className="form-label" htmlFor="dateDay">Day</label><input className="form-control" id="dateDay" type="number" min="1" max={mode === 'e2n' ? 31 : 32} required value={day} onChange={event => setDay(event.target.value)} /></div>
        <div className="form-group"><label className="form-label" htmlFor="dateMonth">{mode === 'e2n' ? 'English month' : 'Nepali month'}</label><select className="form-control" id="dateMonth" value={month} onChange={event => setMonth(event.target.value)}>{monthNames.map((name, index) => <option value={index + 1} key={name}>{name}{mode === 'n2e' ? ` (${nepaliMonthsLatin[index]})` : ''}</option>)}</select></div>
        <div className="form-group"><label className="form-label" htmlFor="dateYear">{mode === 'e2n' ? `English year (AD ${minYear}–${maxYear})` : `Nepali year (BS ${minYear}–${maxYear})`}</label><input className="form-control" id="dateYear" type="number" min={minYear} max={maxYear} required value={year} onChange={event => setYear(event.target.value)} /></div>
      </div><div className="converter-actions"><button className="btn btn-primary" type="submit">Convert date</button><button className="btn btn-secondary" type="button" onClick={setToday}>Use today's date</button></div></form>
      <div className={`converter-result-box ${error ? 'has-error' : ''}`} aria-live="polite"><div className="result-heading">{error ? 'Please check the date' : result ? (mode === 'e2n' ? 'Nepali Bikram Sambat date' : 'English Gregorian date') : 'Your converted date will appear here'}</div>{error ? <p className="conversion-error">{error}</p> : result ? <><div className="result-main">{mode === 'e2n' ? `${result.nepaliDateNum} ${result.nmonth}, ${result.nepaliYearNum} (${result.day})` : result.formattedEnglish}</div><div className="result-secondary">{mode === 'e2n' ? `Input: ${day} ${NepaliCalendar.englishMonths[Number(month) - 1]} ${year}, ${result.eday}` : `Input: ${NepaliCalendar.toNepaliNumerals(day)} ${NepaliCalendar.nepaliMonths[Number(month) - 1]} ${NepaliCalendar.toNepaliNumerals(year)} (${result.nday})`}</div><button className="btn btn-secondary btn-sm copy-button" type="button" onClick={copyResult}>{copied ? '✓ Copied' : 'Copy result'}</button></> : <p className="result-secondary">Enter a valid date in the supported calendar range to get started.</p>}</div>
    </div></div></section>
    <section className="section" id="api-documentation" style={{ background: 'var(--bg-surface-subtle)' }}><div className="container content-narrow"><SectionHeading eyebrow="For developers" title="Date API integration" text="The original integration guide documents these public endpoints. The interactive examples below run locally using the same calendar engine." /><div className="api-docs-box">
      <div className="endpoint-card"><span className="method-badge">GET</span><code>https://rajanmaharjan.com.np/getdate/</code><p>Returns today's Nepali date as a formatted string.</p></div>
      <div className="endpoint-card"><span className="method-badge blue">GET · JSON</span><code>https://rajanmaharjan.com.np/getdate/get-json.php?dateType=np</code><p>Returns structured JSON containing Nepali year, month, date, and day of week.</p></div>
      <div className="endpoint-card"><span className="method-badge blue">GET · CONVERT</span><code>https://rajanmaharjan.com.np/getdate/get-json.php?dateType=e2n&amp;date=12-10-2026</code><p>Converts an English date (DD-MM-YYYY) to the Nepali calendar.</p></div>
      <div className="api-sandbox"><h3>Try a local example</h3><p>These previews calculate in your browser and do not make a server request.</p><div className="sandbox-actions"><button className="btn btn-secondary btn-sm" type="button" onClick={() => sandboxExample('np')}>Today's Nepali date</button><button className="btn btn-secondary btn-sm" type="button" onClick={() => sandboxExample('en')}>Today's English date</button><button className="btn btn-secondary btn-sm" type="button" onClick={() => sandboxExample('convert')}>Example conversion</button></div><pre className="code-snippet"><code>{sandbox}</code></pre></div>
    </div></div></section>
  </main>;
}

function ContactPage() {
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);
  async function submit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setIsSending(true);
    setStatus('');
    try {
      const response = await fetch('send-mail.php', {
        method: 'POST',
        body: new FormData(formElement),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Your message could not be sent.');
      }
      formElement.reset();
      setStatus('Your message has been submitted. Thank you for reaching out.');
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus('Your message could not be sent. Please try again or email mail@rajanmaharjan.com.np directly.');
    } finally {
      setIsSending(false);
    }
  }
  return <main id="top"><PageIntro eyebrow="Contact" title="Let's start a conversation" text="Have a question, collaboration idea, or simply want to connect? I’d be happy to hear from you." /><section className="section"><div className="container contact-grid"><div className="contact-copy"><h2>Connect directly</h2><p>Reach out about digital banking, enterprise technology, photography, or community work.</p><a className="contact-detail" href="mailto:mail@rajanmaharjan.com.np">✉ <span>mail@rajanmaharjan.com.np</span></a><p className="contact-detail">⌖ <span>Kathmandu, Nepal</span></p><div className="contact-socials"><a className="contact-social-btn" href="https://linkedin.com/in/rajanmaharjan" target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="contact-social-btn" href="https://youtube.com/@RajanMaharjan" target="_blank" rel="noreferrer">YouTube ↗</a><a className="contact-social-btn" href="https://500px.com/p/rajan_maharjan" target="_blank" rel="noreferrer">500px ↗</a></div></div><form className="card contact-form" action="send-mail.php" method="post" onSubmit={submit}><div className="form-group"><label className="form-label" htmlFor="contact-name">Name</label><input className="form-control" id="contact-name" name="name" autoComplete="name" required /></div><div className="form-group"><label className="form-label" htmlFor="contact-email">Email</label><input className="form-control" id="contact-email" type="email" name="email" autoComplete="email" required /></div><div className="form-group"><label className="form-label" htmlFor="contact-message">Message</label><textarea className="form-control" id="contact-message" name="message" rows="5" required /></div><button className="btn btn-primary" type="submit" disabled={isSending}>{isSending ? 'Sending...' : 'Send message →'}</button>{status && <p className="form-status" role="status">{status}</p>}</form></div></section></main>;
}

function App() {
  const page = currentPage();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles = {
      home: 'Technology Leader, Developer & Photographer',
      about: 'About Rajan Maharjan',
      expertise: 'Technical Expertise',
      projects: 'Projects & Applications',
      portfolio: 'Projects & Applications',
      'project-detail': 'Toastmasters Agenda Builder Case Study',
      photography: 'Photography Portfolio',
      videos: 'Videos & Tutorials',
      blog: 'Blog & Knowledge Sharing',
      article: 'Article',
      tools: 'Tools & Utilities',
      'date-converter': 'Nepali Date Converter (BS ↔ AD)',
      contact: 'Contact Rajan Maharjan'
    };
    document.title = `${titles[page] || titles.home} — Rajan Maharjan`;
  }, [page]);
  let content;
  switch (page) {
    case 'about': content = <AboutPage />; break;
    case 'expertise': content = <ExpertisePage />; break;
    case 'projects': case 'portfolio': content = <ProjectsPage />; break;
    case 'project-detail': content = <ProjectDetailPage />; break;
    case 'photography': case 'my-clicks': content = <PhotographyPage />; break;
    case 'videos': content = <VideosPage />; break;
    case 'blog': content = <BlogPage />; break;
    case 'article': content = <ArticlePage />; break;
    case 'tools': content = <ToolsPage />; break;
    case 'date-converter': content = <DateConverterPage />; break;
    case 'contact': content = <ContactPage />; break;
    default: content = <HomePage />;
  }
  return <><Header page={page} />{content}<Footer /></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
