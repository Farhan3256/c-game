# CodeCraft

CodeCraft is a modern, gamified learning platform for C++ featuring 3D voxel graphics and AI-powered tutoring.

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **3D**: React Three Fiber (Three.js)
- **AI**: Google Gemini API (@google/genai)
- **Auth**: Firebase (Mocked for demo)

## Quick Start

1. Install dependencies:
   ```bash
   npm install react react-dom three @types/three @react-three/fiber @react-three/drei lucide-react @google/genai
   ```

2. Configure Environment Variables:
   Create a `.env` file in the root:
   ```env
   # Get this from Google AI Studio
   API_KEY=your_gemini_api_key_here
   
   # Firebase Config (Optional for demo, required for auth)
   REACT_APP_FIREBASE_API_KEY=...
   ```

3. Run locally:
   ```bash
   npm start
   ```

## Production Deployment (Vercel)

1. Push code to GitHub.
2. Import project into Vercel.
3. Add `API_KEY` to Vercel Environment Variables.
4. Deploy.

## Notes on 3D Performance
The `VoxelScene` component is lazy-loaded using `React.Suspense`. It uses procedural geometry to avoid loading heavy external `.glb` models, ensuring fast FCP (First Contentful Paint).

## AI Integration
The `AITutor` component uses the Gemini 2.5 Flash model for low-latency feedback on code snippets.