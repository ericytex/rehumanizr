// Multi-Stage AI Detection Evasion Pipeline
// Implements the strategy to beat SurferSEO (<20% AI) and other detectors

import { GoogleGenerativeAI } from '@google/generative-ai';
import { fullEnhancement, writeHumanEnhancer } from './enhancer';

export interface PipelineStage {
  name: string;
  description: string;
  enabled: boolean;
}

export interface PipelineResult {
  originalText: string;
  stage1_paraphrased: string;
  stage2_humanized: string;
  stage3_enhanced: string;
  finalText: string;
  processingTime: number;
  stagesCompleted: string[];
}

export class DetectionEvasionPipeline {
  private genai: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genai = new GoogleGenerativeAI(apiKey);
    this.model = this.genai.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  // Stage 1: Initial Paraphrasing - Breaks obvious AI patterns
  private async stage1Paraphrase(text: string): Promise<string> {
    const prompt = `Rewrite this text to sound more natural and conversational while keeping the exact same meaning. 
    Break up any repetitive patterns, vary sentence structure, and make it sound like a human wrote it naturally.
    
    Text to rewrite:
    "${text}"
    
    Requirements:
    - Keep the exact same meaning and information
    - Make it sound more conversational and natural
    - Vary sentence length and structure
    - Remove any repetitive phrases
    - Don't add any new information
    
    Rewritten text:`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Stage 1 paraphrasing failed:', error);
      // Fallback to basic enhancement
      return this.basicParaphrase(text);
    }
  }

  // Stage 2: Multi-Pass Humanization - Adds human-like variation
  private async stage2Humanize(text: string, passes: number = 3): Promise<string> {
    let humanized = text;
    
    for (let i = 0; i < passes; i++) {
      const prompt = `This is pass ${i + 1} of ${passes} to make this text sound more human-written.
      
      Current text:
      "${humanized}"
      
      Make this text sound even more natural and human-like by:
      - Adding conversational elements and filler words naturally
      - Varying sentence rhythm and flow
      - Making it sound like someone speaking naturally
      - Keeping the exact same meaning
      
      More human version:`;

      try {
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        humanized = response.text().trim();
      } catch (error) {
        console.error(`Stage 2 pass ${i + 1} failed:`, error);
        break;
      }
    }
    
    return humanized;
  }

  // Stage 3: WriteHuman-Style Enhancement - Final polish
  private stage3Enhance(text: string): string {
    return fullEnhancement(text);
  }

  // Basic fallback paraphrasing without API calls
  private basicParaphrase(text: string): string {
    return text
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
      .replace(/\bTo summarize\b/gi, 'Long story short');
  }

  // Main pipeline execution
  async executePipeline(text: string, options: {
    enableStage1?: boolean;
    enableStage2?: boolean;
    enableStage3?: boolean;
    stage2Passes?: number;
  } = {}): Promise<PipelineResult> {
    const startTime = Date.now();
    const {
      enableStage1 = true,
      enableStage2 = true,
      enableStage3 = true,
      stage2Passes = 3
    } = options;

    let stage1_paraphrased = text;
    let stage2_humanized = text;
    let stage3_enhanced = text;
    let finalText = text;
    const stagesCompleted: string[] = [];

    try {
      // Stage 1: Initial Paraphrasing
      if (enableStage1) {
        console.log('🔄 Stage 1: Initial Paraphrasing...');
        stage1_paraphrased = await this.stage1Paraphrase(text);
        stagesCompleted.push('Paraphrasing');
        console.log('✅ Stage 1 completed');
      }

      // Stage 2: Multi-Pass Humanization
      if (enableStage2) {
        console.log('🧠 Stage 2: Multi-Pass Humanization...');
        stage2_humanized = await this.stage2Humanize(
          enableStage1 ? stage1_paraphrased : text, 
          stage2Passes
        );
        stagesCompleted.push('Humanization');
        console.log('✅ Stage 2 completed');
      }

      // Stage 3: WriteHuman-Style Enhancement
      if (enableStage3) {
        console.log('✨ Stage 3: WriteHuman Enhancement...');
        stage3_enhanced = this.stage3Enhance(
          enableStage2 ? stage2_humanized : (enableStage1 ? stage1_paraphrased : text)
        );
        stagesCompleted.push('Enhancement');
        console.log('✅ Stage 3 completed');
      }

      finalText = stage3_enhanced;

    } catch (error) {
      console.error('Pipeline execution failed:', error);
      // Use the best available result
      if (enableStage3 && stage3_enhanced !== text) {
        finalText = stage3_enhanced;
      } else if (enableStage2 && stage2_humanized !== text) {
        finalText = stage2_humanized;
      } else if (enableStage1 && stage1_paraphrased !== text) {
        finalText = stage1_paraphrased;
      }
    }

    const processingTime = Date.now() - startTime;

    return {
      originalText: text,
      stage1_paraphrased,
      stage2_humanized,
      stage3_enhanced,
      finalText,
      processingTime,
      stagesCompleted
    };
  }

  // Quick single-pass enhancement for testing
  async quickEnhance(text: string): Promise<string> {
    try {
      const result = await this.executePipeline(text, {
        enableStage1: true,
        enableStage2: false,
        enableStage3: true
      });
      return result.finalText;
    } catch (error) {
      console.error('Quick enhancement failed:', error);
      return fullEnhancement(text);
    }
  }

  // Full pipeline with all stages
  async fullEnhance(text: string): Promise<string> {
    try {
      const result = await this.executePipeline(text, {
        enableStage1: true,
        enableStage2: true,
        enableStage3: true,
        stage2Passes: 3
      });
      return result.finalText;
    } catch (error) {
      console.error('Full enhancement failed:', error);
      return fullEnhancement(text);
    }
  }
}

// Utility function to create pipeline instance
export function createPipeline(apiKey: string): DetectionEvasionPipeline {
  return new DetectionEvasionPipeline(apiKey);
} 