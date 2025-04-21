import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-10">Resume AI Assistant</h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Improve Your Resume</CardTitle>
            <CardDescription>Upload your resume and get professional suggestions to improve it.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Our AI will analyze your resume and suggest improvements to make it more professional and effective.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/improve" className="w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Tailor Resume for Job</CardTitle>
            <CardDescription>Customize your resume for a specific job posting.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Upload your resume, job posting, and optional template to get a tailored resume that matches the job
              requirements.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/tailor" className="w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
