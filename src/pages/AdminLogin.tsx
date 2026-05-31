import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Shield, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminLogin } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const MAX_ATTEMPTS = 5;
const BLOCK_DURATION = 5 * 60 * 1000; // 5 daqiqa

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);

  const isBlocked = blockedUntil !== null && Date.now() < blockedUntil;
  const remainingSeconds = isBlocked
    ? Math.ceil((blockedUntil! - Date.now()) / 1000)
    : 0;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isBlocked) {
      toast.error(`${remainingSeconds} soniya kuting`);
      return;
    }

    if (!password) {
      toast.error('Parolni kiriting');
      return;
    }

    setLoading(true);

    // Brute-force himoyasi uchun sun'iy kechikish
    await new Promise(r => setTimeout(r, 600));

    try {
      const ok = await adminLogin(password);

      if (ok) {
        toast.success('Xush kelibsiz!');
        navigate('/admin/dashboard');
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= MAX_ATTEMPTS) {
          setBlockedUntil(Date.now() + BLOCK_DURATION);
          setAttempts(0);
          toast.error('5 marta noto\'g\'ri kiritildi. 5 daqiqa kuting.');
        } else {
          toast.error(`Noto'g'ri parol (${newAttempts}/${MAX_ATTEMPTS})`);
        }
      }
    } catch {
      toast.error('Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="glass-card rounded-3xl p-8 border border-border/50">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: isBlocked ? [0, -5, 5, -5, 0] : 0 }}
              transition={{ duration: 0.4 }}
              className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4"
            >
              <Shield className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-2xl font-display font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground text-sm mt-1">Faqat ruxsat etilgan kirish</p>
          </div>

          {/* Blocked warning */}
          {isBlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-center"
            >
              <p className="text-destructive text-sm font-medium">🔒 Kirish bloklandi</p>
              <p className="text-destructive/70 text-xs mt-1">{remainingSeconds} soniyadan keyin urinib ko'ring</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Parol
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-secondary/50 border-border/50 focus:border-primary h-12"
                  disabled={isBlocked || loading}
                  autoComplete="current-password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Attempts indicator */}
            {attempts > 0 && !isBlocked && (
              <div className="flex gap-1">
                {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i < attempts ? 'bg-destructive' : 'bg-secondary'
                    }`}
                  />
                ))}
              </div>
            )}

            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full"
              disabled={isBlocked || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Tekshirilmoqda...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Kirish
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground/40 mt-6">
            🔐 Barcha urinishlar qayd etiladi
          </p>
        </div>

        <div className="text-center mt-4">
          <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Saytga qaytish
          </a>
        </div>
      </motion.div>
    </div>
  );
}
