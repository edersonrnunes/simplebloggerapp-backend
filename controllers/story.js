import { Story } from "../models/story.js";

export const addStory = async (req, res) => {
  try {
    // Validate that required fields (e.g., title and content) are present in the request body
    const { title, summary, content, image } = req.body;

    if (!title || !summary || !content) {
      return res.status(400).json({
        error: "Title, Summary and Content are required",
      });
    }

    // Create a new Story instance with the request data
    const newStory = new Story({
      author: req.user._id,
      title,
      summary,
      content,
      image:
        image ||
        "https://thersilentboy.com/wp-content/uploads/2022/09/Blogging.jpeg",
    });

    // Save the new story to the database
    await newStory.save();

    return res.status(201).json({
      message: "Story added successfully",
      data: newStory,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllStories = async (req, res) => {
  try {
    // Fetch all stories from your database (assuming you have a "Story" model)
    const stories = await Story.find();

    if (!stories) {
      return res.status(404).json({
        message: "No stories found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All stories retrieved successfully",
      data: stories,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getStoryById = async (req, res) => {
  try {
    const storyId = req.params.id; // Assuming the story ID is provided as a route parameter

    // Fetch the story by ID from your database (assuming you have a "Story" model)
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Story retrieved successfully",
      data: story,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editStory = async (req, res) => {
  try {
    // Get the story ID from the route parameters
    const storyId = req.params.id;

    // Get the updated story data from the request body
    const { title, summary, content, image } = req.body;

    // Validate input types to prevent NoSQL injection
    const fieldsToUpdate = {};
    if (title !== undefined) {
      if (typeof title !== "string") {
        return res.status(400).json({ error: "Invalid type for title" });
      }
      fieldsToUpdate.title = title;
    }
    if (summary !== undefined) {
      if (typeof summary !== "string") {
        return res.status(400).json({ error: "Invalid type for summary" });
      }
      fieldsToUpdate.summary = summary;
    }
    if (content !== undefined) {
      if (typeof content !== "string") {
        return res.status(400).json({ error: "Invalid type for content" });
      }
      fieldsToUpdate.content = content;
    }
    if (image !== undefined) {
      if (typeof image !== "string") {
        return res.status(400).json({ error: "Invalid type for image" });
      }
      fieldsToUpdate.image = image;
    }

    // Find the story by ID and update its properties, using $set to prevent operator injection
    const updatedStory = await Story.findByIdAndUpdate(
      storyId,
      { $set: fieldsToUpdate },
      { new: true }
    );

    if (!updatedStory) {
      return res.status(404).json({
        message: "Story not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Story updated successfully",
      data: updatedStory,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteStory = async (req, res) => {
  try {
    // Get the story ID from the route parameters
    const storyId = req.params.id;

    // Find the story by ID and delete it
    const deletedStory = await Story.findByIdAndRemove(storyId);

    if (!deletedStory) {
      return res.status(404).json({
        message: "Story not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Story deleted successfully",
      data: deletedStory,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
