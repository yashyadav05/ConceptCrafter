import React, { useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';

interface ElectronConfigProps {
  onComplete: () => void;
}

const ElectronConfig: React.FC<ElectronConfigProps> = ({ onComplete }) => {
  const [selectedElement, setSelectedElement] = useState('C');
  const [userConfig, setUserConfig] = useState<number[]>([]);
  const [currentShell, setCurrentShell] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const elements = {
    'C': { name: 'Carbon', electrons: 6, config: [2, 4] },
    'N': { name: 'Nitrogen', electrons: 7, config: [2, 5] },
    'O': { name: 'Oxygen', electrons: 8, config: [2, 6] },
    'F': { name: 'Fluorine', electrons: 9, config: [2, 7] },
    'Na': { name: 'Sodium', electrons: 11, config: [2, 8, 1] },
    'Mg': { name: 'Magnesium', electrons: 12, config: [2, 8, 2] },
    'Al': { name: 'Aluminum', electrons: 13, config: [2, 8, 3] },
    'Si': { name: 'Silicon', electrons: 14, config: [2, 8, 4] }
  };

  const currentElement = elements[selectedElement as keyof typeof elements];
  const maxShells = currentElement.config.length;
  const shellCapacities = [2, 8, 8, 18];

  const addElectron = () => {
    if (currentShell >= maxShells) return;
    
    const newConfig = [...userConfig];
    while (newConfig.length <= currentShell) {
      newConfig.push(0);
    }
    
    if (newConfig[currentShell] < shellCapacities[currentShell]) {
      newConfig[currentShell]++;
      setUserConfig(newConfig);
      
      // Check if current shell is full, move to next
      if (newConfig[currentShell] === currentElement.config[currentShell] && currentShell < maxShells - 1) {
        setCurrentShell(currentShell + 1);
      }
    }
  };

  const removeElectron = () => {
    const newConfig = [...userConfig];
    if (currentShell >= 0 && newConfig[currentShell] > 0) {
      newConfig[currentShell]--;
      setUserConfig(newConfig);
    }
  };

  const checkAnswer = () => {
    const isAnswerCorrect = JSON.stringify(userConfig) === JSON.stringify(currentElement.config);
    setIsCorrect(isAnswerCorrect);
    setAttempts(attempts + 1);
    
    if (isAnswerCorrect && attempts >= 2) {
      setTimeout(() => onComplete(), 1500);
    }
  };

  const resetConfig = () => {
    setUserConfig([]);
    setCurrentShell(0);
    setIsCorrect(false);
  };

  const getTotalElectrons = () => userConfig.reduce((sum, count) => sum + count, 0);

  const renderElectronShells = () => {
    return (
      <div className="relative w-64 h-64 mx-auto">
        {Array.from({ length: maxShells }).map((_, shellIndex) => {
          const radius = 40 + shellIndex * 35;
          const electronCount = userConfig[shellIndex] || 0;
          const isActive = currentShell === shellIndex;
          
          return (
            <div key={shellIndex} className="absolute inset-0">
              {/* Shell orbit */}
              <div
                className={`absolute border-2 rounded-full transition-colors ${
                  isActive 
                    ? 'border-blue-400 border-dashed' 
                    : 'border-gray-500/50'
                }`}
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
              
              {/* Shell label */}
              <div
                className="absolute text-xs text-gray-400 font-semibold"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) translateY(-${radius + 15}px)`
                }}
              >
                Shell {shellIndex + 1} ({electronCount}/{currentElement.config[shellIndex]})
              </div>
              
              {/* Electrons */}
              {Array.from({ length: electronCount }).map((_, electronIndex) => {
                const angle = (electronIndex * 360) / Math.max(electronCount, 1);
                
                return (
                  <div
                    key={electronIndex}
                    className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-lg animate-pulse"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                      animationDelay: `${electronIndex * 0.1}s`
                    }}
                  />
                );
              })}
            </div>
          );
        })}
        
        {/* Nucleus */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
            {selectedElement}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Element Selection */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold mb-4">Choose an Element</h3>
        <div className="grid grid-cols-4 gap-3">
          {Object.entries(elements).map(([symbol, data]) => (
            <button
              key={symbol}
              onClick={() => {
                setSelectedElement(symbol);
                resetConfig();
              }}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedElement === symbol
                  ? 'border-blue-400 bg-blue-500/20'
                  : 'border-gray-600 bg-gray-700/20 hover:border-gray-500'
              }`}
            >
              <div className="text-lg font-bold">{symbol}</div>
              <div className="text-xs text-gray-400">{data.name}</div>
              <div className="text-xs">{data.electrons} electrons</div>
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Builder */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-4">Build Electron Configuration</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Total Electrons:</span>
              <span className={`font-bold ${
                getTotalElectrons() === currentElement.electrons 
                  ? 'text-green-400' 
                  : getTotalElectrons() > currentElement.electrons
                  ? 'text-red-400'
                  : 'text-yellow-400'
              }`}>
                {getTotalElectrons()} / {currentElement.electrons}
              </span>
            </div>
            
            <div className="space-y-2">
              {Array.from({ length: maxShells }).map((_, shellIndex) => (
                <div key={shellIndex} className="flex items-center space-x-3">
                  <span className="w-16 text-sm">Shell {shellIndex + 1}:</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                      style={{
                        width: `${((userConfig[shellIndex] || 0) / shellCapacities[shellIndex]) * 100}%`
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                      {userConfig[shellIndex] || 0} / {currentElement.config[shellIndex]}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={addElectron}
                disabled={getTotalElectrons() >= currentElement.electrons}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
              >
                Add Electron
              </button>
              <button
                onClick={removeElectron}
                disabled={getTotalElectrons() === 0}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
              >
                Remove Electron
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={checkAnswer}
                disabled={getTotalElectrons() !== currentElement.electrons}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Check Answer</span>
              </button>
              <button
                onClick={resetConfig}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {isCorrect && (
              <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-4 text-center">
                <div className="text-green-400 font-bold">Correct! ✓</div>
                <div className="text-sm text-gray-300 mt-1">
                  Perfect electron configuration for {currentElement.name}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold mb-4 text-center">
            {currentElement.name} Atom
          </h3>
          {renderElectronShells()}
          
          <div className="mt-6 text-center space-y-2">
            <div className="text-sm text-gray-400">
              Current Shell: {currentShell + 1}
            </div>
            <div className="text-xs text-gray-500">
              Click "Add Electron" to place electrons in the highlighted shell
            </div>
          </div>
        </div>
      </div>
      
      {/* Complete Section Button */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
        <button
          onClick={onComplete}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 mx-auto"
        >
          <Check className="w-5 h-5" />
          <span>Complete Section</span>
        </button>
      </div>
    </div>
  );
};

export default ElectronConfig;