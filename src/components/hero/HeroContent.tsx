"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HeroBadge } from "./HeroBadge"
import { HeroTitle } from "./HeroTitle"
import { HeroDescription } from "./HeroDescription"
import { fadeUpVariants } from "./animations"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Sparkles } from "lucide-react"
import { useSearchContext } from "@/context/SearchContext"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import Image from "next/image"

const formSchema = z.object({
  search: z.string().min(1, {
    message: "Please enter a search term",
  }),
})

interface HeroContentProps {
  badge?: string
  title1?: string
  title2?: string
  description?: string
}

export function HeroContent({
  badge = "AI Powered Smart Learning Platform",
  title1 = "Be an Expert",
  title2 = "with an Expert...",
  description,
}: HeroContentProps) {

  const { setSearchQuery, setIsSearching } = useSearchContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search.trim() !== "") {
      setIsSearching(true)
      setSearchQuery(values.search)

      // Scroll to course listings section
      const courseListingsElement = document.getElementById("course-listings")
      if (courseListingsElement) {
        courseListingsElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      }
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
      {/* Left Column - Content */}
      <div className="space-y-8">
        <HeroBadge
          badge={badge}
          custom={0}
          variants={fadeUpVariants}
        />

        <HeroTitle
          title1={title1}
          title2={title2}
          custom={1}
          variants={fadeUpVariants}
        />

        <HeroDescription
          description={description}
          custom={2}
          variants={fadeUpVariants}
        />

        {/* Search Section */}
        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-3 max-w-lg"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-3xl bg-black/10 backdrop-blur-md lg:h-14 rounded-2xl p-2 flex items-center"
            >
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Describe your dream course with additional details"
                        className="flex-grow bg-transparent lg:text-md text-gray-800 placeholder:text-gray-500 border-none outline-none ring-0 ring-offset-0 focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                variant="blue"
                type="submit"
                className="rounded-xl w-auto flex items-center gap-x-2 lg:h-10"
              >
                <Sparkles className="w-5 h-5 animate-pulse text-sky-100" />
                <span className="lg:text-md">AI Search</span>
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>

      {/* Right Column - Image */}
      <motion.div
        custom={4}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-center lg:justify-end"
      >
        <div className="relative">
          <Image src="https://m.media-amazon.com/images/I/71C16D2AKQL.jpg" alt="nothing" width={1000} height={805} className="rounded-2xl " />
          {/* Optional: Add floating elements around the image */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/20 rounded-full"></div>
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-600/10 rounded-full"></div>
          <div className="absolute top-1/2 -left-8 w-6 h-6 bg-blue-400/30 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  )
} 