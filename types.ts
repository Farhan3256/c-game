import React from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Step {
  id: number;
  title: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum GameMode {
  LEARN = 'LEARN',
  BUILD = 'BUILD',
  COMPETE = 'COMPETE'
}