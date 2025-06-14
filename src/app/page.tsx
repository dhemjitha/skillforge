"use client"

import React from 'react'
import Hero from '@/components/Hero'
import { SearchProvider } from '@/context/SearchContext'
import CTA from '@/components/CTA'
import Partner from '@/components/Partner'
import CourseListings from '@/components/CourseListings' 
import LetsBuild from '@/components/LetsBuild'
import HeroGeometric from '@/components/hero-geometric'

function Page() {
  return (
    <SearchProvider>
      {/* <Hero /> */}
      <HeroGeometric />
      <Partner />
      <CourseListings />
      <LetsBuild />
      <CTA />
    </SearchProvider>
  )
}

export default Page