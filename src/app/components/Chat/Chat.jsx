'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Button, 
  TextInput, 
  Tile, 
  Grid, 
  Column,
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  SkipToContent
} from '@carbon/react';
import { 
  Microphone, 
  Send, 
  Menu, 
  ArrowRight,
  Watson,
  User
} from '@carbon/icons-react';
import styles from './Chat.module.scss';

export default function Chat({ onCanvasToggle, isCanvasOpen }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello and welcome',
      timestamp: new Date(),
      isWelcome: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when canvas is not open
  useEffect(() => {
    if (!isCanvasOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCanvasOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response with MCP component detection
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue.trim());
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        mcpComponents: aiResponse.mcpComponents
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Trigger canvas if MCP components are detected
      if (aiResponse.mcpComponents && aiResponse.mcpComponents.length > 0) {
        onCanvasToggle(aiResponse.mcpComponents);
      }
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('assessment') || input.includes('quick start')) {
      return {
        content: `Planning to optimize your Product Content Automation Strategy in 4 stages:

1. Assessment guide
2. Current systems in place  
3. Strategies required
4. Detailed Analysis Report

Let's first start with a maturity assessment. I'll help you evaluate your organization across all 14 dimensions. Would you like to start with a specific dimension, or shall I guide you through them systematically?`,
        mcpComponents: [{
          type: 'assessment',
          props: {
            title: 'Digital Commerce Maturity Assessment',
            stages: ['Assessment guide', 'Current systems in place', 'Strategies required', 'Detailed Analysis Report'],
            dimensions: 14
          }
        }]
      };
    }
    
    if (input.includes('form') || input.includes('login') || input.includes('signup')) {
      return {
        content: "I'll create a form component for you!",
        mcpComponents: [{
          type: 'form',
          props: {
            fields: input.includes('login') ? ['email', 'password'] : ['name', 'email', 'password', 'confirmPassword'],
            title: input.includes('login') ? 'Login Form' : 'Sign Up Form',
            submitText: input.includes('login') ? 'Sign In' : 'Create Account'
          }
        }]
      };
    }
    
    if (input.includes('dashboard') || input.includes('admin')) {
      return {
        content: "I'll create a dashboard layout for you!",
        mcpComponents: [{
          type: 'dashboard',
          props: {
            title: 'Admin Dashboard',
            widgets: ['stats', 'charts', 'recent-activity']
          }
        }]
      };
    }
    
    if (input.includes('card') || input.includes('profile')) {
      return {
        content: "I'll create a card component for you!",
        mcpComponents: [{
          type: 'card',
          props: {
            title: 'User Profile',
            content: 'This is a sample card component',
            image: 'https://via.placeholder.com/300x200'
          }
        }]
      };
    }
    
    if (input.includes('table') || input.includes('data')) {
      return {
        content: "I'll create a data table for you!",
        mcpComponents: [{
          type: 'table',
          props: {
            headers: ['Name', 'Email', 'Role', 'Status'],
            data: [
              ['John Doe', 'john@example.com', 'Admin', 'Active'],
              ['Jane Smith', 'jane@example.com', 'User', 'Active'],
              ['Bob Johnson', 'bob@example.com', 'User', 'Inactive']
            ]
          }
        }]
      };
    }

    return {
      content: "I understand you want to create something. Try asking for a 'form', 'dashboard', 'card', or 'table' component, and I'll build it for you!",
      mcpComponents: null
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSamplePrompt = (prompt) => {
    setInputValue(prompt);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // No animation variants needed with resizable panels

  const samplePrompts = [
    {
      id: 1,
      title: "Quick start with an assessment of current Product Content Automation Strategy",
      action: "Quick start with an assessment of current Product Content Automation Strategy"
    },
    {
      id: 2,
      title: "Guide through a step by step process to optimize my Product Content Automation Strategy",
      action: "Guide through a step by step process to optimize my Product Content Automation Strategy"
    },
    {
      id: 3,
      title: "Understand AI capabilities in data x context lorem ipsum lorem ipsum lorem ipsum lorem ipsum...",
      action: "Understand AI capabilities in data context"
    }
  ];

  return (
    <div className={styles.chatContainer}>
      {/* Header */}
      <Header aria-label="IBM Consulting Commerce Navigator" className={styles.header}>
        <SkipToContent />
        <HeaderName prefix="IBM Consulting Commerce Navigator">
          Product Content Automation Strategy Optimizer
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="User" tooltipAlignment="end">
            <User size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <span>Home</span> / <span>Product Content Automation Strategy Optimizer</span> / <span>New Optimizer</span>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {!isCanvasOpen ? (
          <div className={styles.welcomeSection}>
            {/* Watson AI Header */}
            <div className={styles.watsonHeader}>
              <div className={styles.watsonInfo}>
                <Watson size={20} className={styles.watsonIcon} />
                <span className={styles.watsonText}>watsonx {formatTime(new Date())}</span>
              </div>
              <div className={styles.aiLabel}>AI</div>
            </div>

            {/* Welcome Message */}
            <div className={styles.welcomeMessage}>
              <h1 className={styles.welcomeTitle}>Hello and welcome</h1>
              <p className={styles.welcomeSubtitle}>
                Get started with your Product Content Automation Strategy by exploring the varied sample prompts, or asking a question below.
              </p>
            </div>

            {/* Sample Prompt Cards */}
            <Grid className={styles.promptsGrid}>
              {samplePrompts.map((prompt) => (
                <Column key={prompt.id} md={4} lg={4} sm={4}>
                  <Tile 
                    className={styles.promptCard}
                    onClick={() => handleSamplePrompt(prompt.action)}
                  >
                    <div className={styles.promptContent}>
                      <p className={styles.promptText}>{prompt.title}</p>
                      <ArrowRight size={16} className={styles.arrowIcon} />
                    </div>
                  </Tile>
                </Column>
              ))}
            </Grid>
          </div>
        ) : (
          <div className={styles.messagesContainer} ref={chatContainerRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${styles[message.type]}`}
              >
                <div className={styles.messageHeader}>
                  <span className={styles.messageSender}>
                    {message.type === 'user' ? 'You' : 'Assistant'}
                  </span>
                  <span className={styles.messageTime}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <div className={styles.messageContent}>
                  {message.content}
                </div>
                {message.type === 'ai' && (
                  <div className={styles.messageActions}>
                    <button className={styles.actionButton}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 9V5a3 3 0 0 0-6 0v4"></path>
                        <rect x="2" y="9" width="20" height="12" rx="2" ry="2"></rect>
                        <path d="M8 15h8"></path>
                      </svg>
                    </button>
                    <button className={styles.actionButton}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 9V5a3 3 0 0 0-6 0v4"></path>
                        <rect x="2" y="9" width="20" height="12" rx="2" ry="2"></rect>
                        <path d="M8 15h8"></path>
                      </svg>
                    </button>
                    <button className={styles.actionButton}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                        <path d="M3 3v5h5"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className={`${styles.message} ${styles.ai}`}>
                <div className={styles.messageHeader}>
                  <span className={styles.messageSender}>Assistant</span>
                  <span className={styles.messageTime}>
                    {formatTime(new Date())}
                  </span>
                </div>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            iconDescription="Menu"
            className={styles.menuButton}
          >
            <Menu size={16} />
          </Button>
          
          <TextInput
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type something..."
            className={styles.messageInput}
            disabled={isTyping}
            size="lg"
          />
          
          <div className={styles.inputActions}>
            <Button
              kind="ghost"
              size="sm"
              hasIconOnly
              iconDescription="Microphone"
              className={styles.actionButton}
            >
              <Microphone size={16} />
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              hasIconOnly
              iconDescription="Send"
              className={styles.sendButton}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}