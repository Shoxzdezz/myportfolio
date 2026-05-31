import { motion } from 'framer-motion';
import { ArrowDown, Code2, Zap, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center hero-gradient overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT — Text */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center justify-center lg:justify-start gap-2 mb-8"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Frontend Developer</span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
              >
                <span className="text-foreground">Salom, men</span>
                <br />
                <span className="text-gradient">Shoxjaxon</span>
                <br />
                <span className="text-foreground">Abdukarimov</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              >
                Zamonaviy va interaktiv veb-saytlar yarataman.
                <span className="text-primary"> Kodingiz — mening san'atim.</span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-16"
              >
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => handleScroll('#projects')}
                  className="group"
                >
                  <Code2 className="w-5 h-5 mr-2" />
                  Loyihalarni ko'rish
                </Button>
                <Button
                  variant="heroOutline"
                  size="xl"
                  onClick={() => handleScroll('#about')}
                >
                  Men haqimda
                </Button>
                <Button
                  variant="heroOutline"
                  size="xl"
                  asChild
                >
                  <a href="/cv.pdf" download>
                    <Download className="w-5 h-5 mr-2" />
                    CV yuklab olish
                  </a>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center lg:justify-start gap-12 md:gap-16"
              >
                {[
                  { value: '10+', label: 'Loyihalar' },
                  { value: '1+', label: 'Yil tajriba' },
                  { value: '100%', label: 'Sadoqat' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-display font-bold text-gradient">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 blur-2xl scale-110" />
                {/* Rotating border */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin" style={{ animationDuration: '20s' }} />

                {/* Image container */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 float-animation">
                  <img
                    src="/profile.jpg"
                    alt="Shoxjaxon Abdukarimov"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Rasm topilmasa placeholder ko'rsat
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                            <div class="text-7xl font-bold text-primary/60 font-display">SA</div>
                            <div class="text-sm text-muted-foreground mt-2">Rasm qo'ying</div>
                            <div class="text-xs text-muted-foreground/60">public/profile.jpg</div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>

                {/* Floating badge — top right */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 border border-primary/30"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm font-medium text-foreground">Ishga tayyor</span>
                  </div>
                </motion.div>

                {/* Floating badge — bottom left */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-4 py-3 border border-primary/30"
                >
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">React Dev</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
          onClick={() => handleScroll('#about')}
        >
          <span className="text-xs uppercase tracking-widest">Pastga aylantiring</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
