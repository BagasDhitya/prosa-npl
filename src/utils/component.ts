import React from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface SidebarProps {
  children: React.ReactNode;
}

export interface ModalProps {
  onClose?: () => void;
  children: React.ReactNode;
}

export interface CardProps {
  id: string;
  title: string;
  status: string;
  description?: string;
  isLoading: boolean;
  onPlay: () => void;
  onStop: () => void;
}

export interface AudioProps {
  id: string;
  timer: string | number;
  save: boolean;
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  onSave: () => void;
}
