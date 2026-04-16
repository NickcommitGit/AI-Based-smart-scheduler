import React from 'react';

interface RoadmapContentProps {
  content: string;
}

const RoadmapContent: React.FC<RoadmapContentProps> = ({ content }) => {
  const formatContent = (text: string) => {
    const lines = text.split('\n');

    return (
      <>
        {lines.map((line, index) => {
          if (line.startsWith('# ')) {
            return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(2)}</h2>;
          }
          if (line.startsWith('## ')) {
            return <h3 key={index} className="text-lg font-bold mt-3 mb-2">{line.substring(3)}</h3>;
          }
          if (line.startsWith('### ')) {
            return <h4 key={index} className="text-md font-bold mt-2 mb-1">{line.substring(4)}</h4>;
          }
          if (line.startsWith('- ')) {
            return (
              <div key={index} className="flex items-start mb-2">
                <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-theme-orange"></div>
                <p>{line.substring(2)}</p>
              </div>
            );
          }
          if (line.match(/^Day \d+:/) || line.match(/^Week \d+:/)) {
            return <h3 key={index} className="text-theme-orange text-lg font-bold mt-4 mb-2">{line}</h3>;
          }
          if (line.trim() === '') {
            return <div key={index} className="h-2"></div>;
          }
          return <p key={index} className="mb-2">{line}</p>;
        })}
      </>
    );
  };

  return (
    <div className="roadmap-content text-gray-200">
      {formatContent(content)}
    </div>
  );
};

export default RoadmapContent;
