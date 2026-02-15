/**
 * Mock Lesson Data
 *
 * Static mock data for lesson content during development.
 * Will be replaced with Arweave/CMS integration.
 */

import type { LessonDetail } from './types';

/**
 * Mock lessons organized by course slug
 */
export const MOCK_LESSONS: Record<string, LessonDetail[]> = {
  'solana-fundamentals': [
    {
      id: 'intro-to-solana',
      courseSlug: 'solana-fundamentals',
      title: 'Introduction to Solana',
      type: 'article',
      order: 1,
      duration: 15,
      xpReward: 50,
      content: `# Introduction to Solana

Solana is a high-performance blockchain designed for decentralized applications and cryptocurrencies. It uses a unique combination of **Proof of History (PoH)** and **Proof of Stake (PoS)** to achieve high throughput and low latency.

## Key Features

- **400ms block times** - Near-instant transaction finality
- **65,000+ TPS** - High throughput for scalable applications
- **Low fees** - Transactions cost fractions of a cent
- **Composability** - Programs can call other programs seamlessly

## The Solana Architecture

Solana's architecture consists of several key components:

### 1. Validators
Validators are nodes that process transactions and maintain the blockchain state. They participate in consensus and earn rewards for their work.

### 2. Clusters
A cluster is a set of validators working together. The main clusters are:
- **Mainnet-beta**: Production network
- **Devnet**: Development and testing
- **Testnet**: Validator testing

### 3. Accounts
Everything in Solana is an account. Accounts can hold:
- SOL (native token)
- Data (program state)
- Executable code (programs)

## Next Steps

In the next lesson, we'll dive deeper into Solana accounts and understand how data is stored on-chain.
`,
      hints: [
        'Think of Solana accounts like files in a filesystem - they store data and have owners.',
        'Programs are special accounts that contain executable code.',
      ],
      nextLessonId: 'understanding-accounts',
    },
    {
      id: 'understanding-accounts',
      courseSlug: 'solana-fundamentals',
      title: 'Understanding Solana Accounts',
      type: 'article',
      order: 2,
      duration: 20,
      xpReward: 75,
      content: `# Understanding Solana Accounts

Accounts are the fundamental building blocks of Solana. Every piece of data on the blockchain is stored in an account.

## Account Structure

Every account has:

\`\`\`rust
pub struct Account {
    /// Lamports in the account
    pub lamports: u64,
    /// Data held in this account
    pub data: Vec<u8>,
    /// Program that owns this account
    pub owner: Pubkey,
    /// Is this account executable?
    pub executable: bool,
    /// Epoch at which this account will next owe rent
    pub rent_epoch: Epoch,
}
\`\`\`

## Account Types

### 1. System Accounts
Owned by the System Program, these hold SOL and can be used to pay for transactions.

### 2. Program Accounts
Executable accounts containing BPF bytecode. These are immutable once deployed.

### 3. Data Accounts (PDAs)
Program Derived Addresses store program state. They're owned by programs and can be modified by their owning program.

## Rent

Accounts must maintain a minimum balance to remain on-chain:

\`\`\`
rent = base_rent + (data_size * rent_per_byte)
\`\`\`

Accounts with 2 years of rent are **rent-exempt** and won't be garbage collected.

## Key Takeaways

1. Everything is an account
2. Accounts have owners (programs)
3. Only the owner can modify account data
4. Rent exemption requires maintaining minimum balance
`,
      hints: [
        'PDAs are accounts without private keys - they can only be signed for by the program that derived them.',
        'The System Program owns all basic wallet accounts.',
      ],
      prevLessonId: 'intro-to-solana',
      nextLessonId: 'your-first-program',
    },
    {
      id: 'your-first-program',
      courseSlug: 'solana-fundamentals',
      title: 'Your First Solana Program',
      type: 'challenge',
      order: 3,
      duration: 30,
      xpReward: 150,
      content: `# Your First Solana Program

In this challenge, you'll write a simple Solana program that stores a counter and allows users to increment it.

## Objectives

1. Define the counter account structure
2. Implement the initialize instruction
3. Implement the increment instruction

## Requirements

- The counter should start at 0
- Only the authority can increment
- Each increment adds 1 to the counter

## Getting Started

Use the starter code in the Solana Playground to the right. The basic structure is provided - you need to fill in the logic.

## Tips

- Use \`anchor_lang::prelude::*\` for Anchor macros
- Remember to validate the authority signer
- Use \`checked_add\` for safe arithmetic
`,
      challenge: {
        starterCode: `use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // TODO: Initialize the counter to 0
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        // TODO: Increment the counter by 1
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Counter::INIT_SPACE
    )]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
}

#[account]
#[derive(InitSpace)]
pub struct Counter {
    pub count: u64,
    pub authority: Pubkey,
}
`,
        testCases: [
          {
            id: 'test-initialize',
            name: 'Initialize Counter',
            description: 'Counter should be initialized with count = 0',
            visible: true,
            expected: 'counter.count === 0',
          },
          {
            id: 'test-increment',
            name: 'Increment Counter',
            description: 'Counter should increment by 1',
            visible: true,
            expected: 'counter.count === 1 after increment',
          },
          {
            id: 'test-authority',
            name: 'Authority Check',
            description: 'Only authority can increment',
            visible: true,
            expected: 'Rejects unauthorized signers',
          },
        ],
        language: 'anchor',
      },
      hints: [
        'Set ctx.accounts.counter.count = 0 in initialize',
        'Store the authority pubkey: ctx.accounts.counter.authority = ctx.accounts.authority.key()',
        'In increment, verify the signer matches the stored authority',
      ],
      solution: `## Solution

Here's the complete implementation:

\`\`\`rust
pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
    let counter = &mut ctx.accounts.counter;
    counter.count = 0;
    counter.authority = ctx.accounts.authority.key();
    Ok(())
}

pub fn increment(ctx: Context<Increment>) -> Result<()> {
    let counter = &mut ctx.accounts.counter;
    require_keys_eq!(
        counter.authority,
        ctx.accounts.authority.key(),
        CounterError::Unauthorized
    );
    counter.count = counter.count.checked_add(1).unwrap();
    Ok(())
}
\`\`\`

The key points are:
1. Initialize sets count to 0 and stores the authority
2. Increment verifies the signer and uses checked arithmetic
`,
      prevLessonId: 'understanding-accounts',
      nextLessonId: 'pda-deep-dive',
    },
    {
      id: 'pda-deep-dive',
      courseSlug: 'solana-fundamentals',
      title: 'PDA Deep Dive',
      type: 'article',
      order: 4,
      duration: 25,
      xpReward: 100,
      content: `# Program Derived Addresses (PDAs)

PDAs are a core concept in Solana development. They allow programs to "own" accounts without needing a private key.

## What is a PDA?

A PDA is an address derived from:
1. A set of seeds (arbitrary bytes)
2. A program ID
3. A bump seed (to ensure the address is off-curve)

\`\`\`rust
let (pda, bump) = Pubkey::find_program_address(
    &[b"my-seed", user.key().as_ref()],
    &program_id
);
\`\`\`

## Why PDAs?

- **No private key needed** - Programs can sign for them using \`invoke_signed\`
- **Deterministic** - Same seeds always produce the same address
- **Unique per program** - Different programs get different PDAs from the same seeds

## Common Patterns

### User-specific accounts
\`\`\`rust
seeds = [b"user-profile", user.key().as_ref()]
\`\`\`

### Global singletons
\`\`\`rust
seeds = [b"config"]
\`\`\`

### Relationship accounts
\`\`\`rust
seeds = [b"enrollment", course_id.as_ref(), user.key().as_ref()]
\`\`\`

## Bump Seeds

The bump is the first value (starting from 255) that makes the address fall off the ed25519 curve:

\`\`\`rust
// Store the bump for efficiency
#[account]
pub struct MyPda {
    pub bump: u8,
    pub data: u64,
}

// Use stored bump instead of recalculating
#[account(
    seeds = [b"my-pda"],
    bump = my_pda.bump
)]
pub my_pda: Account<'info, MyPda>,
\`\`\`
`,
      hints: [
        'Always store the bump seed in the account to save compute units.',
        'PDAs can sign CPIs using invoke_signed with their seeds.',
      ],
      prevLessonId: 'your-first-program',
    },
  ],
  'anchor-development-bootcamp': [
    {
      id: 'anchor-setup',
      courseSlug: 'anchor-development-bootcamp',
      title: 'Setting Up Anchor',
      type: 'article',
      order: 1,
      duration: 20,
      xpReward: 50,
      content: `# Setting Up Anchor

Anchor is the most popular framework for building Solana programs. It provides a Rust eDSL for writing programs and a TypeScript client for testing.

## Installation

\`\`\`bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana CLI
sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"

# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor anchor-cli
\`\`\`

## Project Structure

\`\`\`
my-project/
├── Anchor.toml         # Workspace config
├── Cargo.toml          # Rust workspace
├── programs/           # Solana programs
│   └── my-program/
│       ├── Cargo.toml
│       └── src/
│           └── lib.rs
├── tests/              # Integration tests
│   └── my-program.ts
└── target/             # Build artifacts
\`\`\`

## Key Commands

\`\`\`bash
anchor init my-project    # Create new project
anchor build              # Build programs
anchor test               # Run tests
anchor deploy             # Deploy to configured cluster
\`\`\`
`,
      nextLessonId: 'anchor-accounts',
    },
    {
      id: 'anchor-accounts',
      courseSlug: 'anchor-development-bootcamp',
      title: 'Anchor Account Macros',
      type: 'challenge',
      order: 2,
      duration: 35,
      xpReward: 175,
      content: `# Anchor Account Macros

Learn to use Anchor's powerful account validation macros to secure your programs.

## The #[derive(Accounts)] Macro

This macro generates boilerplate for account validation:

\`\`\`rust
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 32)]
    pub my_account: Account<'info, MyData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
\`\`\`

## Challenge

Create an instruction that transfers SOL between two accounts with proper validation.

## Requirements

1. Validate the sender is a signer
2. Validate sufficient balance
3. Use Anchor constraints for safety
`,
      challenge: {
        starterCode: `use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod transfer {
    use super::*;

    pub fn transfer_sol(ctx: Context<TransferSol>, amount: u64) -> Result<()> {
        // TODO: Implement SOL transfer
        Ok(())
    }
}

#[derive(Accounts)]
pub struct TransferSol<'info> {
    // TODO: Define accounts with proper constraints
}
`,
        testCases: [
          {
            id: 'test-transfer',
            name: 'Transfer SOL',
            description: 'Should transfer SOL between accounts',
            visible: true,
            expected: 'Recipient balance increases by amount',
          },
          {
            id: 'test-signer',
            name: 'Signer Validation',
            description: 'Sender must be signer',
            visible: true,
            expected: 'Rejects unsigned transactions',
          },
        ],
        language: 'anchor',
      },
      hints: [
        'Use system_program::transfer for the CPI',
        'The sender needs #[account(mut)] and Signer<\'info>',
      ],
      prevLessonId: 'anchor-setup',
    },
  ],
};

/**
 * Get lesson by course and ID
 */
export function getMockLesson(
  courseSlug: string,
  lessonId: string
): LessonDetail | null {
  const courseLessons = MOCK_LESSONS[courseSlug];
  if (!courseLessons) return null;
  return courseLessons.find((l) => l.id === lessonId) ?? null;
}

/**
 * Get all lessons for a course
 */
export function getMockCourseLessons(courseSlug: string): LessonDetail[] {
  return MOCK_LESSONS[courseSlug] ?? [];
}
