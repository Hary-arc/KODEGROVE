import { Blog, blogStore } from '../models/index.js';
// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
    try {
        const blogs = await blogStore.findAll();
        const publishedBlogs = blogs.filter((blog) => blog.published === true);
        res.json({
            success: true,
            count: publishedBlogs.length,
            data: publishedBlogs,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving blogs',
        });
    }
};
// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
export const getBlog = async (req, res) => {
    try {
        const blog = await blogStore.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }
        if (!blog.published) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }
        res.json({
            success: true,
            data: blog,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving blog',
        });
    }
};
// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res) => {
    try {
        const authReq = req;
        const blog = new Blog({
            id: crypto.randomUUID(),
            title: req.body.title,
            content: req.body.content,
            authorId: authReq.user.id,
            slug: req.body.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-'),
            tags: req.body.tags || [],
            published: req.body.published || false,
            createdAt: new Date().toISOString(),
        });
        const user = req.user; // ✅ TypeScript knows this exists now
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        // Basic validation
        if (!blog.title) {
            return res.status(400).json({
                success: false,
                errors: ['Title is required'],
            });
        }
        if (!blog.content) {
            return res.status(400).json({
                success: false,
                errors: ['Content is required'],
            });
        }
        if (!blog.tags?.length) {
            return res.status(400).json({
                success: false,
                errors: ['At least one tag is required'],
            });
        }
        await blogStore.create(blog);
        res.status(201).json({
            success: true,
            data: blog,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating blog',
        });
    }
};
// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res) => {
    try {
        let blog = await blogStore.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }
        const updatedBlog = new Blog({
            ...blog,
            title: req.body.title || blog.title,
            content: req.body.content || blog.content,
            slug: req.body.title ? req.body.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-') : blog.slug,
            tags: req.body.tags || blog.tags,
            published: req.body.published ?? blog.published,
        });
        // Basic validation
        if (!updatedBlog.title) {
            return res.status(400).json({
                success: false,
                errors: ['Title is required'],
            });
        }
        if (!updatedBlog.content) {
            return res.status(400).json({
                success: false,
                errors: ['Content is required'],
            });
        }
        if (!updatedBlog.tags?.length) {
            return res.status(400).json({
                success: false,
                errors: ['At least one tag is required'],
            });
        }
        await blogStore.update(blog.id, updatedBlog);
        res.json({
            success: true,
            data: blog,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating blog',
        });
    }
};
// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res) => {
    try {
        const blog = await blogStore.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }
        await blogStore.delete(req.params.id);
        res.json({
            success: true,
            data: {},
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting blog',
        });
    }
};
