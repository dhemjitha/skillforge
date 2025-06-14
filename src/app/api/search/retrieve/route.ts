import Course from "@/server/infrastructure/schemas/Course";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/server/infrastructure/db";

export async function GET(req: Request) {
    try {
        
        await connectDB();
        const url = new URL(req.url);
        const query = url.searchParams.get('query');

        if (!query || query === "") {
            const courses = (await Course.find()).map((course) => ({
                course: course,
                confidence: 1,
            }));

            return NextResponse.json(courses);
        }

        const embeddings = new OpenAIEmbeddings({
            model: "text-embedding-ada-002",
            apiKey: process.env.OPENAI_API_KEY,
        });

        const vectorIndex = new MongoDBAtlasVectorSearch(
            embeddings,
            {
                collection: mongoose.connection.collection("courseVector"),
                indexName: "vector_index",
            }
        );

        // First, convert your text query to an embedding vector
        const queryEmbedding = await embeddings.embedQuery(query as string);

        // Then perform the similarity search with the vector and specify how many results to return
        const results = await vectorIndex.similaritySearchVectorWithScore(queryEmbedding, 5); // Return top 5 results
        console.log(results);

        const matchedCourses = await Promise.all(
            results.map(async (result) => {
                const course = await Course.findById(result[0].metadata._id);
                return {
                    course: course,
                    confidence: result[1],
                };
            })
        );

        return NextResponse.json(
            matchedCourses.length > 3 ? matchedCourses.slice(0, 3) : matchedCourses
          );

    } catch (error) {
        return NextResponse.json({ error: "Failed to search for courses" }, { status: 500 });
    }
}