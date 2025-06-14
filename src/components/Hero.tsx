"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Sparkles } from "lucide-react"
import { useSearchContext } from "@/context/SearchContext"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Image from "next/image"

const formSchema = z.object({
  search: z.string().min(1, {
    message: "Please enter a search term",
  }),
})

function Hero() {
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
    <div id="home-section" className='bg-lightkblue'>
      <div className="sm:pb-24 max-w-7xl mx-auto px-6 lg:px-8">

        <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1'>

          <div className='col-span-6 flex flex-col justify-evenly'>
            <div className='flex gap-2 mx-auto lg:mx-0'>
              <Image src="/assets/banner/check.svg" alt="check-image" width={20} height={20} />
              <h3 className='text-kellygreen text-sm font-semibold text-center lg:text-start'>Get 30% off on first enroll</h3>
            </div>
            <h1 className='text-midnightblue text-4xl sm:text-5xl font-semibold text-center lg:text-start lh-120 pt-5 lg:pt-0'>Advance your engineering skills with us.</h1>
            <h3 className='text-charcoal text-lg font-normal text-center lg:text-start opacity-75 pt-5 lg:pt-0'>Build skills with our courses and mentor from world-class companies.</h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-3xl bg-black/10 backdrop-blur-md lg:h-16 rounded-2xl p-2 flex items-center"
              >
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Describe your dream destination, experience or hotel..."
                          className="flex-grow bg-transparent lg:text-lg text-gray-800 placeholder:text-gray-500 border-none outline-none ring-0 ring-offset-0 focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="rounded-xl w-auto md:w-48 flex items-center gap-x-2 lg:h-12 bg-blue-500 hover:bg-blue-600"
                >
                  <Sparkles className="w-5 h-5 animate-pulse text-sky-100" />
                  <span className="lg:text-lg">AI Search</span>
                </Button>
              </form>
            </Form>

            <div className='flex items-center justify-between pt-10 lg:pt-4'>
              <div className='flex gap-2'>
                <Image src="/assets/banner/check-circle.svg" alt="check-image" width={30} height={30} className='smallImage' />
                <p className='text-sm sm:text-lg font-normal text-black'>Flexible</p>
              </div>
              <div className='flex gap-2'>
                <Image src="/assets/banner/check-circle.svg" alt="check-image" width={30} height={30} className='smallImage' />
                <p className='text-sm sm:text-lg font-normal text-black'>Learning path</p>
              </div>
              <div className='flex gap-2'>
                <Image src="/assets/banner/check-circle.svg" alt="check-image" width={30} height={30} className='smallImage' />
                <p className='text-sm sm:text-lg font-normal text-black'>Community</p>
              </div>
            </div>
          </div>

          <div className='col-span-6 flex justify-center'>
            <Image src="/assets/banner/mahila.png" alt="nothing" width={1000} height={805} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero