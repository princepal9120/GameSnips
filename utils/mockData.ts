import { Snippet } from '@/types/snippet';
import { PREDEFINED_IMAGES } from '@/constants/images';

export const MOCK_SNIPPETS: Snippet[] = [
  {
    id: '1',
    title: 'Epic Minecraft Castle Build',
    description: 'Just finished building this massive castle in Minecraft after 3 weeks of work. Check out those towers!',
    creatorName: 'BlockMaster',
    imageUrl: PREDEFINED_IMAGES[0].url,
    likes: 42,
    timestamp: Date.now() - 3600000 * 2, // 2 hours ago
  },
  {
    id: '2',
    title: 'New High Score in Racing Simulator',
    description: 'Beat my personal best on the Nürburgring track! The new handling model in this game is incredible.',
    creatorName: 'SpeedDemon',
    imageUrl: PREDEFINED_IMAGES[2].url,
    likes: 15,
    timestamp: Date.now() - 3600000 * 5, // 5 hours ago
  },
  {
    id: '3',
    title: 'VR Horror Game Experience',
    description: 'Tried this new VR horror game and nearly had a heart attack! The immersion is absolutely terrifying.',
    creatorName: 'VRExplorer',
    imageUrl: PREDEFINED_IMAGES[4].url,
    likes: 28,
    timestamp: Date.now() - 3600000 * 24, // 1 day ago
  },
  {
    id: '4',
    title: 'Retro Gaming Night',
    description: 'Dusted off the old SNES for a nostalgic gaming session. Still can\'t beat Donkey Kong Country!',
    creatorName: 'RetroFan',
    imageUrl: PREDEFINED_IMAGES[5].url,
    likes: 36,
    timestamp: Date.now() - 3600000 * 48, // 2 days ago
  },
  {
    id: '5',
    title: 'Finally Upgraded My Gaming Setup',
    description: 'After saving for months, I finally got my dream setup with RGB lighting and ultrawide monitor!',
    creatorName: 'TechEnthusiast',
    imageUrl: PREDEFINED_IMAGES[7].url,
    likes: 51,
    timestamp: Date.now() - 3600000 * 72, // 3 days ago
  },
];