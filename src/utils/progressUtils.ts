
// This is a simplified version. In a real application, this would interact with a database
import { toast } from "@/components/ui/use-toast";

export interface UserProgress {
  prepDays: number;
  currentStreak: number;
  startDate: string;
  completedQuestions: number[];
  completedSections: {
    basic: boolean;
    intermediate: boolean;
    advanced: boolean;
  };
  lastCompletedDay: number;  // 0-indexed day number since start
}

const STORAGE_KEY = 'os_mastery_progress';

export const getProgress = (): UserProgress | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const initializeProgress = (days: number): UserProgress => {
  const newProgress: UserProgress = {
    prepDays: days,
    currentStreak: 0,
    startDate: new Date().toISOString(),
    completedQuestions: [],
    completedSections: {
      basic: false,
      intermediate: false,
      advanced: false,
    },
    lastCompletedDay: -1, // No days completed yet
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  return newProgress;
};

export const completeQuestion = (questionId: number) => {
  const progress = getProgress();
  if (!progress) return;
  
  // If question already completed, don't add it again
  if (!progress.completedQuestions.includes(questionId)) {
    progress.completedQuestions.push(questionId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
};

export const completeSection = (section: 'basic' | 'intermediate' | 'advanced') => {
  const progress = getProgress();
  if (!progress) return;
  
  // Calculate current day (0-indexed) since start
  const startDate = new Date(progress.startDate);
  const today = new Date();
  const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Check if this is a new day completion
  if (daysSinceStart > progress.lastCompletedDay) {
    progress.currentStreak++;
    progress.lastCompletedDay = daysSinceStart;
    
    toast({
      title: "Streak Updated!",
      description: `You're now on a ${progress.currentStreak}-day streak! Keep going!`,
    });
  }
  
  // Mark the section as completed
  progress.completedSections[section] = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  
  return progress;
};

// Check which sections are available based on progress
export const getAvailableSections = (): { basic: boolean; intermediate: boolean; advanced: boolean } => {
  const progress = getProgress();
  if (!progress) {
    return { basic: true, intermediate: false, advanced: false };
  }
  
  const startDate = new Date(progress.startDate);
  const today = new Date();
  const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    basic: true, // Always available
    intermediate: daysSinceStart >= 1 || progress.completedSections.basic,
    advanced: daysSinceStart >= 2 || progress.completedSections.intermediate,
  };
};

export const calculateStats = (completedQuestionIds: number[], questions: any[]) => {
  const basic = questions.filter(q => q.difficulty === 'basic');
  const intermediate = questions.filter(q => q.difficulty === 'intermediate');
  const advanced = questions.filter(q => q.difficulty === 'advanced');
  
  const completedBasic = completedQuestionIds.filter(id => 
    basic.some(q => q.id === id)
  ).length;
  
  const completedIntermediate = completedQuestionIds.filter(id => 
    intermediate.some(q => q.id === id)
  ).length;
  
  const completedAdvanced = completedQuestionIds.filter(id => 
    advanced.some(q => q.id === id)
  ).length;
  
  return {
    completedBasic,
    totalBasic: basic.length,
    completedIntermediate,
    totalIntermediate: intermediate.length,
    completedAdvanced,
    totalAdvanced: advanced.length,
  };
};
