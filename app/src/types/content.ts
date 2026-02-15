// Course content types (matches Arweave manifest structure)

export interface CourseContent {
  title: string;
  description: string;
  thumbnailUrl: string;
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
