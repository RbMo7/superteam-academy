// Course content types (matches Arweave manifest structure)

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Track = 'core' | 'defi' | 'nft' | 'gaming' | 'dao';

export interface CourseContent {
  title: string;
  description: string;
  thumbnailUrl: string;
  difficulty: Difficulty;
  track: Track;
  lessons: LessonContent[];
  metadata: CourseMetadata;
}

export interface LessonContent {
  id: string;
  title: string;
  type: 'video' | 'article' | 'challenge';
  contentUrl: string;
  duration?: number; // minutes
  challengeConfig?: ChallengeConfig;
}

export interface ChallengeConfig {
  template: string;
  testFile: string;
  starterCode: string;
}

export interface CourseMetadata {
  author: string;
  version: string;
  updatedAt: string;
  tags: string[];
}
