import React, { useState } from 'react';
import { projects } from '../utils/mock';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Github, ExternalLink, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Production-ready systems combining mobile apps, real-time backends, and ML models
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="bg-slate-800/50 backdrop-blur-sm border-slate-700 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              {project.image && (
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent opacity-60" />
                </div>
              )}
              {!project.image && (
                <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <div className="text-6xl font-bold text-cyan-500/30">{project.title.charAt(0)}</div>
                </div>
              )}

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{project.summary}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 4).map((tech, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-slate-700/50 text-gray-300 text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.tech.length > 4 && (
                    <Badge variant="secondary" className="bg-slate-700/50 text-gray-300 text-xs">
                      +{project.tech.length - 4} more
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.github && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, '_blank');
                      }}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-cyan-400 pr-8">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>

              {selectedProject.image && (
                <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Overview</h4>
                  <p className="text-gray-300 text-base leading-relaxed">{selectedProject.summary}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Features & Achievements</h4>
                  <ul className="space-y-2">
                    {selectedProject.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-cyan-400 mr-3 mt-1 flex-shrink-0">•</span>
                        <span className="text-gray-300">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-slate-700/50 text-gray-300 px-3 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedProject.github && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      className="bg-cyan-500 hover:bg-cyan-600 text-white flex-1"
                      onClick={() => window.open(selectedProject.github, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View on GitHub
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;