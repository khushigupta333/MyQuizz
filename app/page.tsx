'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bell,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileText,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  PlayCircle,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  UploadCloud,
  Users,
  X,
  Zap,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'assessment', label: 'Assessment', icon: ClipboardCheck },
  { id: 'competency', label: 'Competency profile', icon: Target },
  { id: 'learning', label: 'Learning path', icon: BookOpen },
  { id: 'quiz', label: 'Adaptive quiz', icon: BrainCircuit },
  { id: 'admin', label: 'Content studio', icon: Settings2 },
]

const competencies = [
  { name: 'Statistical methodology', score: 82, target: 85, status: 'On track', color: 'var(--chart-1)' },
  { name: 'Data analysis', score: 68, target: 80, status: 'Focus area', color: 'var(--chart-2)' },
  { name: 'Data visualization', score: 74, target: 80, status: 'Developing', color: 'var(--chart-3)' },
  { name: 'Statistical programming', score: 61, target: 75, status: 'Focus area', color: 'var(--chart-4)' },
  { name: 'Data quality', score: 88, target: 85, status: 'Strength', color: 'var(--chart-5)' },
  { name: 'Official statistics', score: 79, target: 80, status: 'On track', color: 'var(--primary)' },
]

const activity = [
  { month: 'Jan', value: 52 }, { month: 'Feb', value: 58 }, { month: 'Mar', value: 61 },
  { month: 'Apr', value: 65 }, { month: 'May', value: 72 }, { month: 'Jun', value: 78 },
]

const courseData = [
  { title: 'Applied Data Analysis with R', tag: 'Statistical programming', level: 'Intermediate', duration: '4h 20m', progress: 42, color: 'blue' },
  { title: 'Making Data Tell a Story', tag: 'Data visualization', level: 'Foundational', duration: '2h 45m', progress: 0, color: 'amber' },
  { title: 'Quality Frameworks for Official Statistics', tag: 'Data quality', level: 'Advanced', duration: '3h 10m', progress: 68, color: 'green' },
]

function Metric({ icon: Icon, label, value, detail, tone = 'blue' }: { icon: typeof Gauge; label: string; value: string; detail: string; tone?: string }) {
  return <div className="metric-card">
    <div className={`metric-icon ${tone}`}><Icon size={18} /></div>
    <div><p className="eyebrow">{label}</p><p className="metric-value">{value}</p><p className="metric-detail">{detail}</p></div>
  </div>
}

function Dashboard({ setView }: { setView: (v: string) => void }) {
  return <div className="page-stack">
    <div className="welcome-row"><div><p className="eyebrow">Tuesday, 24 June 2025</p><h1>Good morning, Priya</h1><p className="subtitle">Here&apos;s your learning pulse for today.</p></div><button className="primary-button" onClick={() => setView('assessment')}><ClipboardCheck size={17} /> Continue assessment <ArrowRight size={16} /></button></div>
    <div className="metric-grid"><Metric icon={Gauge} label="Overall competency" value="78%" detail="+6% from last month" /><Metric icon={BookOpen} label="Learning progress" value="12.4h" detail="4 courses in progress" tone="amber" /><Metric icon={BrainCircuit} label="Quiz performance" value="84%" detail="+12% improvement" tone="green" /><Metric icon={Target} label="Active focus areas" value="3" detail="2 high priority gaps" tone="rose" /></div>
    <div className="dashboard-grid">
      <section className="panel chart-panel"><div className="panel-heading"><div><h2>Competency growth</h2><p>Momentum across your assessed capabilities</p></div><button className="ghost-button">Last 6 months <ChevronDown size={15} /></button></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={activity}><defs><linearGradient id="growth" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)"/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}/><YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} domain={[40, 90]}/><Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12 }} /><Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} fill="url(#growth)" /></AreaChart></ResponsiveContainer></div></section>
      <section className="panel competency-panel"><div className="panel-heading"><div><h2>Competency snapshot</h2><p>6 capability areas assessed</p></div><button className="icon-button" aria-label="More options"><MoreHorizontal size={18}/></button></div><div className="competency-list">{competencies.slice(0, 5).map((item) => <div className="competency-row" key={item.name}><div className="row-label"><span>{item.name}</span><b>{item.score}%</b></div><div className="progress-track"><span style={{ width: `${item.score}%`, background: item.color }}/></div><span className={`status ${item.status === 'Focus area' ? 'warning' : item.status === 'Strength' ? 'success' : ''}`}>{item.status}</span></div>)}</div><button className="text-button" onClick={() => setView('competency')}>View full competency profile <ArrowRight size={15}/></button></section>
    </div>
    <div className="dashboard-grid lower-grid"><section className="panel"><div className="panel-heading"><div><h2>Recommended for you</h2><p>AI-curated from your competency gaps</p></div><button className="text-button" onClick={() => setView('learning')}>View all</button></div><div className="recommend-row">{courseData.slice(0,2).map((course) => <CourseMini key={course.title} course={course} onClick={() => setView('learning')} />)}</div></section><section className="panel focus-card"><div className="focus-art"><Sparkles size={22}/></div><div><p className="eyebrow">AI learning coach</p><h2>Your next best action</h2><p>Complete the programming module to close your highest priority gap.</p><button className="text-button" onClick={() => setView('learning')}>Open learning path <ArrowRight size={15}/></button></div></section></div>
  </div>
}

function CourseMini({ course, onClick }: { course: typeof courseData[0]; onClick: () => void }) { return <button className="course-mini" onClick={onClick}><div className={`course-thumb ${course.color}`}><BookOpen size={21}/></div><div className="course-mini-info"><span className="tag">{course.tag}</span><strong>{course.title}</strong><small><Clock3 size={13}/> {course.duration} · {course.level}</small></div><ArrowRight size={16} className="course-arrow"/></button> }

function Assessment({ setView }: { setView: (v: string) => void }) {
  const [question, setQuestion] = useState(1); const [selected, setSelected] = useState('');
  const options = ['A measure of the accuracy and consistency of data', 'A framework for visualising data relationships', 'A type of probability distribution', 'A method for collecting survey responses'];
  return <div className="page-stack narrow-page"><div className="eyebrow">Baseline assessment · 12 questions</div><div className="assessment-header"><div><h1>Discover your competency profile</h1><p className="subtitle">Answer honestly. There are no wrong answers — your responses help us personalise your learning path.</p></div><div className="assessment-progress"><b>{question}</b><span>/ 12</span></div></div><div className="progress-track tall"><span style={{ width: `${(question/12)*100}%` }}/></div><section className="panel question-card"><div className="question-meta"><span className="tag blue-tag">Data quality</span><span>Question {question} of 12</span></div><h2>What best describes data quality in official statistics?</h2><div className="option-list">{options.map((option, i) => <button className={`option ${selected === option ? 'selected' : ''}`} key={option} onClick={() => setSelected(option)}><span className="option-letter">{String.fromCharCode(65+i)}</span><span>{option}</span>{selected === option && <Check size={17} className="option-check"/>}</button>)}</div><div className="question-footer"><button className="ghost-button" onClick={() => setSelected('')}>Mark for review</button><button className="primary-button" onClick={() => question < 12 ? setQuestion(question+1) : setView('competency')}>{question < 12 ? 'Next question' : 'See my profile'} <ArrowRight size={16}/></button></div></section><div className="privacy-note"><ShieldCheck size={17}/><span>Your responses are private and used only to personalise your development plan.</span></div></div>
}

function Competency({ setView }: { setView: (v: string) => void }) { return <div className="page-stack"><div className="welcome-row"><div><p className="eyebrow">Your development map</p><h1>Competency profile</h1><p className="subtitle">A clear view of where you are today and where to focus next.</p></div><button className="primary-button" onClick={() => setView('learning')}><Sparkles size={17}/> Explore recommendations</button></div><div className="profile-summary"><div className="score-ring"><strong>78</strong><span>overall</span></div><div><h2>Strong foundation, focused growth</h2><p>Your profile shows a strong foundation in data quality and methodology. Building your programming and analysis practice will unlock your next level.</p><div className="summary-chips"><span className="chip green-chip">2 strengths</span><span className="chip amber-chip">3 growth areas</span><span className="chip blue-chip">6 assessed</span></div></div></div><div className="competency-grid">{competencies.map((item) => <div className="panel competency-detail" key={item.name}><div className="detail-top"><div className="detail-icon"><Target size={18}/></div><span className={`status ${item.status === 'Focus area' ? 'warning' : item.status === 'Strength' ? 'success' : ''}`}>{item.status}</span></div><h3>{item.name}</h3><div className="score-line"><strong>{item.score}%</strong><span>target {item.target}%</span></div><div className="progress-track"><span style={{ width: `${item.score}%`, background: item.color }}/></div><p>{item.status === 'Focus area' ? 'Prioritised in your next learning plan.' : 'Keep building consistency through applied practice.'}</p></div>)}</div></div> }

function Learning({ setView }: { setView: (v: string) => void }) { return <div className="page-stack"><div><p className="eyebrow">Personalised development plan</p><h1>Your learning path</h1><p className="subtitle">Four focused courses selected to help you close the gaps that matter most.</p></div><div className="learning-hero"><div><span className="tag blue-tag">AI-curated pathway</span><h2>Build confidence in applied analysis</h2><p>Based on your competency profile, this path balances practical skills with official statistics context.</p></div><div className="path-stat"><strong>32%</strong><span>path complete</span></div></div><div className="course-grid">{courseData.map((course) => <div className="panel course-card" key={course.title}><div className={`course-banner ${course.color}`}><BookOpen size={28}/><span>{course.level}</span></div><div className="course-content"><span className="tag">{course.tag}</span><h3>{course.title}</h3><p>Learn through guided modules, examples, and a short knowledge check.</p><div className="course-meta"><span><Clock3 size={14}/> {course.duration}</span><span><PlayCircle size={14}/> 6 modules</span></div><div className="progress-track"><span style={{ width: `${course.progress}%` }}/></div><div className="course-cta"><small>{course.progress ? `${course.progress}% complete` : 'Not started'}</small><button className="secondary-button" onClick={() => setView('quiz')}>{course.progress ? 'Continue' : 'Start learning'} <ArrowRight size={15}/></button></div></div></div>)}</div></div> }

function Quiz({ setView }: { setView: (v: string) => void }) { const [answer, setAnswer] = useState(''); const [done, setDone] = useState(false); const opts = ['Improve data validation before analysis', 'Add more colours to the dashboard', 'Remove metadata from the dataset', 'Use only manually entered records']; if(done) return <div className="page-stack narrow-page"><div className="quiz-complete"><div className="success-icon"><Check size={28}/></div><p className="eyebrow">Knowledge check complete</p><h1>Nice work, Priya.</h1><p className="subtitle">You scored 4 out of 5. Your next recommendation is ready.</p><div className="result-number">80%</div><button className="primary-button" onClick={() => setView('results')}>View detailed feedback <ArrowRight size={16}/></button></div></div>; return <div className="page-stack narrow-page"><div className="eyebrow">Adaptive quiz · Data quality</div><div className="assessment-header"><div><h1>Check your understanding</h1><p className="subtitle">Questions adapt to your performance as you go.</p></div><div className="assessment-progress"><b>3</b><span>/ 5</span></div></div><div className="progress-track tall"><span style={{width:'60%'}}/></div><section className="panel question-card"><div className="question-meta"><span className="tag amber-tag">Applied practice</span><span>Question 3 of 5</span></div><h2>Which action most directly improves the quality of an administrative dataset?</h2><div className="option-list">{opts.map((option, i) => <button className={`option ${answer === option ? 'selected' : ''}`} key={option} onClick={() => setAnswer(option)}><span className="option-letter">{String.fromCharCode(65+i)}</span><span>{option}</span></button>)}</div><div className="question-footer"><button className="ghost-button">Flag question</button><button className="primary-button" disabled={!answer} onClick={() => setDone(true)}>Submit answer <Check size={16}/></button></div></section></div> }

function Results() { const data = [{name:'Before', score:62}, {name:'After', score:78}]; return <div className="page-stack"><div><p className="eyebrow">Adaptive quiz feedback</p><h1>Your progress, made visible</h1><p className="subtitle">A snapshot of the skills you are strengthening through practice.</p></div><div className="results-grid"><section className="panel results-score"><div className="score-ring large"><strong>80%</strong><span>quiz score</span></div><h2>Above your previous baseline</h2><p>You improved by 18 points since your last attempt. Keep practising data validation to make this strength stick.</p><div className="chip green-chip">+18% improvement</div></section><section className="panel"><div className="panel-heading"><div><h2>Competency improvement</h2><p>Before and after your learning path</p></div></div><div className="chart-wrap small-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} barSize={48}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)"/><XAxis dataKey="name" axisLine={false} tickLine={false}/><YAxis domain={[0,100]} axisLine={false} tickLine={false}/><Bar dataKey="score" radius={[8,8,0,0]}><Cell fill="var(--muted)"/><Cell fill="var(--primary)"/></Bar></BarChart></ResponsiveContainer></div></section></div><div className="dashboard-grid"><section className="panel"><div className="panel-heading"><div><h2>Strengths</h2><p>Keep applying these capabilities</p></div></div><div className="insight-row"><Check size={17}/><span>Data quality foundations</span><b>88%</b></div><div className="insight-row"><Check size={17}/><span>Statistical methodology</span><b>82%</b></div></section><section className="panel"><div className="panel-heading"><div><h2>Next focus area</h2><p>Recommended by your AI coach</p></div></div><div className="focus-callout"><Zap size={19}/><div><strong>Applied R programming</strong><p>One short module could move your highest priority gap forward.</p></div></div></section></div></div> }

function Admin() { const [uploaded, setUploaded] = useState(false); return <div className="page-stack"><div><p className="eyebrow">Content studio</p><h1>Build better learning content</h1><p className="subtitle">Upload source material and let AI prepare a review-ready question set.</p></div><div className="admin-grid"><section className="panel upload-panel"><div className="panel-heading"><div><h2>Source material</h2><p>PDF, DOCX, PPTX, or TXT up to 25 MB</p></div><FileText size={22}/></div><button className={`dropzone ${uploaded ? 'uploaded' : ''}`} onClick={() => setUploaded(true)}>{uploaded ? <><div className="success-icon small"><Check size={20}/></div><strong>official-statistics-framework.pdf</strong><span>Uploaded · ready to process</span></> : <><UploadCloud size={30}/><strong>Drop a file here or browse</strong><span>AI will extract concepts and learning objectives</span></>}</button>{uploaded && <button className="primary-button full-button"><Sparkles size={16}/> Generate question set <ArrowRight size={16}/></button>}</section><section className="panel"><div className="panel-heading"><div><h2>Generation settings</h2><p>Configure your AI review</p></div><Settings2 size={20}/></div><div className="settings-list"><label>Number of questions<select defaultValue="10"><option>10 questions</option><option>15 questions</option><option>20 questions</option></select></label><label>Difficulty<select defaultValue="Mixed"><option>Mixed</option><option>Foundational</option><option>Advanced</option></select></label><label>Question types<select defaultValue="Multiple choice"><option>Multiple choice</option><option>True or false</option><option>Mixed types</option></select></label></div></section></div><section className="panel"><div className="panel-heading"><div><h2>Recent content jobs</h2><p>Review and publish AI-generated learning assets</p></div><button className="ghost-button">View archive <ArrowRight size={15}/></button></div><div className="job-row"><div className="file-icon"><FileCheck2 size={19}/></div><div><strong>Survey methodology essentials</strong><span>12 questions · High confidence · Ready for review</span></div><span className="status success">Ready</span><button className="icon-button"><MoreHorizontal size={18}/></button></div><div className="job-row"><div className="file-icon"><BrainCircuit size={19}/></div><div><strong>Data quality framework</strong><span>Processing concepts · Started 8 minutes ago</span></div><span className="status warning">Processing</span><button className="icon-button"><MoreHorizontal size={18}/></button></div></section></div> }

export default function Page() {
  const [view, setView] = useState('dashboard'); const [mobileNav, setMobileNav] = useState(false);
  const current = navItems.find((item) => item.id === view) ?? navItems[0];
  const content = useMemo(() => { if(view === 'assessment') return <Assessment setView={setView}/>; if(view === 'competency') return <Competency setView={setView}/>; if(view === 'learning') return <Learning setView={setView}/>; if(view === 'quiz') return <Quiz setView={setView}/>; if(view === 'results') return <Results/>; if(view === 'admin') return <Admin/>; return <Dashboard setView={setView}/> }, [view]);
  return <main className="app-shell"><aside className={`sidebar ${mobileNav ? 'open' : ''}`}><div className="brand"><div className="brand-mark"><BarChart size={20}/></div><div><strong>Samarth</strong><span>Competency platform</span></div><button className="mobile-close" onClick={() => setMobileNav(false)}><X size={18}/></button></div><div className="sidebar-section"><span className="sidebar-label">Workspace</span>{navItems.map(({id,label,icon: Icon}) => <button key={id} className={`nav-item ${view === id ? 'active' : ''}`} onClick={() => {setView(id);setMobileNav(false)}}><Icon size={18}/><span>{label}</span>{id === 'assessment' && <span className="nav-dot"/>}</button>)}</div><div className="sidebar-bottom"><div className="help-card"><Sparkles size={18}/><strong>AI coach is ready</strong><span>Get a personalised next step.</span><button onClick={() => setView('learning')}>View plan <ArrowRight size={14}/></button></div><button className="nav-item"><Settings2 size={18}/><span>Settings</span></button><div className="user-mini"><div className="avatar">PS</div><div><strong>Priya Sharma</strong><span>Analyst · MoSPI</span></div><ChevronDown size={15}/></div></div></aside><div className="main-column"><header className="topbar"><button className="mobile-menu" onClick={() => setMobileNav(true)}><Menu size={20}/></button><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>{current.label}</strong></div><div className="top-actions"><button className="search-button"><Search size={17}/><span>Search anything</span><kbd>⌘ K</kbd></button><button className="icon-button notification"><Bell size={19}/><span/></button><div className="avatar top-avatar">PS</div></div></header><div className="content-area">{content}</div></div></main>
}

