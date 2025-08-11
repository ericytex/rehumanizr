# 🎯 ReHumanizr - AI Detection Evasion Pipeline

> **Transform AI-generated text into human-like content that evades detection while preserving meaning**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

## 🚀 **AI Detection Results**

Our multi-stage pipeline achieves **exceptional results** across major AI detectors:

| Detector | Before | After | Improvement |
|----------|--------|-------|-------------|
| **WriteHuman** | 98% AI | **2% AI** | **96% reduction** |
| **ZeroGPT** | 90.38% AI | **0% AI** | **100% reduction** |
| **SurferSEO** | Unknown | **1% AI** | **Target achieved** |
| **GPTZero** | 100% AI | 97% AI | 3% reduction |

> **Goal**: Beat SurferSEO (<20% AI) ✅ **ACHIEVED: 1% AI**

## 🏗 **Architecture Overview**

### **Multi-Stage Detection Evasion Pipeline**

```
Input Text → Stage 1: Paraphrasing → Stage 2: Humanization → Stage 3: Enhancement → Human Output
```

1. **Stage 1: Initial Paraphrasing**
   - Breaks obvious AI patterns and repetitive structures
   - Varies sentence structure and length
   - Uses Google Gemini 2.0 Flash for intelligent rewriting

2. **Stage 2: Multi-Pass Humanization**
   - Adds conversational elements and filler words
   - Varies sentence rhythm and flow
   - Multiple passes for natural variation

3. **Stage 3: WriteHuman-Style Enhancement**
   - Final polish using pattern-based enhancement
   - Removes robotic markers
   - Adds human-like punctuation and flow

### **Pipeline Options**

- **🔄 Comprehensive**: All 3 stages (best for AI evasion)
- **⚡ Enhanced**: Stage 1 + 3 (balanced approach)
- **💬 Fluency**: Stage 1 + 2 (natural flow focus)
- **🚀 Quick**: Stage 3 only (fast processing)

## 🛠 **Tech Stack**

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: Google Gemini 2.0 Flash
- **Deployment**: Vercel-ready
- **Styling**: Tailwind CSS + Lucide React icons

## 📁 **Project Structure**

```
rehumanizer-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── humanize/      # Humanization endpoints
│   │   ├── humanize/          # Main humanization page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── Navigation.tsx     # Navigation bar
│   │   ├── Footer.tsx         # Footer component
│   │   └── Toast.tsx          # Toast notifications
│   └── lib/                   # Core libraries
│       ├── pipeline.ts        # Multi-stage pipeline
│       ├── enhancer.ts        # Text enhancement functions
│       └── textProcessing.ts  # Text processing utilities
├── public/                    # Static assets
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🚀 **Quick Start**

### **Prerequisites**

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/ericytex/rehumanizr.git
   cd rehumanizr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 **Configuration**

### **Environment Variables**

```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional
NEXT_PUBLIC_APP_NAME=ReHumanizr
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Pipeline Configuration**

Each pipeline can be customized:

```typescript
const pipeline = createPipeline(apiKey);

// Comprehensive pipeline (all stages)
const result = await pipeline.executePipeline(text, {
  enableStage1: true,    // Paraphrasing
  enableStage2: true,    // Humanization
  enableStage3: true,    // Enhancement
  stage2Passes: 3        // Number of humanization passes
});
```

## 📊 **API Endpoints**

### **POST /api/humanize/text**

Humanize text using the AI detection evasion pipeline.

**Request Body:**
```json
{
  "text": "Your AI-generated text here",
  "pipeline_type": "comprehensive", // comprehensive, enhanced, fluency, quick
  "education_level": "undergraduate" // elementary, middle, high, undergraduate, graduate
}
```

**Response:**
```json
{
  "original_text": "Original text",
  "humanized_text": "Humanized output",
  "ai_detection_score_before": 0.95,
  "ai_detection_score_after": 0.01,
  "pipeline_result": {
    "stages_completed": ["Paraphrasing", "Humanization", "Enhancement"]
  }
}
```

## 🎯 **How It Works**

### **AI Detection Evasion Techniques**

1. **Pattern Breaking**
   - Removes repetitive AI markers (moreover, furthermore, consequently)
   - Varies sentence structure and length
   - Breaks up long, complex sentences

2. **Human Element Injection**
   - Adds conversational fillers (you know, I mean, basically)
   - Includes parenthetical thoughts and rhetorical questions
   - Uses casual language and personal touches

3. **Flow Enhancement**
   - Adjusts punctuation for natural rhythm
   - Adds ellipses and varied sentence endings
   - Creates conversational connectors

### **Example Transformation**

**Input (AI-generated):**
```
"Furthermore, it is important to note that artificial intelligence demonstrates remarkable capabilities in natural language processing. Moreover, machine learning algorithms require substantial computational resources for optimal performance."
```

**Output (Humanized):**
```
"Well, you know, AI shows pretty impressive abilities when it comes to understanding human language. Plus, ML methods need quite a bit of computer power to get the best results (which makes sense, right?)."
```

## 🚀 **Deployment**

### **Vercel (Recommended)**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: AI detection evasion pipeline"
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables
   - Deploy automatically

### **Other Platforms**

- **Netlify**: Compatible with Next.js
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 🧪 **Testing**

### **Manual Testing**

1. **Use the web interface** at `/humanize`
2. **Test with real AI detectors**:
   - [WriteHuman](https://writehuman.ai/ai-detector)
   - [ZeroGPT](https://www.zerogpt.com/)
   - [SurferSEO](https://surferseo.com/ai-content-detector/)
   - [GPTZero](https://app.gptzero.me/)

### **API Testing**

```bash
curl -X POST http://localhost:3000/api/humanize/text \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your test text here",
    "pipeline_type": "comprehensive"
  }'
```

## 🔍 **Troubleshooting**

### **Common Issues**

1. **Gemini API Rate Limits**
   - The system automatically falls back to local enhancement
   - Check your API quota and billing

2. **Build Errors**
   - Ensure Node.js 18+ is installed
   - Clear `.next` cache: `rm -rf .next`

3. **TypeScript Errors**
   - Run `npm run build` to check for type issues
   - Ensure all dependencies are properly installed

### **Performance Optimization**

- **Pipeline stages** can be disabled for faster processing
- **Local enhancement** works without API calls
- **Caching** can be implemented for repeated patterns

## 🤝 **Contributing**

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Google Gemini** for AI-powered text generation
- **WriteHuman.ai** for inspiration on AI detection patterns
- **Next.js team** for the amazing framework
- **Tailwind CSS** for the beautiful styling system

## 📞 **Support**

- **Issues**: [GitHub Issues](https://github.com/ericytex/rehumanizr/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ericytex/rehumanizr/discussions)
- **Email**: [Your email here]

---

**⭐ Star this repository if it helped you evade AI detection!**

**🎯 Mission**: Make AI-generated content undetectable while preserving meaning and readability.
