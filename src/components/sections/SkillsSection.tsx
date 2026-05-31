import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const skills = [
  { name: 'HTML5', level: 95, color: 'from-orange-500 to-orange-600', icon: '🌐' },
  { name: 'CSS3', level: 80, color: 'from-cyan-500 to-blue-500', icon: '🎨' },
  { name: 'JavaScript', level: 65, color: 'from-yellow-400 to-yellow-500', icon: '⚡' },
  { name: 'Python', level: 75, color: 'from-blue-400 to-blue-600', icon: '🐍' },
  { name: 'Django', level: 45, color: 'from-green-500 to-green-700', icon: '🦄' },
  { name: 'OSINT', level: 50, color: 'from-red-500 to-rose-600', icon: '🔍' },
];

const techStack = [
  { name: 'HTML5', icon: '🌐' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'Python', icon: '🐍' },
  { name: 'Django', icon: '🦄' },
  { name: 'OSINT', icon: '🔍' },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary mb-4">
            Ko'nikmalar / Навыки
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Texnik <span className="text-gradient">ko'nikmalarim</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Zamonaviy veb-texnologiyalarni o'rganish va amalda qo'llash — mening kundalik mashg'ulotim.
          </p>
        </motion.div>

        {/* Skills Progress Bars */}
        <div className="max-w-3xl mx-auto mb-20">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-6"
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex justify-between mb-2">
                <span className="font-display font-semibold text-foreground">{skill.name}</span>
                <span className="text-primary font-semibold">{skill.level}%</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
                >
                  {hoveredSkill === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-white/20"
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-center text-2xl font-display font-semibold mb-8">
            Asosiy texnologiyalar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card rounded-xl p-6 text-center hover-glow cursor-pointer"
              >
                <span className="text-4xl mb-3 block">{tech.icon}</span>
                <span className="font-display font-medium text-foreground">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
