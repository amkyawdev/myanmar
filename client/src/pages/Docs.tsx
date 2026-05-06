/**
 * Docs Page
 * Design: Documentation with cultural pattern background
 * Displays skill documentation from markdown files
 */

import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Streamdown } from 'streamdown';

const skills = [
  {
    id: 'skill',
    title: 'Myanmar AI Skill',
    description: 'Myanmar AI Assistant ၏ အခြင်းအခြင်းသော လုပ်ဆောင်ချက်များ',
    content: `# Myanmar AI Skill

Myanmar AI Assistant သည် အောက်ပါ အဓိက လုပ်ဆောင်ချက်များကို ပေးဆောင်ပါသည်။

## အဓိက လုပ်ဆောင်ချက်များ

### 1. Real-time Chat
- Groq API ကို အသုံးပြု၍ အမြန်တုံ့ပြန်မှု
- စကားလုံးချင်းဆီ တစ်ခြင်းတစ်ခြင်း ပြန်ပေးမှု
- မြန်မာ ဘာသာစကားကို အဆင့်မြင့်စွာ နားလည်ပြီး ဖြေကြားပေးမှု

### 2. Streaming Response
- API streaming ကို အသုံးပြု၍ အမြန်တုံ့ပြန်မှု
- Real-time status updates
- Smooth animations

### 3. PWA Support
- မိုဘိုင်းလ်တွင် အပ်ပလီကေးရှင်းအဖြစ် ထည့်သွင်းအသုံးပြုနိုင်သည်
- Offline support
- Push notifications`,
  },
  {
    id: 'explain',
    title: 'Explain Mode',
    description: 'အသေးစိတ် ရှင်းလင်းချက်များ ပေးဆောင်သည့် မုဒ်',
    content: `# Explain Mode

Explain mode သည် အသေးစိတ် ရှင်းလင်းချက်များ ပေးဆောင်သည့် လုပ်ဆောင်ချက်ဖြစ်ပါသည်။

## အသုံးပြုနည်း

1. သင်၏မေးခွန်းကို ရေးပါ
2. Explain mode ကို ရွေးချယ်ပါ
3. အသေးစိတ် ရှင်းလင်းချက်များ ရယူပါ

## အကျိုးအbenefit များ

- အသေးစိတ် ရှင်းလင်းချက်များ
- ဥပမာများ ပါဝင်သည်
- အလွယ်တကူ နားလည်နိုင်သည်`,
  },
  {
    id: 'websearch',
    title: 'Web Search',
    description: 'အင်တာနက်မှ သတင်းအချက်အလက် ရှာဖွေသည့် လုပ်ဆောင်ချက်',
    content: `# Web Search

Web search လုပ်ဆောင်ချက်သည် အင်တာနက်မှ အချက်အလက်များ ရှာဖွေပေးပါသည်။

## အသုံးပြုနည်း

1. သင်၏ရှာဖွေမည့် အကြောင်းအရာကို ရေးပါ
2. Web search ကို ရွေးချယ်ပါ
3. အင်တာနက်မှ အချက်အလက်များ ရယူပါ

## အကျိုးအbenefit များ

- အသစ်ဆုံး သတင်းအချက်အလက်များ
- အင်တာနက်မှ အချက်အလက်များ
- အ신뢰할်ရသည့် အရင်းအမြစ်များ`,
  },
];

export default function Docs() {
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
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">
              စာရွက်စာတမ်း
            </h1>
          </div>
        </div>
      </header>

      {/* Background Pattern */}
      <div
        className="fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663458499503/56kj47Yi9HKcfscnRmNDnz/docs-pattern-GyZositf228xTYf4YqKPY5.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 space-y-2">
              <h3 className="font-semibold text-foreground mb-4">Skills</h3>
              {skills.map((skill) => (
                <a
                  key={skill.id}
                  href={`#${skill.id}`}
                  className="block px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {skill.title}
                </a>
              ))}
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {skills.map((skill) => (
              <Card
                key={skill.id}
                id={skill.id}
                className="p-8 border-border/40 scroll-mt-24"
              >
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {skill.title}
                </h2>
                <p className="text-muted-foreground mb-6">{skill.description}</p>
                <div className="prose prose-sm max-w-none">
                  <Streamdown>{skill.content}</Streamdown>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
