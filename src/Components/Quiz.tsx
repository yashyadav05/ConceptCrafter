import React, { useState } from 'react';
import { Check, X, Award, RefreshCw } from 'lucide-react';

interface QuizProps {
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "What are the three main subatomic particles in an atom?",
      options: [
        "Protons, neutrons, and electrons",
        "Protons, ions, and electrons", 
        "Neutrons, ions, and electrons",
        "Protons, neutrons, and photons"
      ],
      correct: 0,
      explanation: "Atoms are made up of protons (positive charge), neutrons (neutral), and electrons (negative charge)."
    },
    {
      question: "Where are electrons located in Bohr's atomic model?",
      options: [
        "Inside the nucleus",
        "In fixed energy levels around the nucleus",
        "Randomly distributed throughout the atom",
        "Only in the outermost shell"
      ],
      correct: 1,
      explanation: "In Bohr's model, electrons orbit the nucleus in fixed energy levels or shells."
    },
    {
      question: "What is the maximum number of electrons in the second shell?",
      options: [
        "2 electrons",
        "6 electrons",
        "8 electrons",
        "18 electrons"
      ],
      correct: 2,
      explanation: "The second shell can hold a maximum of 8 electrons (2n² where n=2)."
    },
    {
      question: "Which model described the atom as a 'plum pudding'?",
      options: [
        "Rutherford's model",
        "Bohr's model",
        "Thomson's model",
        "Dalton's model"
      ],
      correct: 2,
      explanation: "Thomson's model described the atom as a positive sphere with embedded electrons, like plums in pudding."
    },
    {
      question: "What determines the atomic number of an element?",
      options: [
        "Number of neutrons",
        "Number of electrons",
        "Number of protons",
        "Total number of particles"
      ],
      correct: 2,
      explanation: "The atomic number is determined by the number of protons in the nucleus."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
        const score = newAnswers.filter(Boolean).length;
        if (score >= 3) {
          setTimeout(() => onComplete(), 2000);
        }
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (quizCompleted) {
    const score = answers.filter(Boolean).length;
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
          <Award className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
          
          <div className="text-6xl font-bold mb-4">
            <span className={getScoreColor(score, questions.length)}>
              {score}/{questions.length}
            </span>
          </div>
          
          <div className="text-xl mb-6">
            <span className={getScoreColor(score, questions.length)}>
              {percentage}% Correct
            </span>
          </div>

          <div className="space-y-3 mb-6">
            {percentage >= 80 && (
              <p className="text-green-400">Excellent! You have a strong understanding of atomic structure.</p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-yellow-400">Good work! Review the concepts you missed.</p>
            )}
            {percentage < 60 && (
              <p className="text-red-400">Keep studying! Review the atomic structure concepts again.</p>
            )}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={restartQuiz}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Retake Quiz</span>
            </button>
            
            {score >= 3 && (
              <button
                onClick={onComplete}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Check className="w-5 h-5" />
                <span>Complete Module</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-400">
            Score: {answers.filter(Boolean).length}/{answers.length}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold mb-6">{currentQ.question}</h2>
        
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                showResult
                  ? index === currentQ.correct
                    ? 'border-green-400 bg-green-500/20 text-green-400'
                    : index === selectedAnswer && index !== currentQ.correct
                    ? 'border-red-400 bg-red-500/20 text-red-400'
                    : 'border-gray-600 bg-gray-700/20 text-gray-400'
                  : selectedAnswer === index
                  ? 'border-blue-400 bg-blue-500/20'
                  : 'border-gray-600 bg-gray-700/20 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && (
                  <div>
                    {index === currentQ.correct && <Check className="w-5 h-5 text-green-400" />}
                    {index === selectedAnswer && index !== currentQ.correct && (
                      <X className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`p-4 rounded-lg border ${
            selectedAnswer === currentQ.correct
              ? 'border-green-400/50 bg-green-500/10'
              : 'border-red-400/50 bg-red-500/10'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {selectedAnswer === currentQ.correct ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <X className="w-5 h-5 text-red-400" />
              )}
              <span className="font-semibold">
                {selectedAnswer === currentQ.correct ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-sm text-gray-300">{currentQ.explanation}</p>
          </div>
        )}

        {!showResult && (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;