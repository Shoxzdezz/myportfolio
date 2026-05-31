import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Qanday xizmatlar ko\'rsatasiz?',
    questionRu: 'Какие услуги вы предоставляете?',
    answer: 'Men frontend development bo\'yicha xizmatlar ko\'rsataman: landing sahifalar, portfolio saytlar, veb-ilovalar va admin panellar yaratish. React, TypeScript, Tailwind CSS texnologiyalaridan foydalanaman.',
  },
  {
    question: 'Loyiha qancha vaqt oladi?',
    questionRu: 'Сколько времени занимает проект?',
    answer: 'Loyihaning murakkabligiga qarab, 1 haftadan 1 oygacha vaqt ketishi mumkin. Oddiy landing sahifa 3-5 kun, murakkab veb-ilova 2-4 hafta olishi mumkin.',
  },
  {
    question: 'Narxlar qanday?',
    questionRu: 'Какие цены?',
    answer: 'Narxlar loyihaning hajmi va murakkabligiga bog\'liq. Men har bir loyihani individual ko\'rib chiqaman va optimal narx taklif qilaman. Bog\'laning va bepul konsultatsiya oling!',
  },
  {
    question: 'Freelance ishlayszimi?',
    questionRu: 'Работаете ли вы фрилансом?',
    answer: 'Ha, men freelance ishlayman va yangi loyihalar uchun ochiqman. Telegram orqali bog\'laning yoki email yuboring — sizning loyihangizni muhokama qilishga tayyorman.',
  },
  {
    question: 'Qanday texnologiyalar bilasiz?',
    questionRu: 'Какие технологии вы знаете?',
    answer: 'Asosan React ekosistemasi bilan ishlayman: React, TypeScript, Next.js, Tailwind CSS, Framer Motion, Three.js. Shuningdek, HTML, CSS, JavaScript, Git va boshqa texnologiyalarni bilaman.',
  },
  {
    question: 'Bog\'lanish uchun qaysi usul yaxshiroq?',
    questionRu: 'Какой способ связи лучше?',
    answer: 'Eng tez javob olish uchun Telegram orqali yozing. Email orqali ham bog\'lanishingiz mumkin — 24 soat ichida javob beraman.',
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
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
            FAQ / Вопросы
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Ko'p beriladigan <span className="text-gradient">savollar</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Eng ko'p so'raladigan savollarga javoblar. Boshqa savolingiz bo'lsa — bog'laning!
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="glass-card rounded-xl border-none px-6 data-[state=open]:hover-glow transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary hover:no-underline py-6">
                    <div>
                      <div>{faq.question}</div>
                      <div className="text-sm text-muted-foreground font-normal mt-1">
                        {faq.questionRu}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
