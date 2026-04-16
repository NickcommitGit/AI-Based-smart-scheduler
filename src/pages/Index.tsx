import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Book, Check, X } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import RoadmapContent from '@/components/RoadmapContent';
import { generateRoadmap } from '@/utils/roadmapUtils';

const Roadmap = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const generatedRoadmap = await generateRoadmap(prompt);
      setRoadmap(generatedRoadmap);
    } catch (error) {
      toast({
        title: "Failed to generate roadmap",
        description: "There was an error generating your roadmap. Please try again.",
        variant: "destructive",
      });
      console.error("Roadmap generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAccept = () => {
    if (roadmap) {
      localStorage.setItem('currentRoadmap', roadmap);
      toast({
        title: "Roadmap Accepted",
        description: "Redirecting to test section...",
      });
      navigate('/test');
    }
  };

  const handleReject = () => {
    setRoadmap(null);
    toast({
      title: "Roadmap Rejected",
      description: "Please create a new roadmap.",
    });
  };

  return (
    <div className="min-h-screen bg-theme-dark text-white">
      <Sidebar />

      <div className="pl-20 md:pl-64 min-h-screen">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <Book className="text-theme-orange mr-2" size={24} />
            <h1 className="text-2xl font-bold">Learning Roadmap Generator</h1>
          </div>

          {!roadmap ? (
            <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-medium mb-4">Create Your Personalized Roadmap</h2>
              <p className="text-gray-400 mb-6">
                Enter a prompt like "Create a roadmap to learn Java in 20 days" or 
                "Build a path to master Operating Systems in 2 weeks"
              </p>

              <form onSubmit={handlePromptSubmit}>
                <div className="mb-4">
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Prompt
                  </label>
                  <Textarea
                    id="prompt"
                    placeholder="Create a roadmap to learn..."
                    className="w-full bg-gray-800 border-gray-700"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Roadmap'}
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-theme-darkgray border border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Your Learning Roadmap</h2>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleReject} 
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <X size={16} /> Reject
                  </Button>
                  <Button 
                    onClick={handleAccept}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} /> Accept
                  </Button>
                </div>
              </div>

              <RoadmapContent content={roadmap} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
