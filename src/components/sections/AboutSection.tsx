import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Target, Rocket, Heart, MapPin, Calendar, Coffee } from 'lucide-react';

const aboutCards = [
  {
    icon: User,
    title: "Kim bo'laman",
    description: "Men yosh va ambitsiyali Frontend dasturchiman. Har kuni yangi texnologiyalarni o'rganishga intilaman.",
  },
  {
    icon: Target,
    title: 'Nima qilaman',
    description: "Zamonaviy, tez va chiroyli veb-saytlar yarataman. React, JavaScript va boshqa texnologiyalar bilan ishlayman.",
  },
  {
    icon: Rocket,
    title: 'Mening maqsadim',
    description: "Professional dasturchi bo'lish va dunyo miqyosidagi loyihalarda ishtirok etish — mening asosiy maqsadim.",
  },
  {
    icon: Heart,
    title: 'Qanday ishlayman',
    description: "Har bir loyihaga alohida e'tibor va mehr bilan yondashaman. Sifat men uchun eng muhim narsa.",
  },
];

const personalInfo = [
  { icon: MapPin, label: 'Joylashuv', value: "O'zbekiston, Toshkent" },
  { icon: Calendar, label: 'Tajriba', value: '1+ yil' },
  { icon: Coffee, label: 'Holat', value: 'Ishga tayyor' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container mx-auto px-4 md:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary mb-4">
            Men haqimda / Обо мне
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Kim</span> bo'laman?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Dasturlash — bu shunchaki ish emas, bu mening hayotim. Har bir satr kod mening yaratuvchilik
            ishtiyoqimning ifodasi.
          </p>
        </motion.div>

        {/* Main content: image + info */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto mb-20">

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-primary/5 blur-2xl scale-105" />

              {/* Image */}
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden border-2 border-primary/20">
                <img
                  src="/profile.jpg"
                  alt="Shoxjaxon Abdukarimov"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,hsl(215 50% 45% / 0.15),hsl(215 50% 45% / 0.05))">
                          <div style="font-size:5rem;font-weight:700;color:hsl(215 50% 45% / 0.5);font-family:'Space Grotesk',sans-serif">SA</div>
                          <div style="font-size:0.75rem;color:#888;margin-top:8px">public/profile.jpg</div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Experience badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-5 -right-5 glass-card rounded-2xl px-5 py-3 border border-primary/30"
              >
                <div className="text-2xl font-display font-bold text-gradient">1+</div>
                <div className="text-xs text-muted-foreground">Yil tajriba</div>
              </motion.div>

              {/* Projects badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -top-5 -left-5 glass-card rounded-2xl px-5 py-3 border border-primary/30"
              >
                <div className="text-2xl font-display font-bold text-gradient">10+</div>
                <div className="text-xs text-muted-foreground">Loyihalar</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-3xl font-display font-bold mb-4 text-foreground">
              Shoxjaxon <span className="text-gradient">Abdukarimov</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              Men Frontend dasturchi sifatida zamonaviy veb-ilovalar yarataman.
              React, TypeScript va Tailwind CSS — mening asosiy qurollarim.
              Har bir loyihada foydalanuvchi tajribasini birinchi o'ringa qo'yaman.
            </p>

            {/* Personal info */}
            <div className="space-y-4 mb-8">
              {personalInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="font-medium text-foreground">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <div className="glass-card rounded-2xl p-5 border-l-4 border-primary/50">
              <p className="text-muted-foreground italic">
                "Kod yozish — bu muammolarni ijodiy hal qilish san'ati."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {aboutCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-8 h-full hover-glow transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <card.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
