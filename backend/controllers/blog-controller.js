import blog from "../models/blog";
// import blog from "../models/blog";

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
    const { title, description, image, user } = req.body;

    const Blog = new blog({
        title,
        description,
        image,
        user
    });

    try {
        await Blog.save();
    } catch (err) {
        console.log(err);
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