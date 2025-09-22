import { useEffect, useRef, useState } from "react"
import { motion, useSpring } from "framer-motion"

const HorizontalScroller = ({ steps }: { steps: any[] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  // Smooth spring animation for horizontal translation
  const x = useSpring(0, { stiffness: 120, damping: 20 })

  useEffect(() => {
    if (!containerRef.current) return
    const stepWidth = containerRef.current.clientWidth
    x.set(-activeStep * stepWidth) // animate to active step
  }, [activeStep, x])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const inView = rect.top <= 0 && rect.bottom > window.innerHeight
      if (!inView) return // only trigger inside viewport

      // --- Release at boundaries ---
      if (activeStep === 0 && e.deltaY < 0) return // allow upward scroll
      if (activeStep === steps.length - 1 && e.deltaY > 0) return // allow downward scroll

      // --- Lock & control horizontal navigation ---
      e.preventDefault()

      if (e.deltaY > 0) {
        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
      } else {
        setActiveStep((prev) => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [activeStep, steps.length])

  return (
    <div className="relative h-screen overflow-hidden" ref={containerRef}>
      <motion.div
        style={{ x }}
        className="flex h-full"
      >
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-screen h-full flex items-center justify-center"
          >
            {step}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default HorizontalScroller
