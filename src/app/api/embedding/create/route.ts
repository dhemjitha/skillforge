import { NextResponse } from "next/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoose from "mongoose";
import Course from "@/server/infrastructure/schemas/Course";
import { Document } from "@langchain/core/documents";

export async function POST(req: Request) {
    try {

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

        const courses = await Course.find({});

        const docs = courses.map((course) => {
            const { _id, name, description, price, mentorName, duration, language, level, rating, reviews } = course;
            const doc = new Document({
                pageContent: `${name}: ${description} Duration: ${duration}. Language: ${language}. Level: ${level}. Instructor: ${mentorName}. Price: $${price}. Rating: ${rating}. Reviews: ${reviews}`,
                metadata: {
                    _id,
                },
            });
            return doc;
        });

        await vectorIndex.addDocuments(docs);

        return NextResponse.json({ message: "Course embeddings created successfully" });

    } catch (error) {
        console.error("Error creating course embeddings:", error);
        return NextResponse.json(
            { error: "Failed to create course embeddings" },
            { status: 500 }
        );
    }

}