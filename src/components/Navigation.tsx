'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { BookOpen, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { user } = useUser();

    return (
        <nav className="z-50 bg-white flex items-center justify-between md:px-8 py-4 shadow-sm max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center space-x-8">
                <Link href="/">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">SkillForge</span>
                    </div>
                </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
                <Link href="#" className="text-black hover:text-blue-500 transition-colors">
                    Home
                </Link>
                <Link href="#course-listings" className="text-black hover:text-blue-500 transition-colors">
                    Courses
                </Link>
                <Link href="#" className="text-black hover:text-blue-500 transition-colors">
                    About us
                </Link>
                <Link href="#" className="text-black hover:text-blue-500 transition-colors">
                    Contact
                </Link>
            </div>

            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-gray-800">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
                <SignedOut>
                    <Button variant="ghost" asChild>
                        <Link href="/sign-in">Login</Link>
                    </Button>
                    <Button asChild variant="blue" className="text-white px-4 py-2 rounded-lg text-sm">
                        <Link href="/sign-up">Sign up</Link>
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton appearance={{
                        elements: {
                            rootBox: "w-full text-center"
                        }
                    }} />
                    <Button asChild variant="blue" className="text-white px-4 py-2 rounded-lg text-sm">
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                </SignedIn>
            </div>

            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 flex flex-col bg-white p-4 z-50 shadow-md space-y-4">

                    <Link href="#" className="text-black hover:text-blue-500 transition-colors">Home</Link>
                    <Link href="#course-listings" className="text-black hover:text-blue-500 transition-colors">Courses</Link>
                    <Link href="#" className="text-black hover:text-blue-500 transition-colors">About us</Link>
                    <Link href="#" className="text-black hover:text-blue-500 transition-colors">Contact</Link>

                    <SignedOut>
                        <Button variant="ghost" asChild className="mb-3 text-gray-600" onClick={toggleMenu}>
                            <Link href="/sign-in">Login</Link>
                        </Button>
                        <Button asChild onClick={toggleMenu} variant="blue" className="text-white">
                            <Link href="/sign-up">Sign up</Link>
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton appearance={{
                            elements: {
                                rootBox: "w-full flex mt-4 mb-4"
                            }
                        }} />
                        <Button asChild onClick={toggleMenu} variant="blue" className="text-white">
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                    </SignedIn>
                </div>
            )}
        </nav>
    );
}

export default Navigation;