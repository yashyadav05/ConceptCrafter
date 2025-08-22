import React, { useState } from 'react';
import AtomicModel from './AtomicModel';

interface PeriodicTableProps {
  onComplete: () => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onComplete }) => {
  const [selectedElement, setSelectedElement] = useState<string | null>('H');
  const [exploredElements, setExploredElements] = useState<string[]>(['H']);

  const elements = [
    { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, group: 1, period: 1 },
    { symbol: 'He', name: 'Helium', atomicNumber: 2, group: 18, period: 1 },
    { symbol: 'Li', name: 'Lithium', atomicNumber: 3, group: 1, period: 2 },
    { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, group: 2, period: 2 },
    { symbol: 'B', name: 'Boron', atomicNumber: 5, group: 13, period: 2 },
    { symbol: 'C', name: 'Carbon', atomicNumber: 6, group: 14, period: 2 },
    { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, group: 15, period: 2 },
    { symbol: 'O', name: 'Oxygen', atomicNumber: 8, group: 16, period: 2 },
    { symbol: 'F', name: 'Fluorine', atomicNumber: 9, group: 17, period: 2 },
    { symbol: 'Ne', name: 'Neon', atomicNumber: 10, group: 18, period: 2 },
    { symbol: 'Na', name: 'Sodium', atomicNumber: 11, group: 1, period: 3 },
    { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, group: 2, period: 3 },
    { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, group: 13, period: 3 },
    { symbol: 'Si', name: 'Silicon', atomicNumber: 14, group: 14, period: 3 },
    { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, group: 15, period: 3 },
    { symbol: 'S', name: 'Sulfur', atomicNumber: 16, group: 16, period: 3 },
    { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, group: 17, period: 3 },
    { symbol: 'Ar', name: 'Argon', atomicNumber: 18, group: 18, period: 3 }
  ];

  const handleElementClick = (element: any) => {
    setSelectedElement(element.symbol);
    if (!exploredElements.includes(element.symbol)) {
      setExploredElements(prev => [...prev, element.symbol]);
    }
  };

  const getElementColor = (group: number) => {
    if (group === 1) return 'bg-red-500/20 border-red-400/50 text-red-200';
    if (group === 2) return 'bg-orange-500/20 border-orange-400/50 text-orange-200';
    if (group >= 13 && group <= 16) return 'bg-green-500/20 border-green-400/50 text-green-200';
    if (group === 17) return 'bg-yellow-500/20 border-yellow-400/50 text-yellow-200';
    if (group === 18) return 'bg-purple-500/20 border-purple-400/50 text-purple-200';
    return 'bg-blue-500/20 border-blue-400/50 text-blue-200';
  };

  return (
    <div className="space-y-6">
      {/* Periodic Table Grid */}
      <div className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(18, 1fr)' }}>
          {Array.from({ length: 18 * 3 }).map((_, index) => {
            const col = (index % 18) + 1;
            const row = Math.floor(index / 18) + 1;
            
            const element = elements.find(el => el.group === col && el.period === row);
            
            if (!element) {
              return <div key={index} className="w-12 h-12" />;
            }
            
            const isSelected = selectedElement === element.symbol;
            const isExplored = exploredElements.includes(element.symbol);
            
            return (
              <button
                key={element.symbol}
                onClick={() => handleElementClick(element)}
                className={`w-12 h-12 border-2 rounded-lg text-xs font-bold transition-all duration-200 hover:scale-110 ${
                  isSelected 
                    ? 'ring-2 ring-white/50 scale-110' 
                    : ''
                } ${getElementColor(element.group)} ${
                  isExplored ? '' : 'opacity-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-xs">{element.atomicNumber}</div>
                  <div className="font-bold">{element.symbol}</div>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="flex flex-wrap gap-4 mt-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500/20 border border-red-400/50 rounded"></div>
            <span>Alkali metals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500/20 border border-orange-400/50 rounded"></div>
            <span>Alkaline earth</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500/20 border border-green-400/50 rounded"></div>
            <span>Metalloids</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500/20 border border-yellow-400/50 rounded"></div>
            <span>Halogens</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500/20 border border-purple-400/50 rounded"></div>
            <span>Noble gases</span>
          </div>
        </div>
      </div>

      {/* Element Details */}
      {selectedElement && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-bold mb-4">
              {elements.find(el => el.symbol === selectedElement)?.name}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Atomic Number:</span>
                <span className="font-semibold">
                  {elements.find(el => el.symbol === selectedElement)?.atomicNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Group:</span>
                <span className="font-semibold">
                  {elements.find(el => el.symbol === selectedElement)?.group}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Period:</span>
                <span className="font-semibold">
                  {elements.find(el => el.symbol === selectedElement)?.period}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <AtomicModel element={selectedElement} size="large" interactive={true} />
          </div>
        </div>
      )}

      {/* Progress tracking */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Exploration Progress</h4>
          <span className="text-sm text-gray-400">
            {exploredElements.length} / 18 elements explored
          </span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
            style={{ width: `${(exploredElements.length / 18) * 100}%` }}
          />
        </div>
        
        <button
          onClick={onComplete}
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          Complete Section
        </button>
      </div>
    </div>
  );
};

export default PeriodicTable;