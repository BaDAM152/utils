"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import gsap from "gsap"

interface LoginProps {
  isOpen: boolean
  onClose: () => void
}

export function Login({ isOpen, onClose }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const { toast } = useToast()
  
  const formRef = useRef<HTMLFormElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(dialogRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      )
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLogin && password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please ensure both passwords are the same."
      })
      return
    }

    try {
      // Animate form submission
      gsap.to(formRef.current, {
        scale: 0.95,
        opacity: 0.5,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      })

      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: isLogin ? "Login Successful" : "Signup Successful",
        description: isLogin ? "Welcome back!" : "Your account has been created."
      })
      
      // Animate dialog close
      gsap.to(dialogRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: onClose
      })
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "There was an error processing your request."
      })
    }
  }

  const handleModeSwitch = () => {
    gsap.to(formRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setIsLogin(!isLogin)
        gsap.to(formRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.2
        })
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent ref={dialogRef} className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isLogin ? "Login" : "Sign Up"}
          </DialogTitle>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
          )}

          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <p className="text-center text-sm text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={handleModeSwitch}
                className="ml-1 text-blue-400 hover:text-blue-300 underline transition-colors duration-300"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
