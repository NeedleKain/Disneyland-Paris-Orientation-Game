import type { ReactNode } from 'react';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Riddle {
  id: number;
  question: string;
  answer: string;
  location: Coordinates;
  locationName: string;
  hint: string;
  image: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  riddles: Riddle[];
}

export interface Theme {
  primary: string;
  accent: string;
  text: string;
  backgroundGradient: string;
  containerBg: string;
  buttonText: string;
}

export interface Land {
  id: string;
  name: string;
  description: string;
  theme: Theme;
  quests: Quest[];
}

export interface Park {
  id: string;
  name: string;
  description: string;
  lands: Land[];
  grandQuest?: Quest;
}