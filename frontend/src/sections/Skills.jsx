import React, { useState } from 'react';
import { skills } from '../utils/mock';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive technical skillset spanning mobile development, AI/ML, and full-stack engineering
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], index) => (
            <Card
              key={category}
              className={`bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
                activeCategory === category
                  ? 'border-cyan-500 shadow-cyan-500/20'
                  : 'hover:border-cyan-500/50 hover:shadow-cyan-500/10'
              }`}
              onMouseEnter={() => setActiveCategory(category)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3 animate-pulse" />
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-slate-700/50 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-200 px-3 py-1"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;