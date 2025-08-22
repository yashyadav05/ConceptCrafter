import React, { useState, useEffect } from 'react';

interface AtomicModelProps {
  element: string;
  size?: 'small' | 'medium' | 'large';
  modelType?: 'thomson' | 'rutherford' | 'bohr';
  interactive?: boolean;
}

const AtomicModel: React.FC<AtomicModelProps> = ({ 
  element, 
  size = 'medium', 
  modelType = 'bohr',
  interactive = false 
}) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedOrbit, setSelectedOrbit] = useState<number | null>(null);

  const elementData: Record<string, any> = {
    'H': { protons: 1, neutrons: 0, electrons: 1, symbol: 'H', name: 'Hydrogen' },
    'He': { protons: 2, neutrons: 2, electrons: 2, symbol: 'He', name: 'Helium' },
    'Li': { protons: 3, neutrons: 4, electrons: 3, symbol: 'Li', name: 'Lithium' },
    'C': { protons: 6, neutrons: 6, electrons: 6, symbol: 'C', name: 'Carbon' },
    'O': { protons: 8, neutrons: 8, electrons: 8, symbol: 'O', name: 'Oxygen' },
    'Na': { protons: 11, neutrons: 12, electrons: 11, symbol: 'Na', name: 'Sodium' }
  };

  const data = elementData[element] || elementData['H'];
  
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };

  const getElectronShells = (electrons: number) => {
    const shells = [];
    let remaining = electrons;
    let shell = 1;
    
    while (remaining > 0) {
      const maxElectrons = shell === 1 ? 2 : shell === 2 ? 8 : 18;
      const electronCount = Math.min(remaining, maxElectrons);
      shells.push(electronCount);
      remaining -= electronCount;
      shell++;
    }
    
    return shells;
  };

  const shells = getElectronShells(data.electrons);

  const renderNucleus = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Protons */}
        {Array.from({ length: data.protons }).map((_, i) => (
          <div
            key={`proton-${i}`}
            className="absolute w-3 h-3 bg-red-500 rounded-full shadow-lg animate-pulse"
            style={{
              transform: `rotate(${(i * 360) / data.protons}deg) translateX(${12 + (i % 2) * 4}px)`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
        
        {/* Neutrons */}
        {Array.from({ length: data.neutrons }).map((_, i) => (
          <div
            key={`neutron-${i}`}
            className="absolute w-3 h-3 bg-gray-400 rounded-full shadow-lg"
            style={{
              transform: `rotate(${(i * 360) / data.neutrons + 180}deg) translateX(${8 + (i % 2) * 4}px)`
            }}
          />
        ))}
        
        {/* Central nucleus glow */}
        <div className="w-8 h-8 bg-gradient-to-r from-red-500/30 to-yellow-500/30 rounded-full blur-sm" />
      </div>
    </div>
  );

  const renderElectronShells = () => (
    <>
      {shells.map((electronCount, shellIndex) => {
        const radius = 40 + shellIndex * 30;
        
        return (
          <div key={shellIndex} className="absolute inset-0">
            {/* Orbit path */}
            <div
              className={`absolute border border-blue-400/30 rounded-full ${
                selectedOrbit === shellIndex ? 'border-blue-400/80' : ''
              }`}
              style={{
                width: radius * 2,
                height: radius * 2,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => interactive && setSelectedOrbit(
                selectedOrbit === shellIndex ? null : shellIndex
              )}
            />
            
            {/* Electrons */}
            {Array.from({ length: electronCount }).map((_, electronIndex) => {
              const angle = (electronIndex * 360) / electronCount;
              
              return (
                <div
                  key={`electron-${shellIndex}-${electronIndex}`}
                  className={`absolute w-2 h-2 bg-blue-400 rounded-full shadow-lg ${
                    isAnimating ? 'animate-spin' : ''
                  }`}
                  style={{
                    width: '8px',
                    height: '8px',
                    transformOrigin: `${radius}px ${radius}px`,
                    transform: `rotate(${angle}deg) translateX(${radius}px)`,
                    top: '50%',
                    left: '50%',
                    marginTop: '-4px',
                    marginLeft: `-${radius + 4}px`,
                    animationDuration: `${2 + shellIndex}s`,
                    animationDelay: `${electronIndex * 0.2}s`
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );

  return (
    <div className="relative flex flex-col items-center space-y-4">
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        <div className="relative w-full h-full">
          {modelType !== 'thomson' && renderNucleus()}
          {renderElectronShells()}
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-bold">{data.name}</h3>
        <div className="flex space-x-4 text-sm mt-2">
          <span className="text-red-400">P: {data.protons}</span>
          <span className="text-gray-400">N: {data.neutrons}</span>
          <span className="text-blue-400">E: {data.electrons}</span>
        </div>
      </div>
      
      {interactive && (
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors"
        >
          {isAnimating ? 'Pause' : 'Play'} Animation
        </button>
      )}
    </div>
  );
};

export default AtomicModel;