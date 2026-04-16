
import { Calendar } from 'lucide-react';

type StreakCounterProps = {
  currentStreak: number;
  totalDays: number;
};

const StreakCounter = ({ currentStreak, totalDays }: StreakCounterProps) => {
  const percentage = (currentStreak / totalDays) * 100;
  
  return (
    <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="text-theme-orange" size={18} />
        <h3 className="font-medium text-white">Current Streak</h3>
      </div>
      
      <div className="flex items-end gap-1">
        <span className="text-3xl font-bold text-white">{currentStreak}</span>
        <span className="text-gray-400 mb-1">/ {totalDays} days</span>
      </div>
      
      <div className="mt-3">
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
        </div>
      </div>
      
      <div className="mt-2 text-sm text-gray-400">
        {percentage < 30 && "Just getting started! Keep it up!"}
        {percentage >= 30 && percentage < 70 && "Great progress! Stick to your schedule."}
        {percentage >= 70 && "Almost there! Finish strong!"}
      </div>
    </div>
  );
};

export default StreakCounter;
