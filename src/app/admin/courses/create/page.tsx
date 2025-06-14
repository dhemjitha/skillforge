import { PlusCircleIcon, BookOpenIcon } from "lucide-react";
import CreateCourseForm from "./components/CreateCourseForm"; 
import { checkRole } from "../../../../../utils/roles";
import { redirect } from "next/navigation";

export default async function Page() {

    const isAdmin = await checkRole("admin");
    if (!isAdmin) {
        redirect("/");
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* Enhanced Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                                <PlusCircleIcon className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">
                                    Create New Course
                                </h1>
                                <p className="text-blue-100 text-lg max-w-2xl">
                                    Design and launch your next educational experience. Fill in the details below to create a comprehensive course that will engage and educate your students.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Stats or Quick Info */}
                    <div className="bg-gray-50 border-t border-gray-200 px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <BookOpenIcon className="h-4 w-4" />
                                    <span>All fields marked with * are required</span>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">
                                Step 1 of 1
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="pb-12">
                    <CreateCourseForm />
                </div>
            </div>
        </main>
    )
}