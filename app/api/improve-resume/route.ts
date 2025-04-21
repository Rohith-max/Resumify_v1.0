import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// In-memory storage for demo purposes
// In a production app, you would use a database
const sessions: Record<
  string,
  {
    originalText: string
    improvedText: string
    timestamp: Date
  }
> = {}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const resumeFile = formData.get("resume") as File

    if (!resumeFile) {
      return NextResponse.json({ error: "Resume file is required" }, { status: 400 })
    }

    // Read the resume file
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer())

    // For this demo, we'll assume the file is text-based
    const resumeText = resumeBuffer.toString("utf-8")

    // Generate a session ID
    const sessionId = uuidv4()

    // Mock improved text for testing purposes
    const improvedText = `IMPROVED VERSION OF YOUR RESUME:
    
${resumeText}

IMPROVEMENT NOTES:
- Added more professional formatting
- Enhanced achievement descriptions
- Improved overall structure
- This is a mock response for testing file upload functionality
`

    // Store the session data
    sessions[sessionId] = {
      originalText: resumeText,
      improvedText,
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
