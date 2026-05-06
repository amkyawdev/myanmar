/**
 * Docs Page
 * Design: Documentation with cultural pattern background
 * Dynamically loads skill documentation from /public/skills/ directory
 */

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Loader2 } from 'lucide-react';
import { Streamdown } from 'streamdown';

interface Skill {
  id: string;
  title: string;
  description: string;
  content: string;
}

const skillsFiles = ['Skill.md', 'Explain.md', 'Web-search.md', 'Agent.md', 'CLI-Skill.md'];

export default function Docs() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSkills() {
      try {
        const loaded: Skill[] = [];
        for (const file of skillsFiles) {
          const response = await fetch(`/skills/${file}`);
          if (response.ok) {
            const content = await response.text();
            // Extract title from first heading
            const titleMatch = content.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '');
            
            loaded.push({
              id: file.replace('.md', '').toLowerCase().replace('-', ''),
              title,
              description: file.replace('.md', ''),
              content,
            });
          }
        }
        setSkills(loaded);
      } catch (error) {
        console.error('Failed to load skills:', error);
      } finally {
        setLoading(false);
      }
    }
    loadSkills();
  }, []);

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
            {loading ? (
              <Card className="p-8 border-border/40">
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">Loading skills...</span>
                </div>
              </Card>
            ) : skills.length === 0 ? (
              <Card className="p-8 border-border/40">
                <p className="text-muted-foreground">No skills found.</p>
              </Card>
            ) : (
              skills.map((skill) => (
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
