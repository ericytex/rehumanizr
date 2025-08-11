import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if Gemini API key is configured
    const hasGeminiKey = !!process.env.GEMINI_API_KEY;
    
    return NextResponse.json({
      status: 'healthy',
      service: 'rehumanizer-humanization-api',
      timestamp: new Date().toISOString(),
      features: {
        text_humanization: true,
        multiple_pipelines: true,
        education_levels: true,
        ai_detection_evasion: true,
        gemini_integration: hasGeminiKey
      },
      endpoints: {
        text: '/api/humanize/text',
        health: '/api/humanize/health'
      },
      gemini_status: hasGeminiKey ? 'configured' : 'not_configured'
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        service: 'rehumanizer-humanization-api',
        error: 'Health check failed' 
      },
      { status: 500 }
    );
  }
} 