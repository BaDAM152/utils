"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Upload, X } from "lucide-react"
import gsap from "gsap"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

interface FileUploadProps {
  isOpen: boolean
  onClose: () => void
}

export function FileUpload({ isOpen, onClose }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
    gsap.to(dropZoneRef.current, {
      scale: 1.05,
      borderColor: "#6366f1",
      duration: 0.2,
      ease: "power1.out"
    })
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    gsap.to(dropZoneRef.current, {
      scale: 1,
      borderColor: "#374151",
      duration: 0.2,
      ease: "power1.out"
    })
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    gsap.to(dropZoneRef.current, {
      scale: 1,
      borderColor: "#374151",
      duration: 0.2,
      ease: "power1.out"
    })

    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(droppedFiles)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(selectedFiles)
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please select files to upload"
      })
      return
    }

    if (!acceptedTerms) {
      toast({
        variant: "destructive",
        title: "Terms not accepted",
        description: "Please accept our terms of use before uploading"
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const duration = 2000
    const interval = 50
    const steps = duration / interval
    let progress = 0

    const progressInterval = setInterval(() => {
      progress += 100 / steps
      setUploadProgress(Math.min(progress, 100))

      if (progress >= 100) {
        clearInterval(progressInterval)
        setIsUploading(false)
        toast({
          title: "Upload Successful",
          description: `${files.length} file${files.length > 1 ? 's' : ''} uploaded successfully`
        })
        setFiles([])
        onClose()
      }
    }, interval)
  }

  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 1 },
        {
          scale: 1.1,
          yoyo: true,
          repeat: -1,
          duration: 0.5,
          ease: "power1.inOut"
        }
      )
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Upload Files
          </DialogTitle>
        </DialogHeader>

        <div
          ref={dropZoneRef}
          className={`mt-4 p-6 border-2 border-dashed border-gray-700 rounded-lg transition-colors
            ${isDragging ? 'border-indigo-500 bg-gray-800/50' : 'border-gray-700 bg-gray-800'}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <Upload className="w-12 h-12 text-gray-400" />
            <div className="text-center">
              <p className="text-gray-300">Drag and drop your files here, or</p>
              <label className="mt-2 cursor-pointer">
                <span className="text-blue-400 hover:text-blue-300">browse</span>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileSelect}
                />
              </label>
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-400">Selected files:</p>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                <span className="text-sm truncate">{file.name}</span>
                <button
                  onClick={() => {
                    gsap.to(`.file-${index}`, { opacity: 0, x: 50, duration: 0.3, ease: "power2.out" })
                    setTimeout(() => setFiles(files.filter((_, i) => i !== index)), 300)
                  }}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {isUploading && (
          <div className="mt-4 space-y-2">
            <Progress value={uploadProgress} className="h-2 bg-gray-700 [&>div]:bg-white" />
            <p className="text-sm text-gray-400 text-center">{Math.round(uploadProgress)}%</p>
          </div>
        )}

        <div className="mt-4 flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
            className="border-white data-[state=checked]:bg-white data-[state=checked]:text-gray-900"
          />
          <label 
            htmlFor="terms" 
            className="text-sm text-gray-300"
          >
            I agree to the{" "}
            <Link href="/terms" className="text-blue-400 hover:text-blue-300">
              terms of use
            </Link>
          </label>
        </div>

        <div className="mt-4">
          <Button
            ref={buttonRef}
            onClick={handleUpload}
            disabled={isUploading || files.length === 0 || !acceptedTerms}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
