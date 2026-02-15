'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { FiMaximize2, FiMinimize2, FiExternalLink, FiRefreshCw } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SolanaPlaygroundProps {
  /** Starter code to load */
  starterCode?: string;
  /** Project ID for existing playground project */
  projectId?: string;
  /** Language type */
  language?: 'rust' | 'typescript' | 'anchor';
  /** Callback when code changes */
  onCodeChange?: (code: string) => void;
  /** Additional className */
  className?: string;
}

/**
 * Solana Playground Embed Component
 *
 * Embeds Solana Playground (beta.solpg.io) in an iframe.
 * Supports code injection and extraction via postMessage API.
 */
export function SolanaPlayground({
  starterCode,
  projectId,
  language = 'anchor',
  onCodeChange,
  className,
}: SolanaPlaygroundProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Construct playground URL
  const playgroundUrl = projectId
    ? `https://beta.solpg.io/${projectId}`
    : 'https://beta.solpg.io/';

  // Handle iframe load
  const handleLoad = useCallback(() => {
    setIsLoading(false);

    // Inject starter code if provided
    if (starterCode && iframeRef.current?.contentWindow) {
      // Note: Actual code injection requires Solana Playground's postMessage API
      // This is a stub - in production, use their documented API
      try {
        iframeRef.current.contentWindow.postMessage(
          {
            type: 'SET_CODE',
            code: starterCode,
            language,
          },
          'https://beta.solpg.io'
        );
      } catch (err) {
        console.warn('[SolanaPlayground] Failed to inject code:', err);
      }
    }
  }, [starterCode, language]);

  // Listen for code changes from playground
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://beta.solpg.io') return;

      if (event.data?.type === 'CODE_CHANGE' && onCodeChange) {
        onCodeChange(event.data.code);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onCodeChange]);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Refresh iframe
  const handleRefresh = () => {
    setIsLoading(true);
    setError(null);
    if (iframeRef.current) {
      iframeRef.current.src = playgroundUrl;
    }
  };

  // Handle iframe error
  const handleError = () => {
    setIsLoading(false);
    setError('Failed to load Solana Playground. Please try again.');
  };

  return (
    <div
      className={cn(
        'relative flex flex-col bg-background',
        isFullscreen && 'fixed inset-0 z-50',
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Solana Playground</span>
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className="size-7"
            title="Refresh"
          >
            <FiRefreshCw className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="size-7"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <FiMinimize2 className="size-3.5" />
            ) : (
              <FiMaximize2 className="size-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="size-7"
            title="Open in new tab"
          >
            <a
              href={playgroundUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiExternalLink className="size-3.5" />
            </a>
          </Button>
        </div>
      </div>

      {/* Iframe Container */}
      <div className="relative flex-1">
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center">
                <FiRefreshCw className="size-8 animate-spin text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Loading Solana Playground...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <div className="space-y-4 text-center">
              <p className="text-sm text-destructive">{error}</p>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Iframe */}
        <iframe
          ref={iframeRef}
          src={playgroundUrl}
          className={cn(
            'h-full w-full border-0',
            (isLoading || error) && 'invisible'
          )}
          title="Solana Playground"
          onLoad={handleLoad}
          onError={handleError}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}

/**
 * Playground Skeleton for SSR
 */
export function SolanaPlaygroundSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-2">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-1">
          <Skeleton className="size-7" />
          <Skeleton className="size-7" />
          <Skeleton className="size-7" />
        </div>
      </div>
      <div className="flex-1">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}

/**
 * Fallback code editor for when Playground isn't available
 */
interface SimpleCodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language?: string;
  className?: string;
}

export function SimpleCodeEditor({
  code,
  onChange,
  language = 'rust',
  className,
}: SimpleCodeEditorProps) {
  return (
    <div className={cn('flex flex-col bg-[#1e1e1e]', className)}>
      <div className="flex items-center justify-between border-b border-[#333] px-3 py-2">
        <span className="text-sm font-medium text-gray-300">Code Editor</span>
        <span className="rounded bg-[#333] px-1.5 py-0.5 text-xs text-gray-400">
          {language}
        </span>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'flex-1 resize-none bg-transparent p-4',
          'font-mono text-sm text-gray-200',
          'focus:outline-none',
          'placeholder:text-gray-500'
        )}
        placeholder="// Write your code here..."
        spellCheck={false}
      />
    </div>
  );
}
