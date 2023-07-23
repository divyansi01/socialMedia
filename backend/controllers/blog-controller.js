import blog from "../models/blog";
// import blog from "../models/blog";
import user from "../models/user";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await blog.find();
    } catch (err) {
        console.log(err);
    }

    if (!blogs) {
        return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({ blogs });
}


export const addBlog = async (req, res, next) => {
    const { title, description, image, users } = req.body;
    let existingUser;
    try {
        existingUser = await user.findById({ users });
    } catch (err) {
        return console.log(err);
    }

    if (!existingUser) {
        return res.status(400).json({ message: "unable to find user by this id!" });
    }
    const Blog = new blog({
        title,
        description,
        image,
        users
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await Blog.save({ session });
        existingUser.blogs.push(Blog);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }


    return res.status(200).json({ Blog });
};


export const updateBlog = async (req, res, next) => {
    const blogiD = req.param.id;
    const { title, description } = req.body;
    let Blog;
    try {
        Blog = await blog.findById(blogiD, {
            title, description
        })
    }
    catch (err) {
        console.log(err);
    }

    if (!blog) {
        return res.status(500).json({ message: "Unable to update" });
    }
    return res.status(200).json({ Blog });
};