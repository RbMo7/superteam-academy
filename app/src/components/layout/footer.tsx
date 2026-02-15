import Link from 'next/link';

import { FiGithub, FiTwitter } from 'react-icons/fi';

import { ROUTES } from '@/config';

import { Logo } from '@/components/common';
import { Container } from '@/components/ui/container';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Learn',
    links: [
      { label: 'Courses', href: ROUTES.COURSES },
      { label: 'Tracks', href: '/tracks' },
      { label: 'Challenges', href: '/challenges' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Leaderboard', href: ROUTES.LEADERBOARD },
      { label: 'Discord', href: 'https://discord.gg/superteam', external: true },
      { label: 'Twitter', href: 'https://twitter.com/superteam', external: true },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API', href: '/api-docs' },
      { label: 'GitHub', href: 'https://github.com/superteam', external: true },
    ],
  },
];

const socialLinks = [
  { icon: <FiTwitter className="size-5" />, href: 'https://twitter.com/superteam', label: 'Twitter' },
  { icon: <FiGithub className="size-5" />, href: 'https://github.com/superteam', label: 'GitHub' },
];

/**
 * Footer - Main footer component with links and social.
 */
export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo size="md" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Learn Solana development and earn verifiable credentials on-chain. Your skills,
              proven.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Superteam Academy. Built on Solana.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
