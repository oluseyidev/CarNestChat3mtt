import React, { useState } from 'react';
import ChatAssistant from './ChatAssistant';
import { MessageCircle } from 'lucide-react'; // optional icon

export default function FloatingChatWidget() {
const [isOpen, setIsOpen] = useState(false);

return (
<div className="fixed bottom-4 right-4 z-50">
{isOpen && (
<div className="w-80 h-[450px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
<div className="flex justify-between items-center px-4 py-2 bg-blue-600 text-white font-semibold">
<span>CarNest Assistant</span>
<button onClick={() => setIsOpen(false)} className="text-white text-xl font-bold">×</button>
</div>
<ChatAssistant />
</div>
)}

{!isOpen && (
    <button
      onClick={() => setIsOpen(true)}
      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
      title="Ask CarNest Assistant"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  )}
</div>  

);
}