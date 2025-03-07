import User from "../models/User.js";
import Message from "../models/Messages.js";

export const getUser = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not found" });
    }
    const userId = req.userId;
    const user = await User.findById(userId).populate("messages");
    if(!user){
      return res.status(401).json({message: "User not found"});
    }
    res.status(200).json({
      user: {
        username: user.username,
        url: user.url,
        acceptMessages: user.acceptMessages,
        messages: user.messages,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const setAcceptance = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not found" });
    }
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    const acceptMessages = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { acceptMessages: acceptMessages.acceptMessages },
      { new: true }
    );
    res.status(200).json({ acceptMessages: updatedUser?.acceptMessages, message: "Message acceptance updated successfully" });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { username, message } = req.body;

    if (!username || !message) {
      res.status(400).json({ message: "No data provided" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.acceptMessages) {
      return res
        .status(400)
        .json({ message: "User is not accepting messages" });
    }

    const newMessage = new Message({ message });
    await newMessage.save();

    user.messages.push(newMessage._id);
    await user.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const {messageId} = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Message.deleteOne({_id: messageId});

    await User.findByIdAndUpdate(
      userId,
      { $pull: { messages: messageId } }
    );

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const suggestMessage = async (req, res) => {
  try{
const messages = [
  "Believe in yourself and all that you are. You are capable of achieving incredible things.",
  "Stay positive and keep moving forward, even when faced with challenges.",
  "You possess immense strength and determination. Embrace your power and conquer your goals.",
  "Embrace the journey and trust the process. Every step you take brings you closer to your dreams.",
  "Be kind to yourself and others. Your compassion and empathy make the world a better place.",
  "Every day is a new beginning, filled with endless opportunities for growth.",
  "Let your light shine bright, illuminating the path for others.",
  "Chase your dreams with unwavering determination, knowing that you have the power to make them a reality.",
  "Find joy in the little things, for they are often the source of life's greatest happiness.",
  "Live with purpose and passion, pursuing your goals with enthusiasm.",
  "Your potential is limitless. Believe in yourself and unleash your boundless creativity.",
  "Spread love and kindness wherever you go, for it is the greatest gift you can give to others.",
  "Celebrate your progress, no matter how small. Each step forward is a victory worth acknowledging.",
  "Focus on the present moment, for it is where true peace and contentment reside.",
  "Stay true to yourself and your values, even in the face of adversity.",
  "Choose happiness every day, finding joy in the simple pleasures of life.",
  "Find strength in adversity, knowing that challenges are opportunities for growth.",
  "You are stronger than you know. Trust in your inner resilience and face challenges with courage.",
  "Embrace your uniqueness and celebrate what sets you apart.",
  "Take time to rest and recharge, nourishing your mind, body, and soul.",
];




    const suggestions = [];
    const numSuggestions = 3;
    const numMessages = messages.length;

    while (suggestions.length < numSuggestions) {
      const randIndex = Math.floor(Math.random() * numMessages);
      const message = messages[randIndex];
      if (!suggestions.includes(message)) {
        suggestions.push(message);
      }
    }

    res.status(200).json({suggestions});
  }catch(err){
    console.log(err);
    res.status(500).json({error: err.message});
  }
}