import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const demoExamples = [
      {
        original: "The artificial intelligence system demonstrates remarkable capabilities in natural language processing.",
        humanized: "This AI thing is pretty impressive when it comes to understanding and working with human language. It's got some really cool abilities that make you wonder how far technology has come.",
        pipeline: "enhanced",
        education_level: "undergraduate"
      },
      {
        original: "Machine learning algorithms require substantial computational resources for optimal performance.",
        humanized: "You know, those machine learning algorithms need quite a bit of computer power to work their best. It's not like they can just run on any old laptop and expect great results.",
        pipeline: "fluency",
        education_level: "masters"
      },
      {
        original: "The implementation of neural networks facilitates pattern recognition in complex datasets.",
        humanized: "When you set up neural networks, they're really good at spotting patterns in complicated data. It's kind of amazing how they can pick up on things that humans might miss.",
        pipeline: "quick",
        education_level: "phd"
      }
    ];
    
    return NextResponse.json({
      message: "ReHumanizer Demo Examples",
      examples: demoExamples,
      note: "These are pre-generated examples. Use the /text endpoint for real humanization.",
      endpoints: {
        text: "/api/humanize/text",
        health: "/api/humanize/health"
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load demo examples' },
      { status: 500 }
    );
  }
} 