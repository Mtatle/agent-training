document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Set the agent name from localStorage if available
    const agentName = localStorage.getItem('agentName');
    if (agentName) {
        const agentNameElements = document.querySelectorAll('.agent-name');
        agentNameElements.forEach(element => {
            element.innerHTML = agentName + ' <i data-feather="chevron-down" class="icon-small"></i>';
        });
        
        // Re-initialize Feather icons after DOM changes
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
    
    // Check if user is logged in (redirect to login if not)
    if (!localStorage.getItem('agentName') && !window.location.href.includes('login.html') && 
        !window.location.href.includes('index.html')) {
        window.location.href = 'index.html';
    }
    
    // Add logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('agentName');
            window.location.href = 'index.html';
        });
    }function addMessage(text, type = 'sent') {
        if (!text.trim()) return;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);

        const senderIconDiv = document.createElement('div');
        senderIconDiv.classList.add('message-sender-icon');
        
        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('message-content');

        const messageTextP = document.createElement('p');
        messageTextP.textContent = text;

        const timestampSpan = document.createElement('span');
        timestampSpan.classList.add('timestamp');
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + 
                             ', ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timestampSpan.textContent = formattedDate;

        messageContentDiv.appendChild(messageTextP);
        messageContentDiv.appendChild(timestampSpan);
          if (type === 'sent') {
            senderIconDiv.classList.add('self');
            senderIconDiv.textContent = 'F'; // FragranceNet initial
            messageDiv.appendChild(messageContentDiv); // Content first
            messageDiv.appendChild(senderIconDiv); // Icon second
        } else { // received
            senderIconDiv.textContent = 'C'; // Customer initial
            messageDiv.appendChild(senderIconDiv);
            messageDiv.appendChild(messageContentDiv);
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }    function handleSendMessage() {
        const messageText = chatInput.value;
        if (!messageText.trim()) return; // Don't send empty messages
        
        addMessage("FragranceNet: " + messageText, 'sent');
        chatInput.value = ''; // Clear input
        chatInput.focus();

        // Simulate a reply for demonstration
        if (messageText.toLowerCase().includes("hello") || messageText.toLowerCase().includes("hi")) {
            setTimeout(() => {
                addMessage("Hello there! How can I help you today?", 'received');
            }, 1000);
        } else if (messageText.toLowerCase().includes("code") || messageText.toLowerCase().includes("discount")) {
             setTimeout(() => {
                addMessage("I'm checking on available codes for you. One moment please.", 'received');
            }, 1500);
            setTimeout(() => {
                addMessage("You can use code WELCOME30 for 30% off your first purchase!", 'received');
            }, 3500);
        } else if (messageText.toLowerCase().includes("fragrance") || messageText.toLowerCase().includes("perfume")) {
            setTimeout(() => {
                addMessage("We have a great selection of fragrances! Are you looking for something specific?", 'received');
            }, 1200);
        } else {
            setTimeout(() => {
                addMessage("Thank you for your message. How else can I assist you today?", 'received');
            }, 1000);
        }
    }

    sendButton.addEventListener('click', handleSendMessage);

    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Initial scroll to bottom if there's pre-loaded content
    if(chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});