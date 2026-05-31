import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Send, MessageCircle, Github, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const contactLinks = [
  {
    icon: MessageCircle,
    label: 'Telegram',
    value: '@Skywalker_71',
    href: 'https://t.me/Skywalker_71',
    color: 'hover:text-blue-400',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'abdukshoxjaxon@gmail.com',
    href: 'mailto:abdukshoxjaxon@gmail.com',
    color: 'hover:text-red-400',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Shoxzdezz',
    href: 'https://github.com/Shoxzdezz',
    color: 'hover:text-gray-400',
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-telegram', {
        body: formData,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success('Xabaringiz muvaffaqiyatli yuborildi!');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Xabar yuborishda xatolik yuz berdi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-background to-background" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary mb-4">
            Bog'lanish / Контакты
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Keling, <span className="text-gradient">hamkorlik</span> qilaylik
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Yangi loyihalar, savollar yoki shunchaki salomlashish uchun — bog'laning!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-8">
              To'g'ridan-to'g'ri bog'laning
            </h3>
            
            <div className="space-y-4 mb-12">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  className={`flex items-center gap-4 p-4 glass-card rounded-xl hover-glow transition-all duration-300 group ${link.color}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">{link.label}</div>
                    <div className="font-display font-medium text-foreground">{link.value}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </div>

            {/* Quote */}
            <div className="glass-card rounded-2xl p-6 glow-pulse">
              <p className="text-lg font-display italic text-muted-foreground">
                "Har bir ajoyib loyiha bitta xabardan boshlanadi."
              </p>
              <p className="text-sm text-primary mt-2">— Sizni kutaman! 🚀</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold mb-6">
                Xabar yuboring
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Ismingiz
                  </label>
                  <Input
                    type="text"
                    placeholder="Ismingizni kiriting"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Xabaringiz
                  </label>
                  <Textarea
                    placeholder="Loyihangiz haqida yozing..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary min-h-[150px] resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="xl" 
                  className="w-full"
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Yuborilmoqda...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Yuborildi!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Yuborish
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 pt-8 border-t border-border/30 text-center"
        >
          <p className="text-muted-foreground">
            © 2025 Frontend Developer Portfolio. Barcha huquqlar himoyalangan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
