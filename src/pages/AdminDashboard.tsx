import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, FolderOpen, Code2, MessageSquare,
  LogOut, Plus, Trash2, Edit3, Save, X,
  ChevronRight, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { adminLogout } from '@/lib/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import AdminGuard from '@/components/AdminGuard';

// ─── Types ───────────────────────────────────────────────
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  image: string;
  created_at?: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  color: string;
  icon: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

type Tab = 'overview' | 'projects' | 'skills' | 'messages';

// ─── Default data (agar Supabase bo'sh bo'lsa) ───────────
const defaultProjects: Project[] = [
  { id: '1', title: 'Portfolio Website', description: 'Shaxsiy portfolio sayti', tags: ['React', 'Tailwind'], link: '#', github: '#', image: '' },
  { id: '2', title: 'E-Commerce Dashboard', description: "Onlayn do'kon paneli", tags: ['React', 'TypeScript'], link: '#', github: '#', image: '' },
];

const defaultSkills: Skill[] = [
  { id: '1', name: 'HTML5', level: 95, color: 'from-orange-500 to-orange-600', icon: '🌐' },
  { id: '2', name: 'CSS3', level: 80, color: 'from-cyan-500 to-blue-500', icon: '🎨' },
  { id: '3', name: 'JavaScript', level: 65, color: 'from-yellow-400 to-yellow-500', icon: '⚡' },
  { id: '4', name: 'Python', level: 75, color: 'from-blue-400 to-blue-600', icon: '🐍' },
  { id: '5', name: 'Django', level: 45, color: 'from-green-500 to-green-700', icon: '🦄' },
  { id: '6', name: 'OSINT', level: 50, color: 'from-red-500 to-rose-600', icon: '🔍' },
];

// ─── Main Component ───────────────────────────────────────
export default function AdminDashboard() {
  return (
    <AdminGuard>
      <DashboardContent />
    </AdminGuard>
  );
}

function DashboardContent() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Foydalanuvchi emaili o'rniga oddiy label
    setUserEmail('Administrator');
  }, []);

  const handleLogout = () => {
    adminLogout();
    toast.success("Chiqildi");
    navigate('/admin');
  };

  const tabs = [
    { id: 'overview' as Tab, label: 'Umumiy', icon: LayoutDashboard },
    { id: 'projects' as Tab, label: 'Loyihalar', icon: FolderOpen },
    { id: 'skills' as Tab, label: "Ko'nikmalar", icon: Code2 },
    { id: 'messages' as Tab, label: 'Xabarlar', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 flex flex-col fixed h-full z-10 bg-background/95 backdrop-blur-xl">
        {/* Logo */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-foreground">Admin Panel</div>
              <div className="text-xs text-muted-foreground truncate max-w-[130px]">{userEmail}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Chiqish
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <OverviewTab projects={projects} skills={skills} messages={messages} />
          )}
          {activeTab === 'projects' && (
            <ProjectsTab projects={projects} setProjects={setProjects} />
          )}
          {activeTab === 'skills' && (
            <SkillsTab skills={skills} setSkills={setSkills} />
          )}
          {activeTab === 'messages' && (
            <MessagesTab messages={messages} setMessages={setMessages} />
          )}
        </motion.div>
      </main>
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────
function OverviewTab({ projects, skills, messages }: {
  projects: Project[]; skills: Skill[]; messages: Message[];
}) {
  const unread = messages.filter(m => !m.is_read).length;

  const stats = [
    { label: 'Loyihalar', value: projects.length, icon: FolderOpen, color: 'text-blue-400' },
    { label: "Ko'nikmalar", value: skills.length, icon: Code2, color: 'text-green-400' },
    { label: 'Xabarlar', value: messages.length, icon: MessageSquare, color: 'text-purple-400' },
    { label: "O'qilmagan", value: unread, icon: MessageSquare, color: 'text-orange-400' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-foreground mb-2">Umumiy ko'rinish</h1>
      <p className="text-muted-foreground mb-8">Portfolio saytingiz statistikasi</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-6 border border-border/50"
          >
            <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
            <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6 border border-border/50">
        <h2 className="font-display font-semibold text-foreground mb-4">Tezkor havolalar</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>🌐 Sayt: <a href="https://abdukarimov.uz" target="_blank" rel="noreferrer" className="text-primary hover:underline">abdukarimov.uz</a></p>
          <p>🔐 Supabase: <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-primary hover:underline">supabase.com/dashboard</a></p>
          <p>🚀 Vercel: <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" className="text-primary hover:underline">vercel.com/dashboard</a></p>
        </div>
      </div>
    </div>
  );
}

// ─── Projects Tab ─────────────────────────────────────────
function ProjectsTab({ projects, setProjects }: {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) {
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);

  const emptyProject: Project = {
    id: Date.now().toString(),
    title: '',
    description: '',
    tags: [],
    link: '#',
    github: '#',
    image: '',
  };

  const handleSave = (project: Project) => {
    if (!project.title.trim()) {
      toast.error('Loyiha nomini kiriting');
      return;
    }
    if (isNew) {
      setProjects(prev => [...prev, { ...project, id: Date.now().toString() }]);
      toast.success('Loyiha qo\'shildi');
    } else {
      setProjects(prev => prev.map(p => p.id === project.id ? project : p));
      toast.success('Saqlandi');
    }
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    toast.success('O\'chirildi');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Loyihalar</h1>
          <p className="text-muted-foreground">{projects.length} ta loyiha</p>
        </div>
        <Button variant="hero" onClick={() => { setEditing(emptyProject); setIsNew(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Yangi loyiha
        </Button>
      </div>

      {/* Edit form */}
      {editing && (
        <ProjectForm
          project={editing}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setIsNew(false); }}
        />
      )}

      {/* List */}
      <div className="grid gap-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            className="glass-card rounded-2xl p-5 border border-border/50 flex items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold text-foreground">{project.title}</div>
              <div className="text-sm text-muted-foreground truncate">{project.description}</div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => { setEditing(project); setIsNew(false); }}
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <Edit3 className="w-4 h-4 text-primary" />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="w-9 h-9 rounded-lg bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center transition-colors"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProjectForm({ project, onSave, onCancel }: {
  project: Project;
  onSave: (p: Project) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(project);
  const [tagsInput, setTagsInput] = useState(project.tags.join(', '));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean) });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 border border-primary/30 mb-6"
    >
      <h3 className="font-display font-semibold text-foreground mb-4">
        {form.id ? 'Loyihani tahrirlash' : 'Yangi loyiha'}
      </h3>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Nomi *</label>
          <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Portfolio Website" className="bg-secondary/50 border-border/50 focus:border-primary" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Teglar (vergul bilan)</label>
          <Input value={tagsInput} onChange={e => setTagsInput(e.target.value)}
            placeholder="React, TypeScript, Tailwind" className="bg-secondary/50 border-border/50 focus:border-primary" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs text-muted-foreground mb-1 block">Tavsif</label>
          <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Loyiha haqida qisqacha..." className="bg-secondary/50 border-border/50 focus:border-primary resize-none" rows={2} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">GitHub URL</label>
          <Input value={form.github} onChange={e => setForm({ ...form, github: e.target.value })}
            placeholder="https://github.com/..." className="bg-secondary/50 border-border/50 focus:border-primary" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Demo URL</label>
          <Input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })}
            placeholder="https://..." className="bg-secondary/50 border-border/50 focus:border-primary" />
        </div>
        <div className="md:col-span-2 flex gap-3 justify-end">
          <Button type="button" variant="heroOutline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" /> Bekor
          </Button>
          <Button type="submit" variant="hero">
            <Save className="w-4 h-4 mr-2" /> Saqlash
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

// ─── Skills Tab ───────────────────────────────────────────
function SkillsTab({ skills, setSkills }: {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}) {
  const [editing, setEditing] = useState<Skill | null>(null);

  const handleSave = (skill: Skill) => {
    if (!skill.name.trim()) { toast.error('Nom kiriting'); return; }
    if (skill.level < 0 || skill.level > 100) { toast.error('Daraja 0-100 orasida bo\'lsin'); return; }
    setSkills(prev => prev.map(s => s.id === skill.id ? skill : s));
    setEditing(null);
    toast.success('Saqlandi');
  };

  const handleAdd = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: 'Yangi ko\'nikma',
      level: 50,
      color: 'from-primary to-primary/70',
      icon: '⭐',
    };
    setSkills(prev => [...prev, newSkill]);
    setEditing(newSkill);
    toast.success('Qo\'shildi — tahrirlang');
  };

  const handleDelete = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    toast.success('O\'chirildi');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Ko'nikmalar</h1>
          <p className="text-muted-foreground">{skills.length} ta ko'nikma</p>
        </div>
        <Button variant="hero" onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" /> Qo'shish
        </Button>
      </div>

      <div className="grid gap-4">
        {skills.map((skill) => (
          <motion.div key={skill.id} layout className="glass-card rounded-2xl p-5 border border-border/50">
            {editing?.id === skill.id ? (
              <SkillForm skill={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-2xl">{skill.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-display font-semibold text-foreground">{skill.name}</span>
                    <span className="text-primary font-semibold">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(skill)}
                    className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                    <Edit3 className="w-4 h-4 text-primary" />
                  </button>
                  <button onClick={() => handleDelete(skill.id)}
                    className="w-9 h-9 rounded-lg bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center transition-colors">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SkillForm({ skill, onSave, onCancel }: {
  skill: Skill; onSave: (s: Skill) => void; onCancel: () => void;
}) {
  const [form, setForm] = useState(skill);
  return (
    <div className="grid md:grid-cols-4 gap-3 items-end">
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Ikonka</label>
        <Input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}
          className="bg-secondary/50 border-border/50 focus:border-primary text-center text-xl" />
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Nomi</label>
        <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
          className="bg-secondary/50 border-border/50 focus:border-primary" />
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Daraja (0-100)</label>
        <Input type="number" min={0} max={100} value={form.level}
          onChange={e => setForm({ ...form, level: Number(e.target.value) })}
          className="bg-secondary/50 border-border/50 focus:border-primary" />
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="heroOutline" size="sm" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
        <Button type="button" variant="hero" size="sm" onClick={() => onSave(form)}>
          <Save className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Messages Tab ─────────────────────────────────────────
function MessagesTab({ messages, setMessages }: {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const [selected, setSelected] = useState<Message | null>(null);

  const markRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
  };

  const handleDelete = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
    toast.success("O'chirildi");
  };

  if (messages.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Xabarlar</h1>
        <div className="glass-card rounded-2xl p-12 border border-border/50 text-center">
          <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">Hali xabar yo'q</p>
          <p className="text-sm text-muted-foreground/60 mt-1">
            Saytdagi forma orqali xabar kelganda bu yerda ko'rinadi
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Xabarlar</h1>
          <p className="text-muted-foreground">
            {messages.filter(m => !m.is_read).length} ta o'qilmagan
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* List */}
        <div className="space-y-3">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              layout
              onClick={() => { setSelected(msg); markRead(msg.id); }}
              className={`glass-card rounded-2xl p-4 border cursor-pointer transition-all duration-200 hover:border-primary/30 ${
                selected?.id === msg.id ? 'border-primary/40' : 'border-border/50'
              } ${!msg.is_read ? 'bg-primary/5' : ''}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {!msg.is_read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                    <span className="font-display font-semibold text-foreground truncate">{msg.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{msg.email}</div>
                  <div className="text-sm text-muted-foreground truncate mt-1">{msg.message}</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                  className="w-7 h-7 rounded-lg bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center flex-shrink-0 transition-colors"
                >
                  <Trash2 className="w-3 h-3 text-destructive" />
                </button>
              </div>
              <div className="text-xs text-muted-foreground/50 mt-2">
                {new Date(msg.created_at).toLocaleDateString('uz-UZ')}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-2xl p-6 border border-border/50 h-fit sticky top-8"
          >
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-muted-foreground">O'qildi</span>
            </div>
            <h3 className="text-xl font-display font-bold text-foreground">{selected.name}</h3>
            <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">{selected.email}</a>
            <div className="mt-4 p-4 bg-secondary/50 rounded-xl">
              <p className="text-foreground leading-relaxed">{selected.message}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="hero" size="sm" asChild>
                <a href={`mailto:${selected.email}`}>Javob berish</a>
              </Button>
              <Button variant="heroOutline" size="sm" onClick={() => handleDelete(selected.id)}>
                <Trash2 className="w-4 h-4 mr-1" /> O'chirish
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
