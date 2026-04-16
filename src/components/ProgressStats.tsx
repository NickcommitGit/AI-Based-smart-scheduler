
type ProgressStatsProps = {
  completedBasic: number;
  totalBasic: number;
  completedIntermediate: number;
  totalIntermediate: number;
  completedAdvanced: number;
  totalAdvanced: number;
};

const ProgressStats = ({
  completedBasic,
  totalBasic,
  completedIntermediate,
  totalIntermediate,
  completedAdvanced,
  totalAdvanced
}: ProgressStatsProps) => {
  const totalCompleted = completedBasic + completedIntermediate + completedAdvanced;
  const totalQuestions = totalBasic + totalIntermediate + totalAdvanced;
  const overallPercentage = totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0;
  
  return (
    <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-5">
      <h3 className="font-medium text-white mb-4">Overall Progress</h3>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">Total progress</span>
          <span className="text-white">{overallPercentage}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${overallPercentage}%` }} />
        </div>
      </div>
      
      <div className="mt-6 space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-green-400">Basic</span>
            <span className="text-white">{completedBasic}/{totalBasic}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="h-full bg-green-500" 
              style={{ width: `${(completedBasic / totalBasic) * 100}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-yellow-400">Intermediate</span>
            <span className="text-white">{completedIntermediate}/{totalIntermediate}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="h-full bg-yellow-500" 
              style={{ width: `${(completedIntermediate / totalIntermediate) * 100}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-red-400">Advanced</span>
            <span className="text-white">{completedAdvanced}/{totalAdvanced}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="h-full bg-red-500" 
              style={{ width: `${(completedAdvanced / totalAdvanced) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="text-center">
          <div className="text-xl font-bold text-white">{completedBasic}</div>
          <div className="text-xs text-gray-400">Basic</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-white">{completedIntermediate}</div>
          <div className="text-xs text-gray-400">Intermediate</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-white">{completedAdvanced}</div>
          <div className="text-xs text-gray-400">Advanced</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;
