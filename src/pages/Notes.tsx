
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ThumbsUp, ThumbsDown, Upload, FileText } from "lucide-react";

interface Note {
  id: number;
  title: string;
  content: string;
  author: string;
  likes: number;
  dislikes: number;
  userReaction: 'like' | 'dislike' | null;
}

export const NotesSection = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      content: "Understanding variables, functions, and scope in JavaScript...",
      author: "John Doe",
      likes: 15,
      dislikes: 2,
      userReaction: null
    },
    {
      id: 2,
      title: "React Hooks Guide",
      content: "A comprehensive guide to useState, useEffect, and custom hooks...",
      author: "Jane Smith",
      likes: 23,
      dislikes: 1,
      userReaction: null
    }
  ]);

  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [activeTab, setActiveTab] = useState<'view' | 'upload'>('view');

  const handleReaction = (noteId: number, reaction: 'like' | 'dislike') => {
    setNotes(prevNotes =>
      prevNotes.map(note => {
        if (note.id === noteId) {
          const wasLiked = note.userReaction === 'like';
          const wasDisliked = note.userReaction === 'dislike';
          
          let newLikes = note.likes;
          let newDislikes = note.dislikes;
          let newReaction: 'like' | 'dislike' | null = reaction;

          if (reaction === 'like') {
            if (wasLiked) {
              newLikes -= 1;
              newReaction = null;
            } else {
              newLikes += 1;
              if (wasDisliked) {
                newDislikes -= 1;
              }
            }
          } else {
            if (wasDisliked) {
              newDislikes -= 1;
              newReaction = null;
            } else {
              newDislikes += 1;
              if (wasLiked) {
                newLikes -= 1;
              }
            }
          }

          return {
            ...note,
            likes: newLikes,
            dislikes: newDislikes,
            userReaction: newReaction
          };
        }
        return note;
      })
    );
  };

  const handleUploadNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        author: "You",
        likes: 0,
        dislikes: 0,
        userReaction: null
      };
      setNotes(prevNotes => [note, ...prevNotes]);
      setNewNote({ title: "", content: "" });
      setActiveTab('view');
    }
  };

  return (
    <div className="flex-1 bg-gray-900 min-h-screen">
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Learn & Test</h1>
            <div className="flex space-x-2">
              <Button
                onClick={() => setActiveTab('view')}
                variant={activeTab === 'view' ? 'default' : 'outline'}
                className={activeTab === 'view' ? 'bg-orange-500 hover:bg-orange-600' : 'text-gray-300 border-gray-600 hover:bg-gray-800'}
              >
                <FileText className="w-4 h-4 mr-2" />
                View Notes
              </Button>
              <Button
                onClick={() => setActiveTab('upload')}
                variant={activeTab === 'upload' ? 'default' : 'outline'}
                className={activeTab === 'upload' ? 'bg-orange-500 hover:bg-orange-600' : 'text-gray-300 border-gray-600 hover:bg-gray-800'}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Note
              </Button>
            </div>
          </div>

          {activeTab === 'upload' && (
            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Upload New Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <Input
                    placeholder="Enter note title..."
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content
                  </label>
                  <Textarea
                    placeholder="Write your note content here..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-32"
                  />
                </div>
                <Button 
                  onClick={handleUploadNote}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={!newNote.title.trim() || !newNote.content.trim()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Note
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6">
            {notes.map((note) => (
              <Card key={note.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{note.title}</CardTitle>
                    <span className="text-sm text-gray-400">by {note.author}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{note.content}</p>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReaction(note.id, 'like')}
                      className={`flex items-center space-x-1 ${
                        note.userReaction === 'like' 
                          ? 'text-green-400 hover:text-green-300' 
                          : 'text-gray-400 hover:text-green-400'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{note.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReaction(note.id, 'dislike')}
                      className={`flex items-center space-x-1 ${
                        note.userReaction === 'dislike' 
                          ? 'text-red-400 hover:text-red-300' 
                          : 'text-gray-400 hover:text-red-400'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>{note.dislikes}</span>
                    </Button>
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
