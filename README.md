# Resume AI Assistant

An AI-powered tool to improve and tailor resumes for job applications. Upload your resume in TXT format and get AI-enhanced versions optimized for specific job postings.

## Features

- **Resume Improvement**: Get professional suggestions to enhance your resume.
- **Resume Tailoring**: Customize your resume for specific job postings.
- **Dark/Light Mode**: Toggle between dark and light themes.
- **Text Animation**: View AI-generated results with a slick typing animation.
- **TXT File Support**: Simplified file handling with .txt files only.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resumify.git
cd resumify
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Groq API key:
```
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

1. Push your code to GitHub (make sure `.env.local` is in your `.gitignore`).

2. Connect your GitHub repository to Vercel.

3. In the Vercel dashboard, add the following environment variables:
   - `GROQ_API_KEY`: Your Groq API key
   - `NEXT_PUBLIC_GROQ_API_KEY`: Your Groq API key

4. Deploy the project.

## Technologies Used

- Next.js
- React
- Tailwind CSS
- Groq AI API
- TypeScript 