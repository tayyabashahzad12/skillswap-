import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDatabase } from '../context/DatabaseContext';
import { Send, Image, Paperclip, Mic, Smile, ShieldAlert, Sparkles, MessageSquare, AlertCircle, Bot, Video } from 'lucide-react';

export default function Chat({ selectedChatUser, setSelectedChatUser }) {
  const { currentUser } = useAuth();
  const { chats, sendMessage, getOrCreateConversation, users, bookings } = useDatabase();
  const [messageText, setMessageText] = useState('');
  
  // Simulated attachment types
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  const chatEndRef = useRef(null);

  if (!currentUser) return null;

  // Active chats involving currentUser
  const myChats = chats.filter(c => c.participants.includes(currentUser.id));

  // Find partner for each chat
  const chatList = myChats.map(c => {
    const partnerId = c.participants.find(p => p !== currentUser.id);
    const partner = users.find(u => u.id === partnerId);
    return {
      chatId: c.id,
      partner,
      lastMessage: c.messages[c.messages.length - 1]
    };
  }).filter(item => item.partner !== undefined); // filter deleted users

  // If selectedChatUser is passed, find or create conversation and select it
  const activeChat = selectedChatUser
    ? chats.find(c => c.participants.includes(currentUser.id) && c.participants.includes(selectedChatUser.id))
    : null;

  const activeMessages = activeChat ? activeChat.messages : [];

  const activeBooking = bookings?.find(b => 
    b.status === 'Accepted' && 
    ((b.senderId === currentUser.id && b.receiverId === selectedChatUser?.id) ||
     (b.senderId === selectedChatUser?.id && b.receiverId === currentUser.id))
  );

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!messageText.trim() || !activeChat) return;

    sendMessage(activeChat.id, currentUser.id, messageText.trim());
    setMessageText('');
    setShowEmojiPicker(false);
  };

  // Mock attachment sender
  const handleSendAttachment = (type, name, url) => {
    if (!activeChat) return;
    
    sendMessage(activeChat.id, currentUser.id, `Sent a ${type}: ${name}`, {
      type,
      name,
      url
    });
    
    setShowAttachmentMenu(false);
  };

  const handleSelectChatItem = (partner) => {
    getOrCreateConversation(currentUser.id, partner.id);
    setSelectedChatUser(partner);
  };

  const emojis = ['💡', '💻', '📚', '🚀', '🔥', '👍', '🧠', '✨', '📅', '🙌'];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-6 h-[calc(100vh-140px)] min-h-[500px] flex gap-6 text-left animate-in fade-in duration-300">
      
      {/* Left Column: Chat List */}
      <div className="w-full md:w-80 glass-card rounded-2xl border border-white/5 flex flex-col overflow-hidden shrink-0">
        <div className="p-4 border-b border-white/5 bg-slate-900/30">
          <span className="font-display font-bold text-sm text-white flex items-center gap-1.5">
            <MessageSquare size={16} className="text-indigo-400" /> Active Chats
          </span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {chatList.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No conversations yet. Go to "Explore Peers" to start a chat.
            </div>
          ) : (
            chatList.map(item => {
              const isSelected = selectedChatUser && selectedChatUser.id === item.partner.id;
              
              return (
                <div 
                  key={item.chatId}
                  onClick={() => handleSelectChatItem(item.partner)}
                  className={`p-3 flex items-center gap-3 cursor-pointer transition-all ${
                    isSelected ? 'bg-indigo-600/10 border-l-2 border-indigo-500' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={item.partner.avatar} 
                      alt={item.partner.name} 
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${
                      item.partner.availability === 'Online' ? 'bg-emerald-500' : 'bg-slate-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-baseline">
                      <span className="block font-bold text-xs text-white truncate">{item.partner.name}</span>
                      {item.lastMessage && (
                        <span className="text-[9px] text-slate-500 shrink-0">
                          {new Date(item.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    <span className="block text-[10px] text-slate-400 truncate mt-0.5">
                      {item.lastMessage ? item.lastMessage.text : 'Start conversation...'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right Column: Chat Window */}
      <div className="flex-1 glass-card rounded-2xl border border-white/5 flex flex-col overflow-hidden relative">
        {selectedChatUser && activeChat ? (
          <>
            {/* Chat Window Header */}
            <div className="p-4 border-b border-white/5 bg-slate-900/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedChatUser.avatar} 
                  alt={selectedChatUser.name} 
                  className="w-9 h-9 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="block font-bold text-xs text-white">{selectedChatUser.name}</span>
                    {activeBooking && (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Active Session
                      </span>
                    )}
                  </div>
                  <span className="block text-[9px] text-slate-400">{selectedChatUser.institute}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeBooking && (
                  <a 
                    href={activeBooking.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
                    title="Join Google Meet Session"
                  >
                    <Video size={13} /> Join Meet
                  </a>
                )}

                {/* Bot Info Tag if relevant */}
                {selectedChatUser.id === 'user-admin' && (
                  <div className="flex items-center gap-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 px-2 py-0.5 rounded text-[9px] font-bold">
                    <Bot size={10} /> AI Learning Bot
                  </div>
                )}
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/20">
              {activeMessages.length === 0 ? (
                <div className="py-20 text-center text-slate-500 text-xs">
                  Say hi to {selectedChatUser.name}! Propose a skill exchange concept.
                </div>
              ) : (
                activeMessages.map(msg => {
                  const isMe = msg.senderId === currentUser.id;
                  
                  return (
                    <div 
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] p-3.5 rounded-2xl text-xs leading-relaxed relative ${
                        isMe 
                          ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/10' 
                          : 'bg-slate-900 border border-white/5 text-slate-200 rounded-tl-none'
                      }`}>
                        
                        {/* Message content */}
                        <p className="break-words font-medium">{msg.text}</p>
                        
                        {/* Attachments */}
                        {msg.attachment && (
                          <div className="mt-2.5 p-2 bg-slate-950/40 border border-white/5 rounded-xl flex items-center gap-2">
                            {msg.attachment.type === 'image' && (
                              <div className="space-y-1 w-full">
                                <span className="block text-[9px] text-indigo-400 font-bold uppercase">Image Attachment</span>
                                <img src={msg.attachment.url} alt="" className="w-full max-h-32 object-cover rounded border border-white/5" />
                              </div>
                            )}
                            {msg.attachment.type === 'file' && (
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
                                <Paperclip size={12} className="text-indigo-400" />
                                <span className="truncate max-w-[150px]">{msg.attachment.name}</span>
                              </div>
                            )}
                            {msg.attachment.type === 'voice' && (
                              <div className="flex items-center gap-2 text-[10px] text-slate-300 w-full">
                                <Mic size={12} className="text-indigo-400 shrink-0" />
                                <div className="flex-1 bg-indigo-500/20 h-1.5 rounded-full relative">
                                  <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-indigo-500 rounded-full" />
                                </div>
                                <span className="text-[8px] text-slate-500 shrink-0">0:14</span>
                              </div>
                            )}
                            {msg.attachment.type === 'meet' && (
                              <div className="space-y-2 w-full text-left p-1">
                                <span className="block text-[9px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                  <Video size={10} className="text-emerald-400 animate-pulse" /> Google Meet Session
                                </span>
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-[10px] text-slate-300 truncate max-w-[140px] font-mono">{msg.attachment.name}</span>
                                  <a 
                                    href={msg.attachment.url} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all shrink-0 cursor-pointer"
                                  >
                                    Join Call
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <span className="block text-[8px] text-slate-400 mt-1.5 text-right font-light">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-slate-900/30 flex gap-2 relative">
              
              {/* Emoji Picker Menu popup */}
              {showEmojiPicker && (
                <div className="absolute bottom-16 left-4 bg-slate-900 border border-white/10 p-2.5 rounded-xl shadow-2xl flex gap-1.5 z-30">
                  {emojis.map(e => (
                    <button 
                      key={e} 
                      type="button"
                      onClick={() => { setMessageText(prev => prev + e); setShowEmojiPicker(false); }}
                      className="text-lg hover:scale-125 transition-transform"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}

              {/* Attachments Menu popup */}
              {showAttachmentMenu && (
                <div className="absolute bottom-16 left-12 bg-slate-900 border border-white/10 p-2 rounded-xl shadow-2xl flex flex-col gap-1 z-30 text-xs font-semibold">
                  <button 
                    type="button"
                    onClick={() => {
                      const code1 = Math.random().toString(36).substring(2, 5);
                      const code2 = Math.random().toString(36).substring(2, 6);
                      const code3 = Math.random().toString(36).substring(2, 5);
                      const meetCode = `${code1}-${code2}-${code3}`;
                      handleSendAttachment('meet', meetCode, `https://meet.google.com/${meetCode}`);
                    }}
                    className="px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-indigo-600/20 rounded-lg flex items-center gap-2"
                  >
                    <Video size={13} className="text-emerald-400" /> Share Google Meet
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleSendAttachment('image', 'mockup_dashboard.png', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=200')}
                    className="px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-indigo-600/20 rounded-lg flex items-center gap-2"
                  >
                    <Image size={13} className="text-indigo-400" /> Share Image
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleSendAttachment('file', 'React_CheatSheet.pdf', '')}
                    className="px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-indigo-600/20 rounded-lg flex items-center gap-2"
                  >
                    <Paperclip size={13} className="text-indigo-400" /> Share File Document
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleSendAttachment('voice', 'voice_note_14s.mp3', '')}
                    className="px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-indigo-600/20 rounded-lg flex items-center gap-2"
                  >
                    <Mic size={13} className="text-indigo-400" /> Send Voice Note
                  </button>
                </div>
              )}

              <button 
                type="button"
                onClick={() => { setShowEmojiPicker(!showEmojiPicker); setShowAttachmentMenu(false); }}
                className="p-2.5 bg-slate-950/40 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-white/5 transition-colors cursor-pointer"
              >
                <Smile size={16} />
              </button>

              <button 
                type="button"
                onClick={() => { setShowAttachmentMenu(!showAttachmentMenu); setShowEmojiPicker(false); }}
                className="p-2.5 bg-slate-950/40 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-white/5 transition-colors cursor-pointer"
              >
                <Paperclip size={16} />
              </button>

              <input 
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 bg-slate-950/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />

              <button 
                type="submit"
                className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
              >
                <Send size={16} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 space-y-4">
            <MessageSquare size={48} className="text-slate-700 opacity-40 animate-pulse" />
            <div>
              <h3 className="font-display font-bold text-sm text-slate-300">Select a Conversation</h3>
              <p className="text-[11px] text-slate-500 mt-1 max-w-xs">Choose a peer from the left list to coordinates study sessions or share project files.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
