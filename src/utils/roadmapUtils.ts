// roadmapUtils.ts

const API_URL = 'https://api.sarvam.ai/v1/chat/completions';
const API_KEY = 'sk_gpzcmqtn_wfixLVxhgd4d9HO5D0LPFPKn';

// Generate a precise roadmap from Sarvam AI
export const generateRoadmap = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'sarvam-m',
        messages: [
          {
            role: 'system',
            content: `You are an expert roadmap planner. Format the output in a clean and professional bullet-point list for each day. Do not use Markdown symbols like *, #, **, or --- in the response. Only provide a clean 10-day day-wise structured roadmap based on the user prompt. Keep it precise.`
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    // Clean the AI response to make sure it displays well
    const cleaned = content
      .replace(/[\-*#_]/g, '') // remove unwanted markdown symbols
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 150) // include more lines if AI generates 10 full days
      .join('\n');

    return cleaned;
  } catch (error) {
    console.error('Error generating roadmap from AI:', error);
    throw error;
  }
};

// Extract topics from a roadmap
export const extractTopics = (roadmap: string): string[] => {
  const topics: string[] = [];

  const lines = roadmap.split('\n');

  for (const line of lines) {
    const dayMatch = line.match(/Day\s+\d+[:\-]\s*(.*)/i);
    if (dayMatch && dayMatch[1]) {
      topics.push(dayMatch[1].trim());
    }
  }

  return topics.slice(0, 10);
};


// Generate quiz questions (kept unchanged)
export const generateQuizQuestions = async (topic: string) => {
  console.log('Generating quiz questions for topic:', topic);
  await new Promise(resolve => setTimeout(resolve, 1000));

  const questions = [];

  if (topic.toLowerCase().includes('java') || topic.toLowerCase().includes('fundamentals')) {
    questions.push({
      question: 'Which of the following is NOT a feature of Java?',
      options: ['Platform Independence', 'Pointers', 'Object-Oriented', 'Automatic Memory Management'],
      correctAnswer: 'Pointers'
    });
    questions.push({
      question: 'What is the output of System.out.println(2 + 5 + "7");',
      options: ['257', '77', '14', 'Error'],
      correctAnswer: '77'
    });
  } else if (topic.toLowerCase().includes('variables') || topic.toLowerCase().includes('data types')) {
    questions.push({
      question: 'Which data type would you use for storing a whole number in Java?',
      options: ['float', 'String', 'boolean', 'int'],
      correctAnswer: 'int'
    });
    questions.push({
      question: 'What is the default value of an int variable in Java?',
      options: ['0', '1', 'null', 'undefined'],
      correctAnswer: '0'
    });
  } else if (topic.toLowerCase().includes('processes') || topic.toLowerCase().includes('operating system')) {
    questions.push({
      question: 'What is a process in an operating system?',
      options: ['A thread of execution', 'A program in execution', 'A memory location', 'A file system'],
      correctAnswer: 'A program in execution'
    });
    questions.push({
      question: 'What is context switching in OS?',
      options: ['Changing the UI theme', 'Switching between processes', 'Creating new files', 'Installing software'],
      correctAnswer: 'Switching between processes'
    });
  } else {
    questions.push({
      question: `What is a key concept in ${topic}?`,
      options: ['Abstraction', 'Modularity', 'Encapsulation', 'All of the above'],
      correctAnswer: 'All of the above'
    });
    questions.push({
      question: `Which of the following best describes ${topic}?`,
      options: [
        'A programming paradigm',
        'A design pattern',
        'A field of study in computer science',
        'A software development methodology'
      ],
      correctAnswer: 'A field of study in computer science'
    });
  }

  while (questions.length < 5) {
    questions.push({
      question: `Question about ${topic} (${questions.length + 1})`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A'
    });
  }

  return questions;
};
