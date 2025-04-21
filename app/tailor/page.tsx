import type { Metadata } from "next"
import TailorResumeForm from "./tailor-resume-form"

export const metadata: Metadata = {
  title: "Tailor Resume for Job",
  description: "Customize your resume for a specific job posting",
}

export default function TailorPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tailor Resume for Job</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Upload your resume, job posting, and optional template to get a tailored resume that matches the job
        requirements.
      </p>
      <TailorResumeForm />
    </div>
  )
}
