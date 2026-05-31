import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Portfolio Website',
    description: "Shaxsiy portfolio sayti — zamonaviy dizayn va animatsiyalar bilan.",
    tags: ['React', 'Tailwind', 'Framer Motion'],
    image: '/projects/portfolio.jpg',
    color: 'from-blue-500/30 to-purple-500/30',
    link: '#',
    github: '#',
  },
  {
    title: 'E-Commerce Dashboard',
    description: "Onlayn do'kon boshqaruv paneli — statistika va grafiklar bilan.",
    tags: ['React', 'TypeScript', 'Recharts'],
    image: '/projects/ecommerce.jpg',
    color: 'from-green-500/30 to-emerald-500/30',
    link: '#',
    github: '#',
  },
  {
    title: 'Task Manager App',
    description: 'Vazifalarni boshqarish ilovasi — drag & drop funksiyasi bilan.',
    tags: ['React', 'Redux', 'CSS Modules'],
    image: '/projects/taskmanager.jpg',
    color: 'from-orange-500/30 to-red-500/30',
    link: '#',
    github: '#',
  },
  {
    title: 'Weather App',
    description: 'Ob-havo ilovasi — API integratsiyasi va animatsiyalar.',
    tags: ['JavaScript', 'API', 'CSS'],
    image: '/projects/weather.jpg',
    color: 'from-cyan-500/30 to-blue-500/30',
    link: '#',
    github: '#',
  },
  {
    title: 'Landing Page',
    description: 'Kreativ landing sahifa — parallax va scroll animatsiyalari.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/landing.jpg',
    color: 'from-pink-500/30 to-rose-500/30',
    link: '#',
    github: '#',
  },
  {
    title: 'Blog Platform',
    description: "Blog platformasi — markdown qo'llab-quvvatlash bilan.",
    tags: ['React', 'Markdown', 'Tailwind'],
    image: '/projects/blog.jpg',
    color: 'from-violet-500/30 to-purple-500/30',
    link: '#',
    github: '#',
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container mx-auto px-4 md:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary mb-4">
            Loyihalar / Проекты
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Mening <span className="text-gradient">loyihalarim</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            O'rganish jarayonida yaratgan loyihalarim. Har biri yangi bilim va tajriba manbai.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl overflow-hidden border border-border/50 transition-all duration-300 hover:border-primary/30 hover:-translate-y-2">
                {/* Project Image / Preview */}
                <div className={`relative h-44 bg-gradient-to-br ${project.color} overflow-hidden`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Rasm yo'q bo'lsa gradient ko'rsat
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Overlay with links */}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-5 h-5 text-foreground" />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-primary/80 border border-primary flex items-center justify-center hover:bg-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  </div>
                  {/* Project number */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-background/70 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">0{index + 1}</span>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-2 border-t border-border/30">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Kod
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
