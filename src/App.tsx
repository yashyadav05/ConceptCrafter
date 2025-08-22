import React, { useState, useEffect } from 'react';
import { Atom, BookOpen, Award, ChevronRight, Play, RotateCcw, Check } from 'lucide-react';
import AtomicModel from './Components/AtomicModel';
import PeriodicTable from './Components/PeriodicTable';
import Quiz from './Components/Quiz';
import ElectronConfig from './Components/ElectronConfig';

function App() {
  const [currentSection, setCurrentSection] = useState('intro');
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const sections = [
    { id: 'intro', title: 'Introduction to Atoms', icon: Atom },
    { id: 'models', title: 'Atomic Models', icon: BookOpen },
    { id: 'periodic', title: 'Periodic Table', icon: Award },
    { id: 'config', title: 'Electron Configuration', icon: RotateCcw },
    { id: 'quiz', title: 'Knowledge Check', icon: Check }
  ];

  useEffect(() => {
    const completedCount = completedSections.length;
    setProgress((completedCount / sections.length) * 100);
  }, [completedSections]);

  const markSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections(prev => [...prev, sectionId]);
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'intro':
        return <IntroSection onComplete={() => markSectionComplete('intro')} />;
      case 'models':
        return <AtomicModelsSection onComplete={() => markSectionComplete('models')} />;
      case 'periodic':
        return <PeriodicSection onComplete={() => markSectionComplete('periodic')} />;
      case 'config':
        return <ConfigSection onComplete={() => markSectionComplete('config')} />;
      case 'quiz':
        return <Quiz onComplete={() => markSectionComplete('quiz')} />;
      default:
        return <IntroSection onComplete={() => markSectionComplete('intro')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Atom className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Atomic Structure</h1>
                <p className="text-sm text-gray-300">Interactive Learning Module</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">Progress</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 min-h-screen p-4">
          <ul className="space-y-2">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isCompleted = completedSections.includes(section.id);
              const isCurrent = currentSection === section.id;
              
              return (
                <li key={section.id}>
                  <button
                    onClick={() => setCurrentSection(section.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isCompleted 
                        ? 'bg-green-500/20 text-green-400' 
                        : isCurrent
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-700/50 text-gray-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{section.title}</p>
                      <p className="text-xs text-gray-400">
                        {isCompleted ? 'Completed' : `Step ${index + 1}`}
                      </p>
                    </div>
                    {isCompleted && <Check className="w-4 h-4 text-green-400" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderCurrentSection()}
        </main>
      </div>
    </div>
  );
}

// Introduction Section Component
const IntroSection = ({ onComplete }: { onComplete: () => void }) => {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Welcome to Atomic Structure
        </h2>
        <p className="text-xl text-gray-300">
          Discover the fascinating world of atoms through interactive models and simulations
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-4">What You'll Learn</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Structure of atoms and subatomic particles</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Evolution of atomic models</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>Electron configuration and valency</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Periodic table relationships</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              setHasStarted(true);
              onComplete();
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Start Learning</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center">
          <AtomicModel element="H" size="large" interactive={true} />
        </div>
      </div>
    </div>
  );
};

// Atomic Models Section Component
const AtomicModelsSection = ({ onComplete }: { onComplete: () => void }) => {
  const [currentModel, setCurrentModel] = useState(0);
  
  const models = [
    {
      name: "Thomson's Model",
      year: "1897",
      description: "Plum pudding model - electrons embedded in a positive sphere",
      features: ["Discovered electrons", "Positive sphere with embedded electrons", "No nucleus concept"]
    },
    {
      name: "Rutherford's Model",
      year: "1911",
      description: "Nuclear model - dense nucleus with orbiting electrons",
      features: ["Dense nucleus discovered", "Gold foil experiment", "Electrons orbit nucleus"]
    },
    {
      name: "Bohr's Model",
      year: "1913",
      description: "Electrons in fixed energy levels around nucleus",
      features: ["Fixed electron orbits", "Quantized energy levels", "Explains atomic spectra"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Evolution of Atomic Models</h2>
      
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          {models.map((model, index) => (
            <div
              key={index}
              className={`bg-white/5 backdrop-blur-lg rounded-xl p-6 border transition-all duration-300 cursor-pointer ${
                currentModel === index 
                  ? 'border-blue-400/50 bg-blue-500/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}
              onClick={() => setCurrentModel(index)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold">{model.name}</h3>
                <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">{model.year}</span>
              </div>
              <p className="text-gray-300 mb-4">{model.description}</p>
              <ul className="space-y-2">
                {model.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="sticky top-24">
          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-8 border border-white/10 h-96 flex items-center justify-center">
            <AtomicModel 
              element="He" 
              size="large" 
              modelType={currentModel === 0 ? 'thomson' : currentModel === 1 ? 'rutherford' : 'bohr'}
              interactive={true}
            />
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              onClick={onComplete}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Check className="w-5 h-5" />
              <span>Complete Section</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Periodic Table Section
const PeriodicSection = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Interactive Periodic Table</h2>
      <PeriodicTable onComplete={onComplete} />
    </div>
  );
};

// Electron Configuration Section
const ConfigSection = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Electron Configuration</h2>
      <ElectronConfig onComplete={onComplete} />
    </div>
  );
};

export default App;