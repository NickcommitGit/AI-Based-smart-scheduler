
import { cn } from '@/lib/utils';

type TopicCardProps = {
  title: string;
  progress: string;
  totalQuestions: number;
  completedQuestions: number;
  dateRange: string;
  isActive: boolean;
  onClick: () => void;
};

const TopicCard = ({
  title,
  progress,
  totalQuestions,
  completedQuestions,
  dateRange,
  isActive,
  onClick
}: TopicCardProps) => {
  return (
    <div 
      className={cn(
        "border border-gray-700 rounded-md p-4 mb-4 cursor-pointer transition-all",
        isActive ? "bg-theme-darkgray" : "bg-transparent hover:bg-theme-darkgray/50"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">{title} ({progress})</h3>
        <span className="text-sm text-gray-400">{dateRange}</span>
      </div>
      
      <div className="mt-4">
        <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${(completedQuestions / totalQuestions) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>{completedQuestions} completed</span>
          <span>{totalQuestions - completedQuestions} remaining</span>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
