"use client";

import { useState } from "react";
import { Sparkles, Copy, Download, Settings, Brain, Zap, Shield, ArrowLeft, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Toast from "@/components/Toast";

export default function HumanizePage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState("comprehensive");
  const [educationLevel, setEducationLevel] = useState("undergraduate");
  const [showSettings, setShowSettings] = useState(false);
  const [pipelineResult, setPipelineResult] = useState<any>(null);
  const [aiScoreBefore, setAiScoreBefore] = useState<number | null>(null);
  const [aiScoreAfter, setAiScoreAfter] = useState<number | null>(null);

  const handleHumanize = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    
    try {
      // Call the real API
      const response = await fetch('/api/humanize/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          pipeline_type: selectedPipeline,
          education_level: educationLevel
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setOutputText(data.humanized_text);
      setPipelineResult(data.pipeline_result);
      setAiScoreBefore(data.ai_detection_score_before);
      setAiScoreAfter(data.ai_detection_score_after);
      setToast({ message: 'Text humanized successfully!', type: 'success' });
    } catch (error) {
      console.error('Humanization error:', error);
      setOutputText('Error: Failed to humanize text. Please try again.');
      setToast({ message: 'Failed to humanize text. Please try again.', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const copyToClipboard = async () => {
    console.log('Copy button clicked, outputText:', outputText ? outputText.substring(0, 50) + '...' : 'empty');
    
    try {
      if (!outputText) {
        setToast({ message: 'No text to copy', type: 'info' });
        return;
      }
      
      console.log('Attempting to copy to clipboard...');
      await navigator.clipboard.writeText(outputText);
      console.log('Successfully copied to clipboard');
      setToast({ message: 'Text copied to clipboard!', type: 'success' });
    } catch (error) {
      console.error('Copy failed:', error);
      setToast({ message: 'Copy failed', type: 'error' });
      
      // Fallback for older browsers
      try {
        console.log('Trying fallback copy method...');
        const textArea = document.createElement('textarea');
        textArea.value = outputText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        console.log('Fallback copy successful');
        setToast({ message: 'Text copied! (fallback method)', type: 'success' });
      } catch (fallbackError) {
        console.error('Fallback copy also failed:', fallbackError);
        setToast({ message: 'Copy failed', type: 'error' });
      }
    }
  };

  const downloadText = () => {
    console.log('Download button clicked, outputText:', outputText ? outputText.substring(0, 50) + '...' : 'empty');
    
    try {
      if (!outputText) {
        setToast({ message: 'No text to download', type: 'info' });
        return;
      }
      
      console.log('Creating download blob...');
      const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `humanized-text-${new Date().toISOString().slice(0, 10)}.txt`;
      
      console.log('Triggering download...');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log('Download successful');
      setToast({ message: 'Text downloaded successfully!', type: 'success' });
    } catch (error) {
      console.error('Download failed:', error);
      setToast({ message: 'Download failed', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <Navigation currentPage="humanize" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            AI Text Humanizer
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Transform AI-generated text into natural, human-like content that evades detection
          </p>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Humanization Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  AI Pipeline
                </label>
                <select
                  value={selectedPipeline}
                  onChange={(e) => setSelectedPipeline(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="enhanced">Enhanced Humanization</option>
                  <option value="fluency">Fluency Polisher</option>
                  <option value="quick">Quick Humanization</option>
                  <option value="comprehensive">Comprehensive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Education Level
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="elementary">Elementary</option>
                  <option value="middle_school">Middle School</option>
                  <option value="high_school">High School</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="masters">Masters</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Main Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Input Text</h2>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </div>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your AI-generated text here..."
              className="w-full h-96 p-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            
            <button
              onClick={handleHumanize}
              disabled={!inputText.trim() || isProcessing}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Humanizing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Humanize Text
                </div>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Humanized Output</h2>
              {outputText && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    disabled={!outputText}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg border border-slate-300 dark:border-slate-600"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={downloadText}
                    disabled={!outputText}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors rounded-lg border border-slate-300 dark:border-slate-600"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              <textarea
                value={outputText}
                readOnly
                placeholder="Humanized text will appear here..."
                className="w-full h-96 p-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 resize-none"
              />
              {!outputText && (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500">
                  <div className="text-center">
                    <Brain className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Your humanized text will appear here</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Pipeline Stages and AI Detection Results */}
            {pipelineResult && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Pipeline Results</h3>
                
                {/* AI Detection Scores */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-red-800 dark:text-red-200">AI Detection Score (Before)</span>
                      <span className="text-lg font-bold text-red-600 dark:text-red-400">
                        {aiScoreBefore ? Math.round(aiScoreBefore * 100) : 'N/A'}%
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-red-200 dark:bg-red-800 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${aiScoreBefore ? aiScoreBefore * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">AI Detection Score (After)</span>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        {aiScoreAfter ? Math.round(aiScoreAfter * 100) : 'N/A'}%
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${aiScoreAfter ? aiScoreAfter * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Pipeline Stages */}
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                  <h4 className="text-md font-medium text-slate-900 dark:text-white mb-3">Processing Stages</h4>
                  <div className="space-y-3">
                    {pipelineResult.stages_completed?.map((stage: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300">{stage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pipeline Info */}
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">AI Detection Evasion Pipelines</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Our multi-stage pipeline is designed to beat AI detectors like SurferSEO, GPTZero, and WriteHuman while preserving meaning.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-900 dark:text-white">Comprehensive</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                All 3 stages: Paraphrase + Humanize + Enhance
              </p>
              <div className="mt-2 text-xs text-slate-500">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  Best for AI evasion
                </span>
              </div>
            </div>
            
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Zap className="h-5 w-5 text-green-600" />
                <span className="font-medium text-slate-900 dark:text-white">Enhanced</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Stage 1 + 3: Paraphrase + WriteHuman Enhancement
              </p>
              <div className="mt-2 text-xs text-slate-500">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                  Balanced approach
                </span>
              </div>
            </div>
            
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-slate-900 dark:text-white">Fluency</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Stage 1 + 2: Paraphrase + Multi-pass Humanization
              </p>
              <div className="mt-2 text-xs text-slate-500">
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                  Natural flow focus
                </span>
              </div>
            </div>
            
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Zap className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-slate-900 dark:text-white">Quick</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Stage 3 only: WriteHuman Enhancement
              </p>
              <div className="mt-2 text-xs text-slate-500">
                <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">
                  Fast processing
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">How It Works</h4>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <p><strong>Stage 1:</strong> Breaks obvious AI patterns through paraphrasing</p>
              <p><strong>Stage 2:</strong> Adds human-like variation through multi-pass rewriting</p>
              <p><strong>Stage 3:</strong> Final polish using WriteHuman-style enhancement</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
} 