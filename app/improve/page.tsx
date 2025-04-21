import type { Metadata } from "next"
import ImproveResumeForm from "./improve-resume-form"

export const metadata: Metadata = {
  title: "Improve Your Resume",
  description: "Get professional suggestions to improve your resume",
}

export default function ImprovePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Improve Your Resume</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Upload your resume and our AI will suggest improvements to make it more professional and effective.
      </p>
      <ImproveResumeForm />
    </div>
  )
}
