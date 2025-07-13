## AI Mock Interview
This is an AI-powered mock interview application built with Next.js. It generates interview questions, records your video and audio responses, and provides feedback at the end to improve your preparation.

## 🛠️ Getting Started
Follow these steps to run the project locally:

1. Clone the repository
bash
Copy
Edit
git clone https://github.com/yourusername/ai-mock-interview.git
cd ai-mock-interview
2. Install dependencies
Make sure you have Node.js (18 or above) installed. Then install the required node modules:

bash
Copy
Edit
npm install
# or
yarn install
# or
pnpm install
3. Set up environment variables
Create a .env.local file in the root directory with the following fields:

ini
Copy
Edit
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_DRIZZLE_DB_URL=your_postgresql_database_url

NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key

NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=5

NEXT_PUBLIC_INFORMATON="Enable Video Web Cam and Microphone to start your AI Generated Mock Interview. It has 5 question which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, you can disable the webcam at any time you want"

NEXT_PUBLIC_QUESTION_NOTE=Click on Record Answer when you wnat to answer the question. At the end of the interview we will give you the feedback along with correct answer for each question and your answer to compare it.
## 🔑 How to get these keys:
Clerk Keys (Authentication)

Go to Clerk Dashboard

Create a new application

Get your Publishable Key and Secret Key from the API Keys section.

PostgreSQL Database URL

You can use a hosted database like Neon or Supabase.

Create a new project and obtain the connection string (URL) for your database.

Google Gemini API Key

Go to Google AI Studio

Create a project, enable the Gemini API, and generate your API key.

4. Run the development server
bash
Copy
Edit
npm run dev
# or
yarn dev
# or
pnpm dev
Open http://localhost:3005 with your browser to see the result.

## ⚙️ Project Structure
Uses Next.js App Router with app/page.js

Authentication via Clerk

Database connected via Drizzle ORM + Neon PostgreSQL

AI question generation and evaluation via Google Gemini API

Video & audio recording via browser APIs

## 🚀 Deployment
The easiest way to deploy this Next.js app is to use Vercel, the creators of Next.js. Make sure to add the above environment variables in your Vercel project settings before deployment.

## 📚 Learn More
Next.js Documentation – learn about Next.js features and API.

Clerk Documentation – authentication setup and management.

Google Gemini API – for AI integration.

## 💡 Notes
✔️ Enable webcam and microphone for full mock interview experience.
✔️ Your videos are never recorded or saved.
✔️ You can disable webcam anytime during the interview.

## 👤 Author
Developed by Abhinav Gaur
