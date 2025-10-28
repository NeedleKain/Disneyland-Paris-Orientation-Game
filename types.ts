// FIX: Add React import to provide the JSX namespace.
import React from 'react';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Riddle {
  id: string;
  question: string;
  answer: string;
  hint: string;
  location: Coordinates;
  locationName: string;
  image: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  // FIX: Changed type from React.ReactNode to the more specific JSX.Element
  // FIX: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  icon: React.ReactElement;
  narrator: string;
  prologue: string;
  epilogue: string;
  riddles: Riddle[];
}

export interface Theme {
  primary: string;
  accent: string;
  text: string;
  containerBg: string;
  backgroundGradient: string;
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