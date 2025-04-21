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

export default function TailorResumeForm() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobPostingFile, setJobPostingFile] = useState<File | null>(null)
  const [templateFile, setTemplateFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!resumeFile || !jobPostingFile) {
      toast({
        title: "Required Fields Missing",
        description: "Please upload both your resume and the job posting to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const formData = new FormData()
    formData.append("resume", resumeFile)
    formData.append("jobPosting", jobPostingFile)
    if (templateFile) {
      formData.append("template", templateFile)
    }

    try {
      const response = await fetch("/api/tailor-resume", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process resume")
      }

      const data = await response.json()

      // Navigate to results page with the session ID
      router.push(`/tailor/results?id=${data.sessionId}`)
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
        <div className="space-y-6">
          <div>
            <Label htmlFor="resume" className="block mb-2">
              Upload Your Resume (TXT only) *
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

          <div>
            <Label htmlFor="jobPosting" className="block mb-2">
              Upload Job Posting (TXT only) *
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input
                id="jobPosting"
                type="file"
                accept=".txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setJobPostingFile(e.target.files[0])
                  }
                }}
              />
              <Label htmlFor="jobPosting" className="cursor-pointer flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-sm font-medium">
                  {jobPostingFile ? jobPostingFile.name : "Click to upload or drag and drop"}
                </span>
                <span className="text-xs text-gray-500 mt-1">TXT files only (max 5MB)</span>
              </Label>
            </div>
          </div>

          <div>
            <Label htmlFor="template" className="block mb-2">
              Upload Template (TXT only, Optional)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input
                id="template"
                type="file"
                accept=".txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setTemplateFile(e.target.files[0])
                  }
                }}
              />
              <Label htmlFor="template" className="cursor-pointer flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-sm font-medium">
                  {templateFile ? templateFile.name : "Click to upload or drag and drop (Optional)"}
                </span>
                <span className="text-xs text-gray-500 mt-1">TXT files only (max 5MB)</span>
              </Label>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Tailor My Resume"
          )}
        </Button>
      </form>
    </Card>
  )
}
