
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateQuizQuestions } from '@/utils/roadmapUtils';

interface TopicQuizProps {
  topic: string;
  onBack: () => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const TopicQuiz = ({ topic, onBack }: TopicQuizProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        const generatedQuestions = await generateQuizQuestions(topic);
        setQuestions(generatedQuestions);
      } catch (error) {
        console.error("Error loading questions:", error);
        toast({
          title: "Failed to load questions",
          description: "There was an error loading the quiz questions",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [topic, toast]);

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setIsAnswerSubmitted(true);
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setShowResults(false);
  };

  if (isLoading) {
    return (
      <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-6 text-center">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-32 bg-gray-700 rounded mb-4"></div>
          <div className="h-10 bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="text-gray-400 mt-4">Generating quiz questions...</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Quiz Results: {topic}</h2>
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Topic
          </Button>
        </div>
        
        <div className="text-center py-8">
          <div className="text-4xl font-bold mb-2">
            {score} / {questions.length}
          </div>
          <p className="text-gray-300 mb-6">
            {score === questions.length 
              ? "Perfect score! You've mastered this topic!" 
              : score > questions.length / 2 
                ? "Good job! You're on the right track."
                : "Keep studying! You'll improve with practice."}
          </p>
          <Button onClick={handleRestartQuiz}>Try Again</Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
      <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">No Questions Available</h2>
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Topic
          </Button>
        </div>
        <p className="text-gray-300">
          No questions are available for this topic. Please try another topic.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Quiz: {topic}</h2>
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Topic
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-1">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="progress-bar mb-4">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
        
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <div 
              key={index}
              className={`
                p-3 border rounded-md cursor-pointer transition-colors
                ${selectedAnswer === option 
                  ? isAnswerSubmitted 
                    ? option === currentQuestion.correctAnswer
                      ? 'bg-green-800 border-green-600' 
                      : 'bg-red-800 border-red-600'
                    : 'bg-theme-orange border-theme-orange text-white'
                  : 'border-gray-600 hover:border-gray-400'
                }
                ${isAnswerSubmitted && option === currentQuestion.correctAnswer ? 'bg-green-800 border-green-600' : ''}
              `}
              onClick={() => handleAnswerSelect(option)}
            >
              <div className="flex justify-between items-center">
                <span>{option}</span>
                {isAnswerSubmitted && option === selectedAnswer && (
                  option === currentQuestion.correctAnswer ? (
                    <Check className="text-green-400" size={20} />
                  ) : (
                    <X className="text-red-400" size={20} />
                  )
                )}
                {isAnswerSubmitted && option === currentQuestion.correctAnswer && option !== selectedAnswer && (
                  <Check className="text-green-400" size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {isAnswerSubmitted ? (
        <Button onClick={handleNextQuestion}>
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
        </Button>
      ) : (
        <Button 
          onClick={handleSubmitAnswer}
          disabled={selectedAnswer === null}
        >
          Submit Answer
        </Button>
      )}
    </div>
  );
};

export default TopicQuiz;
