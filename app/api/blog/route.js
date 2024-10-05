import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
import { writeFile } from "fs/promises";
const fs = require("fs");

const LoadDB = async () => {
    await ConnectDB();
}
LoadDB();

export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get("id");
    if(blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog)
    }else{
        const blogs = await BlogModel.find({});
        return NextResponse.json({blogs});
    }
    
}

export async function POST(request) {

        const formData = await request.formData();
        const timestamp = Date.now();
        
        const image = formData.get("image");
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);

        const path = `./public/${timestamp}_${image.name}`;
        await writeFile(path, buffer);

        const imgUrl = `/${timestamp}_${image.name}`;
        console.log(imgUrl);
        const blogData = {
            title:`${formData.get("title")}`,
            description:`${formData.get("description")}`,
            category:`${formData.get("category")}`,
            author:`${formData.get("author")}`,
            image: `${imgUrl}`,
            author_img: formData.get("author_img") || "/Assets/blog_pic_1.png",
        }
        await BlogModel.create(blogData);
        console.log("Blog created successfully");

        return NextResponse.json({ success:true,msg:"Blog Added" });
   
}

//Creating API Endpoint to delete blog

export async function DELETE(request) {

    const blogId = request.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(blogId);
    fs.unlink(`./public/${blog.image}`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    })
    await BlogModel.findByIdAndDelete(blogId);

    return NextResponse.json({ success:true,msg:"Blog Deleted" });

}
