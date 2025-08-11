// Text Processing Utilities for AI Detection Evasion

export function cleanText(text: string): string {
  const lines = text.trim().split('\n');
  const cleanedLines = lines
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      // Remove common unwanted prefixes
      const prefixes = [
        'FINAL:', 'FINAL ESSAY:', 'DRAFT:', 'REVISED ESSAY:', 'ESSAY:', 
        'SUMMARY:', 'Here is', "Here's", 'Output:', 'HUMANIZED TEXT:',
        'Polished version:', 'Enhanced text:', 'Here\'s your humanized text:'
      ];
      
      for (const prefix of prefixes) {
        if (line.toLowerCase().startsWith(prefix.toLowerCase())) {
          return line.substring(prefix.length).trim();
        }
      }
      return line;
    });
  
  return cleanedLines.join(' ');
}

export function calculateSimplePerplexity(text: string): number {
  // Simple perplexity calculation based on word frequency
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordCount = words.length;
  
  if (wordCount === 0) return 0;
  
  const wordFreq: { [key: string]: number } = {};
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });
  
  // Calculate entropy
  let entropy = 0;
  Object.values(wordFreq).forEach(freq => {
    const p = freq / wordCount;
    entropy -= p * Math.log2(p);
  });
  
  return entropy;
}

export function adjustToEducationLevel(text: string, level: string = 'undergraduate'): string {
  switch (level.toLowerCase()) {
    case 'elementary':
      return simplifyForElementary(text);
    case 'middle':
      return simplifyForMiddle(text);
    case 'high':
      return simplifyForHigh(text);
    case 'undergraduate':
      return text; // Keep as is
    case 'graduate':
      return enhanceForGraduate(text);
    default:
      return text;
  }
}

function simplifyForElementary(text: string): string {
  return text
    .replace(/\bconsequently\b/gi, 'so')
    .replace(/\bnevertheless\b/gi, 'but still')
    .replace(/\bthus\b/gi, 'so')
    .replace(/\bhence\b/gi, 'that\'s why')
    .replace(/\bwhereas\b/gi, 'while')
    .replace(/\bwhilst\b/gi, 'while')
    .replace(/\bIn conclusion\b/gi, 'So, to finish')
    .replace(/\bTo summarize\b/gi, 'To sum up');
}

function simplifyForMiddle(text: string): string {
  return text
    .replace(/\bconsequently\b/gi, 'so')
    .replace(/\bnevertheless\b/gi, 'still')
    .replace(/\bthus\b/gi, 'so')
    .replace(/\bhence\b/gi, 'that\'s why')
    .replace(/\bwhereas\b/gi, 'while')
    .replace(/\bwhilst\b/gi, 'while');
}

function simplifyForHigh(text: string): string {
  return text
    .replace(/\bconsequently\b/gi, 'so')
    .replace(/\bnevertheless\b/gi, 'still')
    .replace(/\bthus\b/gi, 'so')
    .replace(/\bhence\b/gi, 'that\'s why');
}

function enhanceForGraduate(text: string): string {
  return text
    .replace(/\bso\b/gi, () => Math.random() > 0.5 ? 'consequently' : 'thus')
    .replace(/\bstill\b/gi, () => Math.random() > 0.5 ? 'nevertheless' : 'nonetheless')
    .replace(/\bthat\'s why\b/gi, () => Math.random() > 0.5 ? 'hence' : 'therefore');
}

export function simpleFallbackHumanization(text: string, pipeline_type: string): string {
  // Basic humanization without API calls
  let humanized = text;
  
  // Remove obvious AI patterns
  humanized = humanized
    .replace(/\bmoreover\b/gi, 'also')
    .replace(/\bfurthermore\b/gi, 'what\'s more')
    .replace(/\badditionally\b/gi, 'plus')
    .replace(/\bconsequently\b/gi, 'so')
    .replace(/\bthus\b/gi, 'that\'s why')
    .replace(/\bhence\b/gi, 'so')
    .replace(/\bnevertheless\b/gi, 'still')
    .replace(/\bwhereas\b/gi, 'while')
    .replace(/\bwhilst\b/gi, 'while')
    .replace(/\bIn conclusion\b/gi, 'So, to wrap this up')
    .replace(/\bTo summarize\b/gi, 'Long story short')
    .replace(/\bIt is important to note\b/gi, 'Keep in mind')
    .replace(/\bIt should be noted\b/gi, 'Just remember');
  
  // Add conversational elements
  humanized = humanized
    .replace(/([.!?])\s+([A-Z][a-z]+)/g, (match, punct, word) => {
      if (Math.random() > 0.7) {
        const fillers = ['You know,', 'Well,', 'So,', 'Right,', 'Look,'];
        const filler = fillers[Math.floor(Math.random() * fillers.length)];
        return `${punct} ${filler} ${word.toLowerCase()}`;
      }
      return match;
    });
  
  return humanized;
}

// AI Detection Score Estimation (simplified)
export function estimateAIDetectionScore(text: string): number {
  let score = 0.5; // Base score
  
  // Check for AI patterns
  const aiPatterns = [
    /\bmoreover\b/gi,
    /\bfurthermore\b/gi,
    /\badditionally\b/gi,
    /\bconsequently\b/gi,
    /\bthus\b/gi,
    /\bhence\b/gi,
    /\bnevertheless\b/gi,
    /\bwhereas\b/gi,
    /\bwhilst\b/gi,
    /\bIn conclusion\b/gi,
    /\bTo summarize\b/gi
  ];
  
  aiPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      score += 0.05 * matches.length; // Increase score for each AI pattern
    }
  });
  
  // Check for human patterns
  const humanPatterns = [
    /\b(you know|I mean|basically|actually|sort of|kind of)\b/gi,
    /\b(well|so|right|like|um|uh|anyway|anyhow)\b/gi,
    /\([^)]+\)/g, // Parenthetical thoughts
    /\.{2,}/g, // Ellipses
    /\?!/g, // Question-exclamation
    /\.{3,}/g // Multiple dots
  ];
  
  humanPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      score -= 0.03 * matches.length; // Decrease score for each human pattern
    }
  });
  
  // Ensure score is between 0 and 1
  return Math.max(0, Math.min(1, score));
} 