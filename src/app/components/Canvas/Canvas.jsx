'use client';

import { useState } from 'react';
import { 
  Button, 
  Tabs, 
  Tab, 
  TabList, 
  TabPanels, 
  TabPanel,
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar
} from '@carbon/react';
import { 
  Edit, 
  Download, 
  Share, 
  Maximize, 
  Close,
  ChartLine,
  Settings,
  User,
  Document,
  Renew
} from '@carbon/icons-react';
import styles from './Canvas.module.scss';
import MCPRenderer from '../MCPRenderer/MCPRenderer';

export default function Canvas({ mcpComponents, onClose, isOpen }) {
  const [activeTab, setActiveTab] = useState(0);
  const [projectName, setProjectName] = useState('my optimization 01');

  // No animation variants needed with resizable panels

  const tabs = [
    { id: 'assessment', label: 'Assessment', icon: ChartLine },
    { id: 'systems', label: 'Systems', icon: Settings },
    { id: 'usages', label: 'Usages', icon: User },
    { id: 'review', label: 'Review', icon: Document }
  ];

  return (
    <div className={styles.canvasContainer}>
            {/* Canvas Header */}
            <Header aria-label="Canvas Header" className={styles.canvasHeader}>
              <HeaderName className={styles.projectName}>
                <Edit size={16} className={styles.editIcon} />
                {projectName}
              </HeaderName>
              <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="AI" tooltipAlignment="end">
                  <span className={styles.aiLabel}>AI</span>
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Download" tooltipAlignment="end">
                  <Download size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Share" tooltipAlignment="end">
                  <Share size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Maximize" tooltipAlignment="end">
                  <Maximize size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Close" tooltipAlignment="end" onClick={onClose}>
                  <Close size={20} />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
            </Header>

            <div className={styles.projectSubtitle}>
              Click to rename this Product Content Automation Strategy Optimizer
            </div>

            {/* Navigation Tabs */}
            <div className={styles.tabsContainer}>
              <Tabs selectedIndex={activeTab} onSelectionChange={setActiveTab}>
                <TabList aria-label="Canvas tabs">
                  {tabs.map((tab, index) => (
                    <Tab key={tab.id}>
                      <tab.icon size={16} className={styles.tabIcon} />
                      {tab.label}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels>
                  {tabs.map((tab) => (
                    <TabPanel key={tab.id} className={styles.tabPanel}>
                      <div className={styles.tabContent}>
                        {tab.id === 'assessment' && (
                          <div className={styles.assessmentContent}>
                            <h1 className={styles.contentTitle}>
                              Stage 1: Digital commerce maturity assessment guide
                            </h1>
                            <p className={styles.contentSubtitle}>
                              Select any assessment dimension and choose the level of maturity
                            </p>
                            
                            {mcpComponents && mcpComponents.length > 0 ? (
                              <MCPRenderer components={mcpComponents} />
                            ) : (
                              <div className={styles.placeholderComponent}>
                                <div className={styles.placeholderContent}>
                                  <Renew size={24} className={styles.placeholderIcon} />
                                  <h3>Slot component</h3>
                                  <p>
                                    Optional placeholder component. Replace it with any component using the 'Component Instance' swapper, or delete if needed.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {tab.id === 'systems' && (
                          <div className={styles.tabContent}>
                            <h1 className={styles.contentTitle}>Systems Configuration</h1>
                            <p className={styles.contentSubtitle}>
                              Configure your system settings and integrations
                            </p>
                            <div className={styles.placeholderComponent}>
                              <div className={styles.placeholderContent}>
                                <Renew size={24} className={styles.placeholderIcon} />
                                <h3>Systems Panel</h3>
                                <p>Configure your systems and integrations here.</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {tab.id === 'usages' && (
                          <div className={styles.tabContent}>
                            <h1 className={styles.contentTitle}>Usage Analytics</h1>
                            <p className={styles.contentSubtitle}>
                              View usage statistics and analytics
                            </p>
                            <div className={styles.placeholderComponent}>
                              <div className={styles.placeholderContent}>
                                <Renew size={24} className={styles.placeholderIcon} />
                                <h3>Usage Dashboard</h3>
                                <p>View your usage analytics and statistics here.</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {tab.id === 'review' && (
                          <div className={styles.tabContent}>
                            <h1 className={styles.contentTitle}>Review & Summary</h1>
                            <p className={styles.contentSubtitle}>
                              Review your configuration and generate reports
                            </p>
                            <div className={styles.placeholderComponent}>
                              <div className={styles.placeholderContent}>
                                <Renew size={24} className={styles.placeholderIcon} />
                                <h3>Review Panel</h3>
                                <p>Review your configuration and generate reports here.</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </div>

            {/* Footer Navigation */}
            <div className={styles.footerNavigation}>
              <Button kind="ghost" size="lg">
                Cancel
              </Button>
              <Button kind="secondary" size="lg">
                Previous
              </Button>
              <Button kind="primary" size="lg">
                Next
              </Button>
            </div>
    </div>
  );
}
