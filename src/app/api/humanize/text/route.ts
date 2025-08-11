import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createPipeline } from '@/lib/pipeline';
import { fullEnhancement } from '@/lib/enhancer';
import { cleanText, calculateSimplePerplexity, adjustToEducationLevel, simpleFallbackHumanization, estimateAIDetectionScore } from '@/lib/textProcessing';

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
console.log('🔑 Gemini API Key status:', apiKey ? `Configured (${apiKey.substring(0, 10)}...)` : 'Not configured');

if (!apiKey) {
  console.warn('⚠️ GEMINI_API_KEY environment variable is not set!');
}

const genai = new GoogleGenerativeAI(apiKey || '');
const model = genai.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Types
interface HumanizeRequest {
  text: string;
  pipeline_type?: string;
  education_level?: string;
  paranoid_mode?: boolean;
  writehuman_mode?: boolean;
}

interface HumanizeResponse {
  original_text: string;
  paraphrased_text: string;
  humanized_text: string;
  processing_time_ms: number;
  ai_detection_score_before: number;
  ai_detection_score_after: number;
  readability_improvement: number;
  education_level?: string;
  gemini_humanized_text?: string;
  meaning_preserved?: boolean;
  fallback_used?: boolean;
  pipeline_result?: {
    stage1_paraphrased: string;
    stage2_humanized: string;
    stage3_enhanced: string;
    stages_completed: string[];
  };
}

// Prompt templates (mirroring the Python backend)
const PROMPTS = {
  humanize_ai_text: 
    "Transform this AI-generated text into natural, human-sounding content while maintaining the same length and core meaning. " +
    "Make it conversational, add personal touches, vary sentence structure, and use casual language. " +
    "Keep the core meaning but make it sound like a human wrote it. " +
    "IMPORTANT: Maintain the same approximate word count as the original text. " +
    "Return only the humanized text without any labels, prefixes, or formatting.\n\n" +
    "AI TEXT:\n{text}",
  
  enhanced_pipeline: 
    "Transform this text using an enhanced humanization pipeline. " +
    "Make it sound completely human-written by:\n" +
    "1. Varying sentence structure and length\n" +
    "2. Adding natural transitions and filler phrases\n" +
    "3. Using conversational language and personal touches\n" +
    "4. Maintaining the exact same meaning and length\n" +
    "5. Avoiding repetitive patterns\n\n" +
    "Return only the humanized text without any labels or prefixes.\n\n" +
    "TEXT:\n{text}",
  
  fluency_polisher: 
    "Polish this text to improve fluency, coherence, and natural flow. " +
    "Keep ALL filler phrases, sentence length variations, informal word choices, and parenthetical comments. " +
    "Only fix obvious grammar errors and improve flow between sentences. " +
    "DO NOT make it sound too formal or academic. " +
    "Return only the polished text without any labels or prefixes.\n\n" +
    "TEXT:\n{text}"
};



async function callGemini(prompt: string): Promise<string> {
  try {
    // First try with the Google Generative AI library
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: unknown) {
    console.error('Gemini API error with library:', error);
    
    // Check if it's a rate limit error
    if (error && typeof error === 'object' && 'status' in error && error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later or use a different API key.');
    }
    
    // If library fails, try direct HTTP request (like your working curl)
    try {
      console.log('Trying direct HTTP request as fallback...');
      const directResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': process.env.GEMINI_API_KEY || ''
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      });
      
      if (!directResponse.ok) {
        const errorText = await directResponse.text();
        throw new Error(`Direct HTTP request failed: ${directResponse.status} ${directResponse.statusText} - ${errorText}`);
      }
      
      const data = await directResponse.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Unexpected response format from direct HTTP request');
      }
    } catch (directError: unknown) {
      console.error('Direct HTTP request also failed:', directError);
      throw new Error(`Both library and direct HTTP failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // Parse request
    const body: HumanizeRequest = await request.json();
    const { text, pipeline_type = 'comprehensive', education_level = 'undergraduate' } = body;
    
    // Validate input
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }
    
    if (text.length > 10000) {
      return NextResponse.json(
        { error: 'Text too long. Maximum 10,000 characters allowed.' },
        { status: 400 }
      );
    }
    
    // Calculate initial scores
    const ai_detection_score_before = estimateAIDetectionScore(text);
    const readability_before = calculateSimplePerplexity(text);
    
    // Choose pipeline and generate humanized text
    let humanizedText = '';
    let fallbackUsed = false;
    let pipelineResult = null;
    
    try {
      // Use the new multi-stage detection evasion pipeline
      const pipeline = createPipeline(process.env.GEMINI_API_KEY || '');
      
      switch (pipeline_type) {
        case 'enhanced':
          console.log('🚀 Using Enhanced Pipeline (Stage 1 + 3)');
          pipelineResult = await pipeline.executePipeline(text, {
            enableStage1: true,
            enableStage2: false,
            enableStage3: true
          });
          break;
        case 'fluency':
          console.log('🚀 Using Fluency Pipeline (Stage 1 + 2)');
          pipelineResult = await pipeline.executePipeline(text, {
            enableStage1: true,
            enableStage2: true,
            enableStage3: false,
            stage2Passes: 2
          });
          break;
        case 'quick':
          console.log('🚀 Using Quick Pipeline (Stage 3 only)');
          pipelineResult = await pipeline.executePipeline(text, {
            enableStage1: false,
            enableStage2: false,
            enableStage3: true
          });
          break;
        default: // comprehensive
          console.log('🚀 Using Comprehensive Pipeline (All stages)');
          pipelineResult = await pipeline.executePipeline(text, {
            enableStage1: true,
            enableStage2: true,
            enableStage3: true,
            stage2Passes: 3
          });
      }
      
      humanizedText = pipelineResult.finalText;
      console.log(`✅ Pipeline completed in ${pipelineResult.processingTime}ms`);
      console.log(`📊 Stages completed: ${pipelineResult.stagesCompleted.join(', ')}`);
      
    } catch (pipelineError: unknown) {
      console.error('Pipeline failed, falling back to basic enhancement:', pipelineError);
      // Fallback to basic enhancement
      humanizedText = fullEnhancement(text);
      fallbackUsed = true;
    }
    
    // Apply education level adjustments
    const adjustedText = adjustToEducationLevel(humanizedText);
    
    // Calculate final scores
    const processing_time_ms = Date.now() - startTime;
    const ai_detection_score_after = estimateAIDetectionScore(adjustedText);
    const readability_after = calculateSimplePerplexity(adjustedText);
    const readability_improvement = readability_after - readability_before;
    
    // Prepare response
    const response: HumanizeResponse = {
      original_text: text,
      paraphrased_text: pipelineResult?.stage1_paraphrased || text,
      humanized_text: adjustedText,
      processing_time_ms,
      ai_detection_score_before,
      ai_detection_score_after,
      readability_improvement,
      education_level,
      gemini_humanized_text: humanizedText,
      meaning_preserved: true,
      fallback_used: fallbackUsed,
      pipeline_result: pipelineResult ? {
        stage1_paraphrased: pipelineResult.stage1_paraphrased,
        stage2_humanized: pipelineResult.stage2_humanized,
        stage3_enhanced: pipelineResult.stage3_enhanced,
        stages_completed: pipelineResult.stagesCompleted
      } : undefined
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Humanization error:', error);
    return NextResponse.json(
      { error: 'Failed to humanize text. Please try again.' },
      { status: 500 }
    );
  }
} 