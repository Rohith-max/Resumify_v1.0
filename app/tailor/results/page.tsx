"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { jsPDF } from "jspdf"
import { TextAnimation } from "@/components/ui/text-animation"

interface ResultData {
  originalText: string
  jobPostingText: string
  templateText: string | null
  tailoredText: string
  timestamp: string
}

export default function TailorResultsPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("id")
  const [data, setData] = useState<ResultData | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (!sessionId) return

    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/tailor-resume?id=${sessionId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch results")
        }
        const resultData = await response.json()
        setData(resultData)
      } catch (error) {
        console.error("Error fetching results:", error)
        toast({
          title: "Error",
          description: "Failed to load results. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [sessionId, toast])

  const downloadAsPdf = () => {
    if (!data) return

    const doc = new jsPDF()

    // Add title
    doc.setFontSize(16)
    doc.text("Tailored Resume", 20, 20)

    // Add content
    doc.setFontSize(12)

    // Split text into lines to fit on page
    const textLines = doc.splitTextToSize(data.tailoredText, 170)
    doc.text(textLines, 20, 30)

    // Save the PDF
    doc.save("tailored-resume.pdf")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!data) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Results Not Found</h1>
        <p className="mb-6">The requested results could not be found. Please try again.</p>
        <Link href="/tailor">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tailor Resume
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tailored Resume Results</h1>
        <Link href="/tailor">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="tailored" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="tailored">Tailored Resume</TabsTrigger>
          <TabsTrigger value="original">Original Resume</TabsTrigger>
          <TabsTrigger value="job">Job Posting</TabsTrigger>
          {data.templateText && <TabsTrigger value="template">Template</TabsTrigger>}
        </TabsList>

        <TabsContent value="tailored">
          <Card>
            <CardContent className="pt-6">
              <TextAnimation text={data.tailoredText} className="mb-4" speed={10} />
              <Button onClick={downloadAsPdf}>
                <Download className="mr-2 h-4 w-4" />
                Download as PDF
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="original">
          <Card>
            <CardContent className="pt-6">
              <div className="whitespace-pre-wrap">{data.originalText}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="job">
          <Card>
            <CardContent className="pt-6">
              <div className="whitespace-pre-wrap">{data.jobPostingText}</div>
            </CardContent>
          </Card>
        </TabsContent>

        {data.templateText && (
          <TabsContent value="template">
            <Card>
              <CardContent className="pt-6">
                <div className="whitespace-pre-wrap">{data.templateText}</div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
