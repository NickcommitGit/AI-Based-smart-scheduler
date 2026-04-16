
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, FileText, BookOpen } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import RoadmapContent from '@/components/RoadmapContent';
import TopicQuiz from '@/components/TopicQuiz';
import { extractTopics } from '@/utils/roadmapUtils';

const Test = () => {
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedRoadmap = localStorage.getItem('currentRoadmap');
    if (!savedRoadmap) {
      toast({
        title: "No roadmap found",
        description: "Please create a roadmap first",
        variant: "destructive",
      });
      navigate('/roadmap');
      return;
    }
    
    setRoadmap(savedRoadmap);
    const extractedTopics = extractTopics(savedRoadmap);
    setTopics(extractedTopics);
    
    if (extractedTopics.length > 0) {
      setCurrentTopic(extractedTopics[0]);
    }
  }, [navigate, toast]);

  const handleTopicSelect = (topic: string) => {
    setCurrentTopic(topic);
    setShowQuiz(false);
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleBackToRoadmap = () => {
    navigate('/roadmap');
  };

  return (
    <div className="min-h-screen bg-theme-dark text-white">
      <Sidebar />
      
      <div className="pl-20 md:pl-64 min-h-screen">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <FileText className="text-theme-orange mr-2" size={24} />
              <h1 className="text-2xl font-bold">Learning & Testing</h1>
            </div>
            <Button variant="outline" onClick={handleBackToRoadmap} className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Roadmap
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="text-theme-orange" size={18} />
                  <h3 className="font-medium">Topics</h3>
                </div>
                
                <div className="space-y-2">
                  {topics.map((topic, index) => (
                    <div 
                      key={index}
                      className={`p-2 rounded-md cursor-pointer ${
                        currentTopic === topic 
                          ? 'bg-theme-orange text-white' 
                          : 'hover:bg-gray-700 text-gray-300'
                      }`}
                      onClick={() => handleTopicSelect(topic)}
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              {showQuiz ? (
                <TopicQuiz 
                  topic={currentTopic || ''} 
                  onBack={() => setShowQuiz(false)}
                />
              ) : (
                <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">{currentTopic}</h2>
                    <Button onClick={handleStartQuiz}>Test Your Knowledge</Button>
                  </div>
                  
                  {currentTopic && (
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 mb-4">
                        Study the key concepts below, then test your understanding with a quiz.
                      </p>
                      
                      {roadmap && <RoadmapContent content={roadmap} />}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
