const Message=require('../Models/messageModel')
const User=require('../Models/userModels')
const Chat=require('../Models/chatModel')

const sendMessage = async (req, res) => {
    try {
      const { content, chatId, userId } = req.body;
      if (!content || !chatId) {
        console.log('Invalid parameters');
        return res.status(400);
      }
      console.log(userId);
      const newMessage = {
        sender: { user: userId },
        content: content,
        chat: chatId,
      };
  
      let message = await Message.create(newMessage);
  
      message = await message.populate('sender.user', 'name')
      message = await message.populate('chat')
  
      message = await User.populate(message, [
        {
          path: 'chat.users.user',
          select: 'name email',
        }
      ]);
  
      console.log(message, 'message');
  
      let data=await Chat.findByIdAndUpdate(chatId, {
        latestMessage: message,
      }, { new: true });
      console.log(data);
  
      res.json(message);
    } catch (error) {
      console.log(error.message);
    }
  };

const allMessages=async(req,res)=>{
    try {
        const message=await Message.find({chat:req.params.chatId}).populate('sender','name email').populate('chat')
        res.json(message)
    } catch (error) {
        console.log(error.message);
    }
}
  

module.exports={
    sendMessage,
    allMessages
}