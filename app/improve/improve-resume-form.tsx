"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ImproveResumeForm() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!resumeFile) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const formData = new FormData()
    formData.append("resume", resumeFile)

    try {
      const response = await fetch("/api/improve-resume", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process resume")
      }

      const data = await response.json()

      // Navigate to results page with the session ID
      router.push(`/improve/results?id=${data.sessionId}`)
    } catch (error) {
      console.error("Error processing resume:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process resume",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Label htmlFor="resume" className="block mb-2">
            Upload Your Resume (TXT only)
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Input
              id="resume"
              type="file"
              accept=".txt"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setResumeFile(e.target.files[0])
                }
              }}
            />
            <Label htmlFor="resume" className="cursor-pointer flex flex-col items-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <span className="text-sm font-medium">
                {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
              </span>
              <span className="text-xs text-gray-500 mt-1">TXT files only (max 5MB)</span>
            </Label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Improve My Resume"
          )}
        </Button>
      </form>
    </Card>
  )
}
