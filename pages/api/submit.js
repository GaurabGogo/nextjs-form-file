import User from "@/models/User"; // Import the User model
import connectToDatabase from "@/lib/dbConnect"; // Ensure the database connection is imported

export default async function handler(req, res) {
  await connectToDatabase(); // Ensure database is connected

  if (req.method === "POST") {
    try {
      // Create a new user object
      const newUser = new User({ firstName: "John" });
      console.log("New user object:", newUser);
      const savedUser = await newUser.save();

      // Respond with success status and the saved user data
      return res.status(201).json({ success: true, user: savedUser });
    } catch (error) {
      console.error("Error saving user:", error);
      return res.status(500).json({
        success: false,
        message: "Error saving user",
      });
    }
  } else if (req.method === "GET") {
    try {
      // Return a list of all users
      const users = await User.find();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching users",
      });
    }
  } else {
    // Method not allowed
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
}
