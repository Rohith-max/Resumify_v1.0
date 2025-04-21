# GitHub and Vercel Deployment Instructions

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "resumify" or "resume-ai-assistant")
4. Keep it public or private as per your preference 
5. Click "Create repository"

## Step 2: Push Your Code to GitHub

Run these commands in your terminal:

```bash
# After you've already run git init, git add ., and git commit

# Add the GitHub repository as your remote
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git

# Push your code to GitHub
git push -u origin master
```

## Step 3: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in (create an account if needed)
2. Click "Add New..." and select "Project"
3. Connect your GitHub account if not already connected
4. Select the repository you just created
5. In the configuration screen:
   - Framework Preset should be automatically detected as "Next.js"
   - Leave the build settings as default
   - Click on "Environment Variables" and add:
     - Name: `GROQ_API_KEY` | Value: [your Groq API key]
     - Name: `NEXT_PUBLIC_GROQ_API_KEY` | Value: [your Groq API key]
6. Click "Deploy"

Vercel will automatically build and deploy your application. Once it's done, you'll get a URL where your app is deployed.

## Important Notes:

- Your `.env.local` file with API keys is not pushed to GitHub because it's in `.gitignore`
- If you make changes to your code and push them to GitHub, Vercel will automatically redeploy
- If you add or change environment variables, you'll need to update them in the Vercel dashboard 