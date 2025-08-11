// AI Detection Evasion Enhancer
// Mimics WriteHuman.ai patterns to reduce AI detection scores

export interface EnhancementOptions {
  addFillerWords?: boolean;
  varySentenceLength?: boolean;
  addConversationalElements?: boolean;
  removeRoboticPatterns?: boolean;
  adjustPunctuation?: boolean;
}

export function writeHumanEnhancer(text: string, options: EnhancementOptions = {}): string {
  const {
    addFillerWords = true,
    varySentenceLength = true,
    addConversationalElements = true,
    removeRoboticPatterns = true,
    adjustPunctuation = true
  } = options;

  let enhanced = text;

  if (removeRoboticPatterns) {
    enhanced = _removeRoboticPatterns(enhanced);
  }

  if (adjustPunctuation) {
    enhanced = _adjustPunctuation(enhanced);
  }

  if (addFillerWords) {
    enhanced = _addHumanFillerWords(enhanced);
  }

  if (varySentenceLength) {
    enhanced = _varySentenceLength(enhanced);
  }

  if (addConversationalElements) {
    enhanced = _addConversationalElements(enhanced);
  }

  return enhanced.trim();
}

function _removeRoboticPatterns(text: string): string {
  return text
    // Remove double full stops
    .replace(/\.{2,}/g, '.')
    // Remove excessive commas
    .replace(/,{2,}/g, ',')
    // Remove repetitive phrases
    .replace(/\b(which,? considering the\s+){2,}broader context\b/gi, 'which, considering the broader context')
    .replace(/\b(furthermore,? it is important to note that\s+){2,}/gi, 'furthermore, it is important to note that')
    .replace(/\b(in conclusion,? we can see that\s+){2,}/gi, 'in conclusion, we can see that')
    // Remove overly formal transitions
    .replace(/\bmoreover\b/gi, () => Math.random() > 0.5 ? 'also' : 'plus')
    .replace(/\bfurthermore\b/gi, () => Math.random() > 0.5 ? 'what\'s more' : 'on top of that')
    .replace(/\badditionally\b/gi, () => Math.random() > 0.5 ? 'and' : 'as well')
    // Break up long, complex sentences
    .replace(/([.!?])\s+([A-Z][a-z]+)/g, (match, punct, word) => {
      if (Math.random() > 0.7) {
        return `${punct} You know, ${word.toLowerCase()}`;
      }
      return match;
    });
}

function _adjustPunctuation(text: string): string {
  return text
    // Add occasional ellipses for natural flow
    .replace(/([.!?])\s+([A-Z][a-z]+)/g, (match, punct, word) => {
      if (Math.random() > 0.85) {
        return `${punct}.. ${word}`;
      }
      return match;
    })
    // Vary question marks and exclamation points
    .replace(/\?/g, () => Math.random() > 0.8 ? '?!' : '?')
    .replace(/\./g, () => Math.random() > 0.9 ? '...' : '.');
}

function _addHumanFillerWords(text: string): string {
  const fillerWords = [
    'you know', 'I mean', 'basically', 'actually', 'sort of', 'kind of',
    'well', 'so', 'right', 'like', 'um', 'uh', 'anyway', 'anyhow'
  ];

  return text
    // Add filler words at sentence beginnings
    .replace(/([.!?])\s+([A-Z][a-z]+)/g, (match, punct, word) => {
      if (Math.random() > 0.7) {
        const filler = fillerWords[Math.floor(Math.random() * fillerWords.length)];
        return `${punct} ${filler.charAt(0).toUpperCase() + filler.slice(1)}, ${word.toLowerCase()}`;
      }
      return match;
    })
    // Add occasional parenthetical thoughts
    .replace(/([.!?])\s+([A-Z][a-z]+)/g, (match, punct, word) => {
      if (Math.random() > 0.8) {
        const thoughts = [
          '(which makes sense)', '(if you think about it)', '(you see?)',
          '(I guess)', '(right?)', '(sort of)', '(in a way)'
        ];
        const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
        return `${punct} ${word} ${thought}`;
      }
      return match;
    });
}

function _varySentenceLength(text: string): string {
  return text
    // Break up very long sentences
    .replace(/([^.!?]{80,})/g, (match) => {
      if (match.length > 120) {
        const words = match.split(' ');
        const midPoint = Math.floor(words.length / 2);
        const connector = ['And', 'Plus', 'Also', 'What\'s more'][Math.floor(Math.random() * 4)];
        return `${words.slice(0, midPoint).join(' ')}. ${connector}, ${words.slice(midPoint).join(' ')}`;
      }
      return match;
    })
    // Add short, punchy sentences occasionally
    .replace(/([.!?])\s+([A-Z][a-z]+)/g, (match, punct, word) => {
      if (Math.random() > 0.75) {
        const shortSentences = [
          'That\'s the thing.', 'It\'s interesting.', 'Think about it.',
          'You see?', 'Right?', 'Makes sense.', 'Simple as that.'
        ];
        const short = shortSentences[Math.floor(Math.random() * shortSentences.length)];
        return `${punct} ${short} ${word.toLowerCase()}`;
      }
      return match;
    });
}

function _addConversationalElements(text: string): string {
  return text
    // Add rhetorical questions
    .replace(/([.!?])\s+([A-Z][a-z]+)/g, (match, punct, word) => {
      if (Math.random() > 0.8) {
        const questions = [
          'But what does that really mean?', 'How so?', 'Why is that?',
          'What do you think?', 'Does that make sense?', 'See what I mean?'
        ];
        const question = questions[Math.floor(Math.random() * questions.length)];
        return `${punct} ${question} ${word.toLowerCase()}`;
      }
      return match;
    })
    // Add conversational connectors
    .replace(/\bHowever\b/g, () => {
      const alternatives = ['That said', 'Still', 'On the other hand', 'But then again'];
      return alternatives[Math.floor(Math.random() * alternatives.length)];
    })
    .replace(/\bTherefore\b/g, () => {
      const alternatives = ['So', 'That\'s why', 'Which means', 'As a result'];
      return alternatives[Math.floor(Math.random() * alternatives.length)];
    })
    // Add personal touches
    .replace(/([.!?])\s+([A-Z][a-z]+)/g, (match, punct, word) => {
      if (Math.random() > 0.85) {
        const personal = [
          'I think', 'I believe', 'In my view', 'From what I\'ve seen',
          'It seems to me', 'I\'d say', 'My take on it'
        ];
        const phrase = personal[Math.floor(Math.random() * personal.length)];
        return `${punct} ${phrase}, ${word.toLowerCase()}`;
      }
      return match;
    });
}

// Advanced pattern replacement for specific AI detection markers
export function advancedPatternReplacement(text: string): string {
  return text
    // Replace overly academic language with conversational equivalents
    .replace(/\bconsequently\b/gi, 'so')
    .replace(/\bnevertheless\b/gi, 'still')
    .replace(/\bthus\b/gi, 'so')
    .replace(/\bhence\b/gi, 'that\'s why')
    .replace(/\bwhereas\b/gi, 'while')
    .replace(/\bwhilst\b/gi, 'while')
    .replace(/\bwhom\b/gi, 'who')
    .replace(/\bwhomsoever\b/gi, 'whoever')
    // Add natural speech patterns
    .replace(/\bIn conclusion\b/gi, 'So, to wrap this up')
    .replace(/\bTo summarize\b/gi, 'Long story short')
    .replace(/\bIt is important to note\b/gi, 'Keep in mind')
    .replace(/\bIt should be noted\b/gi, 'Just remember')
    .replace(/\bIt is worth mentioning\b/gi, 'Oh, and')
    // Break up repetitive structures
    .replace(/([.!?])\s+([A-Z][a-z]+)/g, (match, punct, word) => {
      if (Math.random() > 0.6) {
        const connectors = [
          'Now,', 'So,', 'Well,', 'Right,', 'You see,',
          'Look,', 'Here\'s the thing,', 'Get this,'
        ];
        const connector = connectors[Math.floor(Math.random() * connectors.length)];
        return `${punct} ${connector} ${word.toLowerCase()}`;
      }
      return match;
    });
}

// Main function that applies all enhancements
export function fullEnhancement(text: string): string {
  let enhanced = text;
  
  // First pass: Remove obvious AI patterns
  enhanced = _removeRoboticPatterns(enhanced);
  
  // Second pass: Add human elements
  enhanced = _addHumanFillerWords(enhanced);
  enhanced = _addConversationalElements(enhanced);
  
  // Third pass: Advanced pattern replacement
  enhanced = advancedPatternReplacement(enhanced);
  
  // Final pass: Adjust punctuation and flow
  enhanced = _adjustPunctuation(enhanced);
  enhanced = _varySentenceLength(enhanced);
  
  return enhanced.trim();
} 