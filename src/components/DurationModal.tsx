
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type DurationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (days: number) => void;
};

const DurationModal = ({ isOpen, onClose, onSubmit }: DurationModalProps) => {
  const [selectedOption, setSelectedOption] = useState<'10' | '20' | '30' | 'custom'>('10');
  const [customDays, setCustomDays] = useState('');
  
  const handleSubmit = () => {
    let days = parseInt(selectedOption);
    if (selectedOption === 'custom') {
      days = parseInt(customDays) || 30;
    }
    onSubmit(days);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-theme-darkgray text-white border-theme-lightgray sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">What is your learning goal?</DialogTitle>
          <p className="text-center text-gray-400">
            Your dedication helps us personalize your learning plan, allocating time effectively to each topic
          </p>
        </DialogHeader>
        
        <RadioGroup value={selectedOption} onValueChange={(value) => setSelectedOption(value as any)}>
          <div className="space-y-4 mt-4">
            <div className="flex items-center space-x-2 border border-gray-700 rounded-lg p-4">
              <RadioGroupItem value="10" id="option-10" className="border-gray-500" />
              <Label htmlFor="option-10" className="flex-1">
                <div className="font-medium">10 days</div>
                <div className="text-sm text-gray-400">Quick preparation for immediate needs</div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border border-gray-700 rounded-lg p-4">
              <RadioGroupItem value="20" id="option-20" className="border-gray-500" />
              <Label htmlFor="option-20" className="flex-1">
                <div className="font-medium">20 days</div>
                <div className="text-sm text-gray-400">Balanced pace for deep understanding</div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border border-gray-700 rounded-lg p-4">
              <RadioGroupItem value="30" id="option-30" className="border-gray-500" />
              <Label htmlFor="option-30" className="flex-1">
                <div className="font-medium">30 days</div>
                <div className="text-sm text-gray-400">Strategic and steady learning path</div>
              </Label>
            </div>
            
            <div className="border border-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="custom" id="option-custom" className="border-gray-500" />
                <Label htmlFor="option-custom" className="flex-1">
                  <div className="font-medium">Enter custom number of days</div>
                  <div className="text-sm text-gray-400">Design your personalized learning adventure!</div>
                </Label>
              </div>
              {selectedOption === 'custom' && (
                <Input 
                  type="number" 
                  value={customDays} 
                  onChange={(e) => setCustomDays(e.target.value)}
                  placeholder="Enter number of days (10-365)" 
                  className="bg-theme-lightgray border-gray-700 focus:border-theme-orange text-white"
                />
              )}
            </div>
          </div>
        </RadioGroup>
        
        <DialogFooter className="mt-6">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="bg-transparent border-gray-600 hover:bg-gray-700 text-white w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-theme-orange hover:bg-orange-600 text-white w-full sm:w-auto"
          >
            Begin your journey!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DurationModal;
