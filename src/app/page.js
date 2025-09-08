'use client';

import { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Chat from './components/Chat/Chat';
import Canvas from './components/Canvas/Canvas';

export default function Home() {
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [mcpComponents, setMcpComponents] = useState([]);

  const handleCanvasToggle = (components) => {
    if (components) {
      setMcpComponents(components);
      setIsCanvasOpen(true);
    } else {
      setIsCanvasOpen(false);
    }
  };

  const handleCanvasClose = () => {
    setIsCanvasOpen(false);
  };

  return (
    <div style={{ 
      height: '100vh', 
      overflow: 'hidden',
      position: 'relative'
    }}>
      {!isCanvasOpen ? (
        <Chat 
          onCanvasToggle={handleCanvasToggle}
          isCanvasOpen={isCanvasOpen}
        />
      ) : (
        <PanelGroup direction="horizontal" style={{ height: '100vh' }}>
          <Panel defaultSize={40} minSize={30} maxSize={70}>
            <Chat 
              onCanvasToggle={handleCanvasToggle}
              isCanvasOpen={isCanvasOpen}
            />
          </Panel>
          <PanelResizeHandle className="resize-handle" />
          <Panel defaultSize={60} minSize={30} maxSize={70}>
            <Canvas 
              mcpComponents={mcpComponents}
              onClose={handleCanvasClose}
              isOpen={isCanvasOpen}
            />
          </Panel>
        </PanelGroup>
      )}
    </div>
  );
}
