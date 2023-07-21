import express from 'express';
import { addBlog, getAllBlogs, updateBlog } from '../controllers/blog-controller';

const blogrouter = express.Router();

blogrouter.get("/", getAllBlogs);
blogrouter.post("/add", addBlog);
blogrouter.put("/update/:id", updateBlog);

export default blogrouter;

