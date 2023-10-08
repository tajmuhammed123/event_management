import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { ChatState } from "./Components/Context/ChatProvider";
import SideDrawer from "./Components/miscellaneous/SideDrawer";
import MyChats from "./Components/MyChats";
import Chatbox from "./Components/Chatbox";

const ChatList = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatList;
