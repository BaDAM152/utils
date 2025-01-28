"use client"

import { Button } from "@/components/ui/button"
import { Upload, Flame } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-gradient-to-b from-background to-muted p-6 sm:p-12 md:p-16">
      <main className="flex flex-col items-center justify-center space-y-10 row-start-2">
        <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          HUKUM
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <Button size="lg" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Upload Images</span>
          </Button>
          <Button variant="secondary" size="lg" className="flex items-center gap-2"
          onClick={() => router.push('/team')}>
            <Flame className="w-4 h-4" />
            <span>View Team</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
