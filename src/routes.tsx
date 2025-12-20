import { createBrowserRouter, Navigate } from "react-router";
import ChatLayout from "./components/layout/ChatLayout";
import ChatConversation from "./pages/ChatConversation";
import NewChat from "./pages/NewChat";

export const router = createBrowserRouter([
  {
    path: "/chat",
    Component: ChatLayout,
    children: [
      {
        path: "new",
        Component: NewChat,
      },
      {
        path: ":conversationId",
        Component: ChatConversation,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/chat/new" replace />,
  },
]);
