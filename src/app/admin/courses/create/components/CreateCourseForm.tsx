"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpenIcon, UserIcon, ClockIcon, GlobeIcon, DollarSignIcon, FileTextIcon, ImageIcon, BarChart3Icon, PlusCircleIcon } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(1, { message: "Course name is required" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters" }),
    image: z.string().url({ message: "Enter a valid image URL" }),
    price: z.preprocess((val) => Number(val) || 0, z.number().min(0, "Price must be a positive number")),
    mentorName: z.string().min(1, { message: "Mentor name is required" }),
    duration: z.string().min(1, { message: "Duration is required" }),
    language: z.string().min(1, { message: "Language is required" }),
    level: z.string().min(1, { message: "Level is required" }),
    isActive: z.boolean().optional().default(true),
});

const CreateCourseForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            image: "",
            price: 0,
            mentorName: "",
            duration: "",
            language: "",
            level: "",
            isActive: true,
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            toast.loading("Creating course...");
            const response = await fetch("/api/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            toast.dismiss();

            if (response.ok) {
                toast.success("Course created successfully!");
                form.reset();
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Course creation failed");
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Something went wrong");
            console.error("Course creation error:", error);
        }
    };

    return (
        <div className="">
            <Card className="bg-white shadow-lg border border-gray-200 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-8 py-6">
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="bg-blue-100 rounded-lg p-2">
                            <BookOpenIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        Course Information
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                        Provide detailed information about your course to help students understand what they&apos;ll learn
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-8 py-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                            {/* Basic Information Section */}
                            <div className="space-y-6">
                                <div className="border-l-4 border-blue-500 pl-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Basic Information</h3>
                                    <p className="text-sm text-gray-600">Essential details about your course</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-gray-700">
                                                <BookOpenIcon className="h-4 w-4 text-gray-500" />
                                                <span>Course Name</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="e.g., React Development Bootcamp" 
                                                    className="border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="mentorName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-gray-700">
                                                <UserIcon className="h-4 w-4 text-gray-500" />
                                                <span>Mentor Name</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="e.g., John Smith" 
                                                    className="border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                                </div>
                            </div>

                            {/* Course Description Section */}
                            <div className="space-y-6">
                                <div className="border-l-4 border-green-500 pl-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Course Content</h3>
                                    <p className="text-sm text-gray-600">Describe what students will learn</p>
                                </div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2 text-gray-700">
                                            <FileTextIcon className="h-4 w-4 text-gray-500" />
                                            <span>Course Description</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                placeholder="Provide a detailed description of what students will learn in this course..."
                                                className="min-h-32 border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100" 
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-500 text-sm">
                                            Write a compelling description that explains the value and content of your course
                                        </FormDescription>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            </div>

                            {/* Media Section */}
                            <div className="space-y-6">
                                <div className="border-l-4 border-purple-500 pl-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Course Media</h3>
                                    <p className="text-sm text-gray-600">Visual representation of your course</p>
                                </div>
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2 text-gray-700">
                                            <ImageIcon className="h-4 w-4 text-gray-500" />
                                            <span>Course Image URL</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="https://example.com/course-image.jpg" 
                                                className="border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100" 
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-500 text-sm">
                                            Provide a direct link to an image that represents your course
                                        </FormDescription>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            </div>

                            {/* Pricing & Details Section */}
                            <div className="space-y-6">
                                <div className="border-l-4 border-orange-500 pl-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Pricing & Details</h3>
                                    <p className="text-sm text-gray-600">Course pricing and duration information</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-gray-700">
                                                <DollarSignIcon className="h-4 w-4 text-gray-500" />
                                                <span>Price</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                                    <Input
                                                        type="number"
                                                        placeholder="299"
                                                        className="pl-8 border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                                                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : "")}
                                                        value={field.value || ""}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-gray-700">
                                                <ClockIcon className="h-4 w-4 text-gray-500" />
                                                <span>Duration</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="e.g., 8 weeks" 
                                                    className="border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                                                            </div>
                            </div>

                            {/* Course Settings Section */}
                            <div className="space-y-6">
                                <div className="border-l-4 border-indigo-500 pl-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Course Settings</h3>
                                    <p className="text-sm text-gray-600">Language and difficulty level</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="language"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-gray-700">
                                                <GlobeIcon className="h-4 w-4 text-gray-500" />
                                                <span>Language</span>
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100">
                                                        <SelectValue placeholder="Select course language" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="English">English</SelectItem>
                                                    <SelectItem value="Spanish">Spanish</SelectItem>
                                                    <SelectItem value="French">French</SelectItem>
                                                    <SelectItem value="German">German</SelectItem>
                                                    <SelectItem value="Chinese">Chinese</SelectItem>
                                                    <SelectItem value="Japanese">Japanese</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="level"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 text-gray-700">
                                                <BarChart3Icon className="h-4 w-4 text-gray-500" />
                                                <span>Difficulty Level</span>
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100">
                                                        <SelectValue placeholder="Select difficulty level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                                                            </div>
                            </div>

                            {/* Submit Section */}
                            <div className="border-t border-gray-200 pt-8">
                                <div className="flex justify-end">
                                    <Button 
                                        type="submit" 
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                                        disabled={form.formState.isSubmitting}
                                    >
                                        {form.formState.isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                Creating Course...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <PlusCircleIcon className="h-5 w-5" />
                                                Create Course
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateCourseForm; 