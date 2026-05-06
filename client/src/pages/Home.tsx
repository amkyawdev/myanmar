/**
 * Home Page - Get Started
 * Design: Modern Minimalist with Cultural Warmth
 * Hero section with Burmese welcome text and CTA to chat
 */

import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">Myanmar AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/docs">
              <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                စာရွက်စာတမ်း
              </a>
            </Link>
            <Link href="/about">
              <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                အကြောင်း
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663458499503/56kj47Yi9HKcfscnRmNDnz/hero-burmese-ai-LLkuRvnenwwktorjGb2Wpn.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/30 z-10" />

        {/* Content */}
        <div className="container relative z-20 py-20 md:py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                  မြန်မာ AI
                  <br />
                  <span className="text-primary">အကူအညီ</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                  Groq API ဖြင့် အဆင့်မြင့် AI နည်းပညာကို အသုံးပြု၍ သင်၏မေးခွန်းများကို ကျွမ်းကျင်စွာ ဖြေကြားပေးသည့် မြန်မာ AI အကူအညီ။
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Real-time Streaming</h3>
                    <p className="text-sm text-muted-foreground">
                      စကားလုံးချင်းဆီ တစ်ခြင်းတစ်ခြင်း ပြန်ပေးသည့် အမြန်အဆင့်မြင့် တုံ့ပြန်မှု
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Burmese Language</h3>
                    <p className="text-sm text-muted-foreground">
                      မြန်မာ ဘာသာစကားကို အဆင့်မြင့်စွာ နားလည်ပြီး ဖြေကြားပေးသည်
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">PWA Support</h3>
                    <p className="text-sm text-muted-foreground">
                      မိုဘိုင်းလ်တွင် အပ်ပလီကေးရှင်းအဖြစ် ထည့်သွင်းအသုံးပြုနိုင်သည်
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link href="/chat">
                  <a>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 group"
                    >
                      စတင်ပြောဆိုမည်
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </Link>
              </div>
            </div>

            {/* Right Accent */}
            <div className="hidden lg:block">
              <div
                className="aspect-square rounded-2xl shadow-2xl"
                style={{
                  backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663458499503/56kj47Yi9HKcfscnRmNDnz/chat-accent-23a5QCh26UJTmUoSzaWYzF.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-card border-t border-border/40">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              အဓိက လုပ်ဆောင်ချက်များ
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Myanmar AI Assistant သည် အောက်ပါ အဆင့်မြင့် လုပ်ဆောင်ချက်များကို ပေးဆောင်ပါသည်
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Intelligent Chat',
                description: 'Groq API ကို အသုံးပြု၍ အဆင့်မြင့် AI စာမေးမြန်းမှု',
                icon: '💬',
              },
              {
                title: 'Real-time Response',
                description: 'စကားလုံးချင်းဆီ တစ်ခြင်းတစ်ခြင်း ပြန်ပေးသည့် အမြန်တုံ့ပြန်မှု',
                icon: '⚡',
              },
              {
                title: 'Offline Support',
                description: 'PWA နည်းပညာဖြင့် အင်တာနက်မဲ့အခါ အသုံးပြုနိုင်သည်',
                icon: '📱',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl border border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            အခုပင် စတင်ပြောဆိုမည်
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Myanmar AI Assistant ကို အသုံးပြုပြီး သင်၏ မေးခွန်းများကို ဖြေကြားရယူပါ
          </p>
          <Link href="/chat">
            <a>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 group"
              >
                စတင်မည်
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 Myanmar AI Assistant. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/docs">
              <a className="hover:text-foreground transition-colors">စာရွက်စာတမ်း</a>
            </Link>
            <Link href="/about">
              <a className="hover:text-foreground transition-colors">အကြောင်း</a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
