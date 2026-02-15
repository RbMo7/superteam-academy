'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiZap, FiCheck } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface HintToggleProps {
  hints: string[];
  className?: string;
}

/**
 * Collapsible hints section for lessons
 */
export function HintToggle({ hints, className }: HintToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);

  if (hints.length === 0) return null;

  const revealNextHint = () => {
    if (revealedCount < hints.length) {
      setRevealedCount((c) => c + 1);
    }
  };

  return (
    <Card className={cn('border-warning/30 bg-warning/5', className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-warning/10 transition-colors p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiZap className="size-4 text-warning" />
                <CardTitle className="text-sm font-medium">
                  Hints ({revealedCount}/{hints.length})
                </CardTitle>
              </div>
              {isOpen ? (
                <FiChevronUp className="size-4" />
              ) : (
                <FiChevronDown className="size-4" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-3">
            {hints.slice(0, revealedCount).map((hint, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-warning/20 text-xs font-medium">
                  {i + 1}
                </span>
                <span>{hint}</span>
              </div>
            ))}
            {revealedCount < hints.length && (
              <Button
                variant="outline"
                size="sm"
                onClick={revealNextHint}
                className="w-full mt-2"
              >
                <FiZap className="mr-2 size-3" />
                Reveal Hint {revealedCount + 1}
              </Button>
            )}
            {revealedCount === hints.length && (
              <p className="text-xs text-muted-foreground text-center">
                All hints revealed
              </p>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

interface SolutionToggleProps {
  solution: string;
  className?: string;
}

/**
 * Collapsible solution section for lessons
 */
export function SolutionToggle({ solution, className }: SolutionToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <Card className={cn('border-success/30 bg-success/5', className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-success/10 transition-colors p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiCheck className="size-4 text-success" />
                <CardTitle className="text-sm font-medium">Solution</CardTitle>
              </div>
              {isOpen ? (
                <FiChevronUp className="size-4" />
              ) : (
                <FiChevronDown className="size-4" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {!confirmed ? (
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to see the solution? Try the hints
                  first!
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmed(true)}
                >
                  Show Solution
                </Button>
              </div>
            ) : (
              <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
                <MarkdownContent content={solution} />
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

interface MarkdownContentProps {
  content: string;
  className?: string;
}

/**
 * Renders markdown content with proper styling.
 * Uses a simple HTML conversion for now - can be enhanced with remark/rehype.
 */
export function MarkdownContent({ content, className }: MarkdownContentProps) {
  // Simple markdown to HTML conversion
  // In production, use remark/rehype for proper parsing
  const html = simpleMarkdownToHtml(content);

  return (
    <div
      className={cn(
        'prose prose-neutral dark:prose-invert max-w-none',
        'prose-headings:font-semibold prose-headings:tracking-tight',
        'prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg',
        'prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5',
        'prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:bg-muted prose-pre:border',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Simple markdown to HTML converter
 * For production, use remark/rehype
 */
function simpleMarkdownToHtml(markdown: string): string {
  let html = markdown;

  // Code blocks (must be first)
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (_match, lang, code) =>
      `<pre><code class="language-${lang ?? 'text'}">${escapeHtml(code.trim())}</code></pre>`
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code>$1</code>'
  );

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Paragraphs (double newline)
  html = html.replace(/\n\n(?!<)/g, '</p><p>');
  
  // Wrap in paragraph if not already wrapped
  if (!html.startsWith('<')) {
    html = `<p>${html}</p>`;
  }

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<[huo])/g, '$1');
  html = html.replace(/(<\/[huo]l>|<\/pre>)<\/p>/g, '$1');

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
