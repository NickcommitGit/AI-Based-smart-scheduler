
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import StreakCounter from '@/components/StreakCounter';
import ProgressStats from '@/components/ProgressStats';
import { osQuestions } from '@/utils/osQuestions';
import { getProgress, calculateStats } from '@/utils/progressUtils';

const Profile = () => {
  const [progress, setProgress] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    const savedProgress = getProgress();
    if (savedProgress) {
      setProgress(savedProgress);
    }
  }, []);
  
  if (!progress) {
    return (
      <div className="min-h-screen bg-theme-dark text-white">
        <Sidebar />
        <div className="pl-20 md:pl-64 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No active learning plan</h1>
            <p className="text-gray-400">Start your Operating Systems learning journey from the home page.</p>
          </div>
        </div>
      </div>
    );
  }
  
  const stats = calculateStats(progress.completedQuestions, osQuestions);
  const totalCompleted = stats.completedBasic + stats.completedIntermediate + stats.completedAdvanced;
  const totalQuestions = stats.totalBasic + stats.totalIntermediate + stats.totalAdvanced;
  const startDate = new Date(progress.startDate);
  const formattedStartDate = startDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  
  return (
    <div className="min-h-screen bg-theme-dark text-white">
      <Sidebar />
      
      <div className="pl-20 md:pl-64 min-h-screen">
        <div className="p-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">User Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-5 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-theme-orange/20 border-2 border-theme-orange flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-theme-orange">
                      {(progress.currentStreak / progress.prepDays * 100).toFixed(0)}%
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-theme-orange">User</h2>
                  <button 
                    className="text-gray-400 bg-theme-darkgray px-2 py-1 rounded-md relative cursor-pointer glitter-effect"
                    onClick={() => setShowPopup(true)}
                  >
                    Novice
                  </button>

                  {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-theme-darkgray text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4">Upgrade Your Title</h3>
                        <p className="text-gray-400 mb-4">Solve more questions to upgrade your title!</p>
                        <button 
                          className="bg-theme-orange text-white px-4 py-2 rounded-md"
                          onClick={() => setShowPopup(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}

                  <style >{`
                    .glitter-effect {
                      position: relative;
                      overflow: hidden;
                    }
                    .glitter-effect::before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: -100%;
                      width: 200%;
                      height: 100%;
                      background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.6), transparent);
                      transform: skewX(-45deg);
                      transition: left 0.5s ease-in-out;
                    }
                    .glitter-effect:active::before {
                      left: 100%;
                    }
                  `}</style>
                  
                  <div className="w-full mt-6">
                    <StreakCounter 
                      currentStreak={progress.currentStreak} 
                      totalDays={progress.prepDays} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-5">
                <h3 className="font-medium text-white mb-3">Learning Plan Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Start Date:</span>
                    <span className="text-white">{formattedStartDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Days:</span>
                    <span className="text-white">{progress.prepDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Streak:</span>
                    <span className="text-white">{progress.currentStreak} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Questions Completed:</span>
                    <span className="text-white">{totalCompleted} of {totalQuestions}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="mb-6">
                <ProgressStats
                  completedBasic={stats.completedBasic}
                  totalBasic={stats.totalBasic}
                  completedIntermediate={stats.completedIntermediate}
                  totalIntermediate={stats.totalIntermediate}
                  completedAdvanced={stats.completedAdvanced}
                  totalAdvanced={stats.totalAdvanced}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-5">
                  <h3 className="font-medium text-white mb-4">Recent Activity</h3>
                  
                  <div className="space-y-4">
                    {progress.currentStreak > 0 && (
                      <div className="border-l-2 border-theme-orange pl-3 py-1">
                        <p className="text-sm text-white">Started OS Learning Journey</p>
                        <p className="text-xs text-gray-400">{formattedStartDate}</p>
                      </div>
                    )}
                    
                    {stats.completedBasic > 0 && (
                      <div className="border-l-2 border-green-500 pl-3 py-1">
                        <p className="text-sm text-white">Completed {stats.completedBasic} Basic Questions</p>
                        <p className="text-xs text-gray-400">Day {Math.min(progress.currentStreak, 1)}</p>
                      </div>
                    )}
                    
                    {stats.completedIntermediate > 0 && (
                      <div className="border-l-2 border-yellow-500 pl-3 py-1">
                        <p className="text-sm text-white">Completed {stats.completedIntermediate} Intermediate Questions</p>
                        <p className="text-xs text-gray-400">Day {Math.min(progress.currentStreak, 2)}</p>
                      </div>
                    )}
                    
                    {stats.completedAdvanced > 0 && (
                      <div className="border-l-2 border-red-500 pl-3 py-1">
                        <p className="text-sm text-white">Completed {stats.completedAdvanced} Advanced Questions</p>
                        <p className="text-xs text-gray-400">Day {Math.min(progress.currentStreak, 3)}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-5">
                  <h3 className="font-medium text-white mb-4">Achievement Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${progress.currentStreak > 0 ? 'bg-theme-orange text-white' : 'bg-gray-700 text-gray-500'} flex items-center justify-center`}>
                        1
                      </div>
                      <div>
                        <p className={`text-sm ${progress.currentStreak > 0 ? 'text-white' : 'text-gray-500'}`}>First Day Streak</p>
                        <p className="text-xs text-gray-400">Complete your first day of learning</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${stats.completedBasic === stats.totalBasic ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-500'} flex items-center justify-center`}>
                        2
                      </div>
                      <div>
                        <p className={`text-sm ${stats.completedBasic === stats.totalBasic ? 'text-white' : 'text-gray-500'}`}>Basic Mastery</p>
                        <p className="text-xs text-gray-400">Complete all basic questions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${stats.completedIntermediate === stats.totalIntermediate ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-500'} flex items-center justify-center`}>
                        3
                      </div>
                      <div>
                        <p className={`text-sm ${stats.completedIntermediate === stats.totalIntermediate ? 'text-white' : 'text-gray-500'}`}>Intermediate Mastery</p>
                        <p className="text-xs text-gray-400">Complete all intermediate questions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${stats.completedAdvanced === stats.totalAdvanced ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-500'} flex items-center justify-center`}>
                        4
                      </div>
                      <div>
                        <p className={`text-sm ${stats.completedAdvanced === stats.totalAdvanced ? 'text-white' : 'text-gray-500'}`}>Advanced Mastery</p>
                        <p className="text-xs text-gray-400">Complete all advanced questions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
