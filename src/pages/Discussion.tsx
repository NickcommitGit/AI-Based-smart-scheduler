
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, MessageCircle, Send, ChevronDown, ChevronUp } from "lucide-react";

interface Reply {
  id: number;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  userReaction: 'like' | 'dislike' | null;
}

interface Discussion {
  id: number;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  category: string;
  likes: number;
  dislikes: number;
  userReaction: 'like' | 'dislike' | null;
  replies: Reply[];
  showReplies: boolean;
}

export const DiscussionSection = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 1,
      title: "How to optimize React performance?",
      content: "I'm working on a large React application and facing performance issues. What are the best practices for optimization?",
      author: "Alex Johnson",
      timestamp: "2 hours ago",
      category: "React",
      likes: 12,
      dislikes: 1,
      userReaction: null,
      showReplies: false,
      replies: [
        {
          id: 1,
          content: "Use React.memo for component memoization and useMemo for expensive calculations.",
          author: "Sarah Wilson",
          timestamp: "1 hour ago",
          likes: 8,
          dislikes: 0,
          userReaction: null
        }
      ]
    },
    {
      id: 2,
      title: "JavaScript async/await vs Promises",
      content: "Can someone explain the difference between async/await and traditional Promise syntax? When should I use each?",
      author: "Mike Chen",
      timestamp: "4 hours ago",
      category: "JavaScript",
      likes: 18,
      dislikes: 0,
      userReaction: null,
      showReplies: false,
      replies: []
    }
  ]);

  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    category: ""
  });

  const [replyInputs, setReplyInputs] = useState<{ [key: number]: string }>({});
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);

  const handleReaction = (discussionId: number, reaction: 'like' | 'dislike', replyId?: number) => {
    setDiscussions(prevDiscussions =>
      prevDiscussions.map(discussion => {
        if (discussion.id === discussionId) {
          if (replyId) {
            // Handle reply reaction
            const updatedReplies = discussion.replies.map(reply => {
              if (reply.id === replyId) {
                const wasLiked = reply.userReaction === 'like';
                const wasDisliked = reply.userReaction === 'dislike';
                
                let newLikes = reply.likes;
                let newDislikes = reply.dislikes;
                let newReaction: 'like' | 'dislike' | null = reaction;

                if (reaction === 'like') {
                  if (wasLiked) {
                    newLikes -= 1;
                    newReaction = null;
                  } else {
                    newLikes += 1;
                    if (wasDisliked) newDislikes -= 1;
                  }
                } else {
                  if (wasDisliked) {
                    newDislikes -= 1;
                    newReaction = null;
                  } else {
                    newDislikes += 1;
                    if (wasLiked) newLikes -= 1;
                  }
                }

                return { ...reply, likes: newLikes, dislikes: newDislikes, userReaction: newReaction };
              }
              return reply;
            });
            return { ...discussion, replies: updatedReplies };
          } else {
            // Handle discussion reaction
            const wasLiked = discussion.userReaction === 'like';
            const wasDisliked = discussion.userReaction === 'dislike';
            
            let newLikes = discussion.likes;
            let newDislikes = discussion.dislikes;
            let newReaction: 'like' | 'dislike' | null = reaction;

            if (reaction === 'like') {
              if (wasLiked) {
                newLikes -= 1;
                newReaction = null;
              } else {
                newLikes += 1;
                if (wasDisliked) newDislikes -= 1;
              }
            } else {
              if (wasDisliked) {
                newDislikes -= 1;
                newReaction = null;
              } else {
                newDislikes += 1;
                if (wasLiked) newLikes -= 1;
              }
            }

            return { ...discussion, likes: newLikes, dislikes: newDislikes, userReaction: newReaction };
          }
        }
        return discussion;
      })
    );
  };

  const handleAddReply = (discussionId: number) => {
    const replyContent = replyInputs[discussionId];
    if (replyContent?.trim()) {
      setDiscussions(prevDiscussions =>
        prevDiscussions.map(discussion => {
          if (discussion.id === discussionId) {
            const newReply: Reply = {
              id: Date.now(),
              content: replyContent,
              author: "You",
              timestamp: "Just now",
              likes: 0,
              dislikes: 0,
              userReaction: null
            };
            return {
              ...discussion,
              replies: [...discussion.replies, newReply],
              showReplies: true
            };
          }
          return discussion;
        })
      );
      setReplyInputs(prev => ({ ...prev, [discussionId]: "" }));
    }
  };

  const handleCreateDiscussion = () => {
    if (newDiscussion.title.trim() && newDiscussion.content.trim()) {
      const discussion: Discussion = {
        id: Date.now(),
        title: newDiscussion.title,
        content: newDiscussion.content,
        author: "You",
        timestamp: "Just now",
        category: newDiscussion.category || "General",
        likes: 0,
        dislikes: 0,
        userReaction: null,
        replies: [],
        showReplies: false
      };
      setDiscussions(prev => [discussion, ...prev]);
      setNewDiscussion({ title: "", content: "", category: "" });
      setShowNewDiscussion(false);
    }
  };

  const toggleReplies = (discussionId: number) => {
    setDiscussions(prevDiscussions =>
      prevDiscussions.map(discussion =>
        discussion.id === discussionId
          ? { ...discussion, showReplies: !discussion.showReplies }
          : discussion
      )
    );
  };

  return (
    <div className="flex-1 bg-gray-900 min-h-screen">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Discussion Forum</h1>
            <Button
              onClick={() => setShowNewDiscussion(!showNewDiscussion)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {showNewDiscussion ? "Cancel" : "Start Discussion"}
            </Button>
          </div>

          {showNewDiscussion && (
            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Start New Discussion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    placeholder="Discussion title..."
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Category (optional)"
                    value={newDiscussion.category}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, category: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Describe your question or topic..."
                    value={newDiscussion.content}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-32"
                  />
                </div>
                <Button
                  onClick={handleCreateDiscussion}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={!newDiscussion.title.trim() || !newDiscussion.content.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Discussion
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-white">{discussion.title}</CardTitle>
                        <Badge variant="secondary" className="bg-orange-500 text-white">
                          {discussion.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>by {discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{discussion.content}</p>
                  <div className="flex items-center space-x-4 mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReaction(discussion.id, 'like')}
                      className={`flex items-center space-x-1 ${
                        discussion.userReaction === 'like' 
                          ? 'text-green-400 hover:text-green-300' 
                          : 'text-gray-400 hover:text-green-400'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{discussion.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReaction(discussion.id, 'dislike')}
                      className={`flex items-center space-x-1 ${
                        discussion.userReaction === 'dislike' 
                          ? 'text-red-400 hover:text-red-300' 
                          : 'text-gray-400 hover:text-red-400'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>{discussion.dislikes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleReplies(discussion.id)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-blue-400"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{discussion.replies.length} replies</span>
                      {discussion.showReplies ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyInputs[discussion.id] || ""}
                        onChange={(e) => setReplyInputs(prev => ({ ...prev, [discussion.id]: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-20"
                      />
                      <Button
                        onClick={() => handleAddReply(discussion.id)}
                        className="bg-orange-500 hover:bg-orange-600 text-white self-end"
                        disabled={!replyInputs[discussion.id]?.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>

                    {discussion.showReplies && discussion.replies.length > 0 && (
                      <div className="pl-4 border-l-2 border-gray-700 space-y-3">
                        {discussion.replies.map((reply) => (
                          <div key={reply.id} className="bg-gray-700 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2 text-sm text-gray-400">
                                <span className="text-gray-300 font-medium">{reply.author}</span>
                                <span>•</span>
                                <span>{reply.timestamp}</span>
                              </div>
                            </div>
                            <p className="text-gray-300 mb-2">{reply.content}</p>
                            <div className="flex items-center space-x-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReaction(discussion.id, 'like', reply.id)}
                                className={`flex items-center space-x-1 ${
                                  reply.userReaction === 'like' 
                                    ? 'text-green-400 hover:text-green-300' 
                                    : 'text-gray-400 hover:text-green-400'
                                }`}
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span>{reply.likes}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReaction(discussion.id, 'dislike', reply.id)}
                                className={`flex items-center space-x-1 ${
                                  reply.userReaction === 'dislike' 
                                    ? 'text-red-400 hover:text-red-300' 
                                    : 'text-gray-400 hover:text-red-400'
                                }`}
                              >
                                <ThumbsDown className="w-3 h-3" />
                                <span>{reply.dislikes}</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
