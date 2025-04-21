import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// In-memory storage for demo purposes
// In a production app, you would use a database
const sessions: Record<
  string,
  {
    originalText: string
    jobPostingText: string
    templateText: string | null
    tailoredText: string
    timestamp: Date
  }
> = {}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const resumeFile = formData.get("resume") as File
    const jobPostingFile = formData.get("jobPosting") as File
    const templateFile = formData.get("template") as File | null

    if (!resumeFile || !jobPostingFile) {
      return NextResponse.json({ error: "Resume and job posting files are required" }, { status: 400 })
    }

    // Read the files
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer())
    const jobPostingBuffer = Buffer.from(await jobPostingFile.arrayBuffer())

    // For this demo, we'll assume the files are text-based
    const resumeText = resumeBuffer.toString("utf-8")
    const jobPostingText = jobPostingBuffer.toString("utf-8")

    let templateText = null
    if (templateFile) {
      const templateBuffer = Buffer.from(await templateFile.arrayBuffer())
      templateText = templateBuffer.toString("utf-8")
    }

    // Generate a session ID
    const sessionId = uuidv4()

    // Mock tailored text for testing purposes
    const tailoredText = `TAILORED RESUME FOR THE JOB:
    
${resumeText}

JOB POSTING REQUIREMENTS:
${jobPostingText.substring(0, 200)}...

${templateText ? 'USING PROVIDED TEMPLATE FORMAT' : 'USING STANDARD FORMAT'}

TAILORING NOTES:
- Aligned skills with job requirements
- Emphasized relevant experience
- Matched keywords from job posting
- This is a mock response for testing file upload functionality
`

    // Store the session data
    sessions[sessionId] = {
      originalText: resumeText,
      jobPostingText,
      templateText,
      tailoredText,
      timestamp: new Date(),
    }

    return NextResponse.json({ sessionId })
  } catch (error) {
    console.error("Error processing resume:", error)
    return NextResponse.json({ error: "Failed to process resume" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.searchParams.get("id")

  if (!id || !sessions[id]) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 })
  }

  return NextResponse.json(sessions[id])
}
