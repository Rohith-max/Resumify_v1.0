"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface HistoryItem {
  id: string
  type: "improve" | "tailor"
  timestamp: string
  title: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/history")
        if (!response.ok) {
          throw new Error("Failed to fetch history")
        }
        const data = await response.json()
        setHistory(data.history)
      } catch (error) {
        console.error("Error fetching history:", error)
        toast({
          title: "Error",
          description: "Failed to load history. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [toast])

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Resume History</h1>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="improve">Improved Resumes</TabsTrigger>
          <TabsTrigger value="tailor">Tailored Resumes</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-4">
            {history.length === 0 ? (
              <p className="text-center py-10 text-gray-500">No resume history found.</p>
            ) : (
              history.map((item) => <HistoryCard key={item.id} item={item} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="improve">
          <div className="grid gap-4">
            {history.filter((item) => item.type === "improve").length === 0 ? (
              <p className="text-center py-10 text-gray-500">No improved resumes found.</p>
            ) : (
              history.filter((item) => item.type === "improve").map((item) => <HistoryCard key={item.id} item={item} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="tailor">
          <div className="grid gap-4">
            {history.filter((item) => item.type === "tailor").length === 0 ? (
              <p className="text-center py-10 text-gray-500">No tailored resumes found.</p>
            ) : (
              history.filter((item) => item.type === "tailor").map((item) => <HistoryCard key={item.id} item={item} />)
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function HistoryCard({ item }: { item: HistoryItem }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{new Date(item.timestamp).toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {item.type === "improve" ? "Improved Resume" : "Tailored Resume"}
            </span>
          </div>
          <Link href={`/${item.type}/results?id=${item.id}`}>
            <Button size="sm">
              View
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
