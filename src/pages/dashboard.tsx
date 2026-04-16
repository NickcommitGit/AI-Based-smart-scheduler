
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import DurationModal from '@/components/DurationModal';
import StreakCounter from '@/components/StreakCounter';
import TopicCard from '@/components/TopicCard';
import QuestionsList from '@/components/QuestionsList';
import { osQuestions } from '@/utils/osQuestions';
import { 
  getProgress, 
  initializeProgress, 
  completeQuestion, 
  completeSection, 
  getAvailableSections,
  calculateStats
} from '@/utils/progressUtils';
import ProgressStats from '@/components/ProgressStats';

const Index = () => {
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [progress, setProgress] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<'basic' | 'intermediate' | 'advanced'>('basic');
  const [availableSections, setAvailableSections] = useState({ 
    basic: true, 
    intermediate: false, 
    advanced: false 
  });
  
  // Check if user has progress
  useEffect(() => {
    const savedProgress = getProgress();
    if (savedProgress) {
      setProgress(savedProgress);
      setAvailableSections(getAvailableSections());
    } else {
      setShowDurationModal(true);
    }
  }, []);
  
  const handleDurationSubmit = (days: number) => {
    const newProgress = initializeProgress(days);
    setProgress(newProgress);
  };
  
  const handleQuestionComplete = (questionId: number) => {
    completeQuestion(questionId);
    
    // Check if section is complete
    const sectionQuestions = osQuestions.filter(q => q.difficulty === activeSection);
    const updatedProgress = getProgress();
    if (!updatedProgress) return;
    
    const completedInSection = sectionQuestions.filter(q => 
      updatedProgress.completedQuestions.includes(q.id)
    ).length;
    
    if (completedInSection === sectionQuestions.length) {
      // All questions in this section completed
      const updated = completeSection(activeSection);
      if (updated) {
        setProgress(updated);
        setAvailableSections(getAvailableSections());
      }
    } else {
      setProgress(updatedProgress);
    }
  };
  
  const stats = progress ? calculateStats(progress.completedQuestions, osQuestions) : {
    completedBasic: 0,
    totalBasic: 0,
    completedIntermediate: 0,
    totalIntermediate: 0,
    completedAdvanced: 0,
    totalAdvanced: 0,
  };
  
  return (
    <div className="min-h-screen bg-theme-dark text-white">
      <Sidebar />
      
      <div className="pl-20 md:pl-64 min-h-screen">
        {progress && (
          <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-bold">Operating Systems Mastery</h1>
                  <div>
                    <span className="text-sm text-gray-400">Day {progress.currentStreak} of {progress.prepDays}</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-4">Select a Section</h2>
                  
                  <TopicCard
                    title="Basic Concepts"
                    progress={`${stats.completedBasic}/${stats.totalBasic}`}
                    totalQuestions={stats.totalBasic}
                    completedQuestions={stats.completedBasic}
                    dateRange="Day 1"
                    isActive={activeSection === 'basic'}
                    onClick={() => setActiveSection('basic')}
                  />
                  
                  <TopicCard
                    title="Intermediate Concepts"
                    progress={`${stats.completedIntermediate}/${stats.totalIntermediate}`}
                    totalQuestions={stats.totalIntermediate}
                    completedQuestions={stats.completedIntermediate}
                    dateRange="Day 2"
                    isActive={activeSection === 'intermediate'}
                    onClick={() => {
                      if (availableSections.intermediate) {
                        setActiveSection('intermediate');
                      } else {
                        alert("Complete Basic Concepts first or wait until tomorrow!");
                      }
                    }}
                  />
                  
                  <TopicCard
                    title="Advanced Concepts"
                    progress={`${stats.completedAdvanced}/${stats.totalAdvanced}`}
                    totalQuestions={stats.totalAdvanced}
                    completedQuestions={stats.completedAdvanced}
                    dateRange="Day 3"
                    isActive={activeSection === 'advanced'}
                    onClick={() => {
                      if (availableSections.advanced) {
                        setActiveSection('advanced');
                      } else {
                        alert("Complete Intermediate Concepts first or wait until tomorrow!");
                      }
                    }}
                  />
                </div>
                
                <QuestionsList
                  questions={osQuestions}
                  level={activeSection}
                  onQuestionComplete={handleQuestionComplete}
                />
              </div>
              
              <div className="md:w-80">
                <StreakCounter 
                  currentStreak={progress.currentStreak} 
                  totalDays={progress.prepDays} 
                />
                
                <div className="mt-6">
                  <ProgressStats
                    completedBasic={stats.completedBasic}
                    totalBasic={stats.totalBasic}
                    completedIntermediate={stats.completedIntermediate}
                    totalIntermediate={stats.totalIntermediate}
                    completedAdvanced={stats.completedAdvanced}
                    totalAdvanced={stats.totalAdvanced}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <DurationModal
        isOpen={showDurationModal}
        onClose={() => {
          if (progress) {
            setShowDurationModal(false);
          }
        }}
        onSubmit={handleDurationSubmit}
      />
    </div>
  );
};

export default Index;
