
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'basic' | 'intermediate' | 'advanced';
};

type QuestionsListProps = {
  questions: Question[];
  level: 'basic' | 'intermediate' | 'advanced';
  onQuestionComplete: (questionId: number) => void;
};

const QuestionsList = ({ questions, level, onQuestionComplete }: QuestionsListProps) => {
  const filteredQuestions = questions.filter(q => q.difficulty === level);
  const [currentAnswers, setCurrentAnswers] = useState<Record<number, number | null>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<number[]>([]);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuestion = (questionId: number) => {
    onQuestionComplete(questionId);
    setSubmittedQuestions(prev => [...prev, questionId]);
  };

  if (filteredQuestions.length === 0) {
    return <div className="text-center py-10 text-gray-400">No questions available for this level yet.</div>;
  }

  return (
    <div className="space-y-8 mt-6">
      {filteredQuestions.map((question, index) => {
        const isSubmitted = submittedQuestions.includes(question.id);
        const selectedAnswer = currentAnswers[question.id];
        const isCorrect = selectedAnswer === question.correctAnswer;
        
        return (
          <div key={question.id} className="bg-theme-darkgray rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Question {index + 1}</h3>
              {isSubmitted && (
                <span className={`text-sm px-3 py-1 rounded-full ${isCorrect ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              )}
            </div>
            
            <p className="text-white mb-6">{question.question}</p>
            
            <div className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <div 
                  key={optionIndex}
                  className={`flex items-center p-3 rounded-md border cursor-pointer ${
                    selectedAnswer === optionIndex 
                      ? 'border-theme-orange bg-theme-orange/10' 
                      : 'border-gray-700 hover:border-gray-500'
                  } ${
                    isSubmitted && optionIndex === question.correctAnswer
                      ? 'border-green-500 bg-green-500/10'
                      : ''
                  } ${
                    isSubmitted && selectedAnswer === optionIndex && selectedAnswer !== question.correctAnswer
                      ? 'border-red-500 bg-red-500/10'
                      : ''
                  }`}
                  onClick={() => !isSubmitted && handleSelectOption(question.id, optionIndex)}
                >
                  <div className="flex-1">
                    <p className="text-white">{option}</p>
                  </div>
                  {selectedAnswer === optionIndex && !isSubmitted && (
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-theme-orange">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                  {isSubmitted && optionIndex === question.correctAnswer && (
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {!isSubmitted && (
              <Button
                className="mt-6 bg-theme-orange hover:bg-orange-600"
                disabled={selectedAnswer === null || selectedAnswer === undefined}
                onClick={() => handleSubmitQuestion(question.id)}
              >
                Submit Answer
              </Button>
            )}
            
            {isSubmitted && (
              <div className="mt-6 p-4 border border-gray-700 rounded-lg bg-theme-darkgray/50">
                <h4 className="font-medium text-white mb-2">Explanation</h4>
                <p className="text-gray-300">
                  The correct answer is option {question.correctAnswer + 1}. 
                  {isCorrect 
                    ? " Great job understanding this concept!" 
                    : " Review this topic for better understanding."}
                </p>
              </div>
            )}
          </div>
        );
      })}
      
      {submittedQuestions.length === filteredQuestions.length && (
        <div className="bg-green-900/20 border border-green-600 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            🎉 Section Complete!
          </h3>
          <p className="text-gray-300 mb-4">
            You've completed all questions in this section. The next section will unlock tomorrow!
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionsList;
