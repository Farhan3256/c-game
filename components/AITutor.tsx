import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Bot } from 'lucide-react';
import { getAIFeedback } from '../services/geminiService';

export const AITutor: React.FC = () => {
  const [code, setCode] = useState<string>('int* ptr = nullptr;\n*ptr = 10; // Oops!');
  const [question, setQuestion] = useState<string>('Why does this crash?');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    const feedback = await getAIFeedback(code, question);
    setResponse(feedback);
    setLoading(false);
  };

  return (
    <section id="demo" className="py-20 bg-[#0a1630]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 gap-12 items-start">
            
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-[#06B6D4]" />
              <h2 className="text-3xl font-bold">Try the AI Tutor</h2>
            </div>
            <p className="text-gray-400 mb-8">
              Experience the power of our integrated Gemini AI. Paste a C++ snippet, ask a question, and get instant, context-aware feedback designed to help you learn without giving away the answer.
            </p>

            <div className="bg-[#071024]/70 p-6 rounded-xl border border-gray-800 backdrop-blur-sm">
               <label className="block text-sm font-mono text-gray-500 mb-2">Editor (Simulated)</label>
               <textarea
                 value={code}
                 onChange={(e) => setCode(e.target.value)}
                 className="w-full h-32 bg-[#050b1a]/80 border border-gray-700 rounded-md p-4 font-mono text-sm text-gray-300 focus:outline-none focus:border-[#06B6D4] resize-none mb-4"
               />
               
               <label className="block text-sm font-mono text-gray-500 mb-2">Ask a question</label>
               <div className="flex gap-2">
                 <input
                   type="text"
                   value={question}
                   onChange={(e) => setQuestion(e.target.value)}
                   className="flex-1 bg-[#050b1a]/80 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#06B6D4]"
                   placeholder="e.g., How do I fix this memory leak?"
                 />
                 <button 
                   onClick={handleAskAI}
                   disabled={loading}
                   className="bg-[#06B6D4] text-white px-4 py-2 rounded-md font-bold hover:bg-[#0891a8] disabled:opacity-50 flex items-center gap-2"
                 >
                   {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
                   Ask
                 </button>
               </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
             <div className="bg-[#050b1a]/70 border border-gray-800 rounded-xl p-6 h-full min-h-[300px] relative backdrop-blur-sm">
               <div className="absolute -top-3 left-6 bg-[#0a1630] px-3 py-1 border border-gray-800 rounded text-xs font-mono text-[#FFB703]">
                 AI Response Console
               </div>
               
               {response ? (
                 <div className="prose prose-invert max-w-none">
                    <p className="whitespace-pre-wrap font-mono text-sm text-gray-300">{response}</p>
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center h-full text-gray-600 space-y-4">
                   <Bot className="w-12 h-12 opacity-20" />
                   <p className="text-sm">Waiting for input...</p>
                 </div>
               )}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};