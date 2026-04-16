import React from 'react';
import { DayPlan } from '../utils/parseRoadmap';

interface Props {
  roadmap: DayPlan[];
}

const RoadmapCards: React.FC<Props> = ({ roadmap }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {roadmap.map(({ day, objective, topics }, index) => (
        <div key={index} className="bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="text-xl font-bold text-gray-800">{day}</h2>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold">Objective:</span> {objective}
          </p>
          <ul className="list-disc list-inside mt-3 text-gray-700">
            {topics.map((topic, i) => (
              <li key={i}>{topic}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RoadmapCards;
