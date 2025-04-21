import { type NextRequest, NextResponse } from "next/server"

// In a real application, you would fetch this from a database
// For this demo, we'll return mock data
export async function GET(req: NextRequest) {
  // Mock history data
  const history = [
    {
      id: "1234-5678-90ab",
      type: "improve",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      title: "Software Engineer Resume",
    },
    {
      id: "2345-6789-01bc",
      type: "tailor",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      title: "Frontend Developer Resume",
    },
    {
      id: "3456-7890-12cd",
      type: "improve",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      title: "UX Designer Resume",
    },
  ]

  return NextResponse.json({ history })
}
