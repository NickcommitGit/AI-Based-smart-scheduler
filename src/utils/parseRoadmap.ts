export interface DayPlan {
  day: string;
  objective: string;
  topics: string[];
}

export const parseRoadmap = (raw: string): DayPlan[] => {
  const dayBlocks = raw
    .split(/\n(?=Day \d+:)/)
    .map(block => block.trim())
    .filter(Boolean);

  const roadmap: DayPlan[] = dayBlocks.map(block => {
    const dayMatch = block.match(/^Day \d+:/);
    const day = dayMatch ? dayMatch[0].replace(':', '') : 'Day';

    const objectiveMatch = block.match(/Objective:\s*(.*)/i);
    const objective = objectiveMatch ? objectiveMatch[1].trim() : '';

    const topicsMatch = block.match(/Topics:\s*(.*)/i);
    const topics = topicsMatch ? topicsMatch[1].split(',').map(t => t.trim()) : [];

    return { day, objective, topics };
  });

  return roadmap;
};
