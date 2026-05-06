/**
 * About Page
 * Design: Information about Myanmar AI Assistant project
 */

import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="container flex items-center gap-4 h-16">
          <Link href="/">
            <a>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </a>
          </Link>
          <h1 className="text-xl font-semibold text-foreground">အကြောင်း</h1>
        </div>
      </header>

      {/* Content */}
      <div className="container py-12 max-w-3xl">
        {/* Project Info */}
        <Card className="p-8 mb-8 border-border/40">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Myanmar AI Assistant
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Myanmar AI Assistant သည် Groq API ကို အသုံးပြု၍ မြန်မာ ဘာသာစကားကို အဆင့်မြင့်စွာ နားလည်ပြီး ဖြေကြားပေးသည့် AI အကူအညီ ပရိုဂရမ်ဖြစ်ပါသည်။
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">အဓိက လုပ်ဆောင်ချက်များ</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Real-time streaming chat ဖြင့် အမြန်တုံ့ပြန်မှု</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>မြန်မာ ဘာသာစကားကို အဆင့်မြင့်စွာ နားလည်ပြီး ဖြေကြားပေးမှု</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>PWA နည်းပညာဖြင့် မိုဘိုင်းလ်တွင် အပ်ပလီကေးရှင်းအဖြစ် အသုံးပြုနိုင်မှု</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>အင်တာနက်မဲ့အခါ offline support</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Tech Stack */}
        <Card className="p-8 mb-8 border-border/40">
          <h2 className="text-2xl font-bold text-foreground mb-6">နည်းပညာ အရင်းအမြစ်များ</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'React 19', desc: 'Frontend Framework' },
              { name: 'Next.js 14', desc: 'App Router' },
              { name: 'Tailwind CSS', desc: 'Styling' },
              { name: 'Groq API', desc: 'LLM Provider' },
              { name: 'PWA', desc: 'next-pwa' },
              { name: 'TypeScript', desc: 'Type Safety' },
            ].map((tech, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-border/40 hover:border-primary/40 transition-colors"
              >
                <p className="font-semibold text-foreground text-sm">{tech.name}</p>
                <p className="text-xs text-muted-foreground">{tech.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Animation Features */}
        <Card className="p-8 mb-8 border-border/40">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            အနုပညာ လုပ်ဆောင်ချက်များ
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Send Button Loading</h3>
              <p className="text-muted-foreground text-sm">
                Send button ကို နှိပ်လိုက်သည့်အခါ spinner animation ပြပြီး API response ပြန်လာသည်အထိ disabled အခြေအနေတွင် ရှိသည်။
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Thinking Animation</h3>
              <p className="text-muted-foreground text-sm">
                Three dots animation သည် AI ကိုယ်စားပြုသည့် အနုပညာ ပြသည်။ စကားလုံးချင်းဆီ ပြန်ပေးသည့်အခါ animated dots များ ပြသည်။
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Status Text Animation</h3>
              <p className="text-muted-foreground text-sm">
                API stream အဆင့်တိုင်းကို real-time ဖမ်းပြီး status text များ ပြောင်းလဲပြီး လှုပ်ရှားသည်။ ဥပမာ - တွေးနေသည်... ရှာနေသည်... ဖန်တီးနေသည်...
              </p>
            </div>
          </div>
        </Card>

        {/* Project Structure */}
        <Card className="p-8 mb-8 border-border/40">
          <h2 className="text-2xl font-bold text-foreground mb-6">ပရိုဂရမ်ဖွဲ့စည်းပုံ</h2>

          <div className="bg-muted/50 p-4 rounded-lg font-mono text-xs text-foreground overflow-x-auto">
            <pre>{`burmese-ai/
├── app/
│   ├── page.tsx (Get Started)
│   ├── chat/
│   │   └── page.tsx
│   ├── docs/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── api/
│       └── chat/
│           └── route.ts
├── components/
│   ├── ChatInterface.tsx
│   ├── StatusAnimation.tsx
│   ├── ThreeDots.tsx
│   └── SendButton.tsx
├── skills/
│   ├── Skill.md
│   ├── Explain.md
│   ├── Web-search.md
│   └── Agent.md
└── public/
    ├── icon-192.png
    └── icon-512.png`}</pre>
          </div>
        </Card>

        {/* Contact & Links */}
        <Card className="p-8 border-border/40">
          <h2 className="text-2xl font-bold text-foreground mb-6">ဆက်သွယ်ရန်</h2>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Myanmar AI Assistant အကြောင်း မေးခွန်းများ သို့မဟုတ် အကြံပြုချက်များ ရှိပါက အောက်ပါ လင်ခ်များမှတစ်ဆင့် ဆက်သွယ်ပါ။
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
              <Link href="/chat">
                <a className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  <span className="text-sm">စတင်ပြောဆိုမည်</span>
                </a>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
