'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './MCPRenderer.module.scss';

// Mock MCP UI components for demonstration
const MCPComponents = {
  assessment: ({ props }) => (
    <motion.div 
      className={styles.component}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.assessmentContainer}>
        <h3 className={styles.assessmentTitle}>{props.title || 'Assessment'}</h3>
        <div className={styles.stagesList}>
          {props.stages?.map((stage, index) => (
            <div key={index} className={styles.stageItem}>
              <span className={styles.stageNumber}>{index + 1}.</span>
              <span className={styles.stageText}>{stage}</span>
            </div>
          ))}
        </div>
        <div className={styles.dimensionsInfo}>
          <p>Evaluate your organization across <strong>{props.dimensions || 14} dimensions</strong></p>
        </div>
      </div>
    </motion.div>
  ),

  form: ({ props }) => (
    <motion.div 
      className={styles.component}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>{props.title || 'Form'}</h3>
        <form className={styles.form}>
          {props.fields?.map((field, index) => (
            <div key={index} className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'password' || field === 'confirmPassword' ? 'password' : 
                      field === 'email' ? 'email' : 'text'}
                className={styles.fieldInput}
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
          <button type="submit" className={styles.submitButton}>
            {props.submitText || 'Submit'}
          </button>
        </form>
      </div>
    </motion.div>
  ),

  dashboard: ({ props }) => (
    <motion.div 
      className={styles.component}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.dashboardContainer}>
        <h3 className={styles.dashboardTitle}>{props.title || 'Dashboard'}</h3>
        <div className={styles.dashboardGrid}>
          {props.widgets?.map((widget, index) => (
            <div key={index} className={styles.widget}>
              <div className={styles.widgetHeader}>
                <h4>{widget.charAt(0).toUpperCase() + widget.slice(1).replace('-', ' ')}</h4>
              </div>
              <div className={styles.widgetContent}>
                {widget === 'stats' && (
                  <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>1,234</span>
                      <span className={styles.statLabel}>Total Users</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>567</span>
                      <span className={styles.statLabel}>Active Sessions</span>
                    </div>
                  </div>
                )}
                {widget === 'charts' && (
                  <div className={styles.chartPlaceholder}>
                    <div className={styles.chartBar} style={{ height: '60%' }}></div>
                    <div className={styles.chartBar} style={{ height: '80%' }}></div>
                    <div className={styles.chartBar} style={{ height: '45%' }}></div>
                    <div className={styles.chartBar} style={{ height: '90%' }}></div>
                  </div>
                )}
                {widget === 'recent-activity' && (
                  <div className={styles.activityList}>
                    <div className={styles.activityItem}>
                      <span className={styles.activityText}>User John Doe logged in</span>
                      <span className={styles.activityTime}>2 min ago</span>
                    </div>
                    <div className={styles.activityItem}>
                      <span className={styles.activityText}>New user registered</span>
                      <span className={styles.activityTime}>5 min ago</span>
                    </div>
                    <div className={styles.activityItem}>
                      <span className={styles.activityText}>System backup completed</span>
                      <span className={styles.activityTime}>1 hour ago</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  ),

  card: ({ props }) => (
    <motion.div 
      className={styles.component}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.cardContainer}>
        {props.image && (
          <div className={styles.cardImage}>
            <img src={props.image} alt={props.title} />
          </div>
        )}
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{props.title || 'Card Title'}</h3>
          <p className={styles.cardText}>{props.content || 'This is a sample card component with some content.'}</p>
          <div className={styles.cardActions}>
            <button className={styles.cardButton}>Learn More</button>
            <button className={styles.cardButtonSecondary}>Share</button>
          </div>
        </div>
      </div>
    </motion.div>
  ),

  table: ({ props }) => (
    <motion.div 
      className={styles.component}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.tableContainer}>
        <h3 className={styles.tableTitle}>Data Table</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {props.headers?.map((header, index) => (
                  <th key={index} className={styles.tableHeader}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.data?.map((row, rowIndex) => (
                <tr key={rowIndex} className={styles.tableRow}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className={styles.tableCell}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
};

export default function MCPRenderer({ components }) {
  const [renderedComponents, setRenderedComponents] = useState([]);

  useEffect(() => {
    if (components && components.length > 0) {
      setRenderedComponents(components);
    }
  }, [components]);

  const renderComponent = (component, index) => {
    const ComponentType = MCPComponents[component.type];
    
    if (!ComponentType) {
      return (
        <motion.div 
          key={index}
          className={styles.errorComponent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.errorMessage}>
            <h4>Component Not Found</h4>
            <p>Component type "{component.type}" is not available.</p>
          </div>
        </motion.div>
      );
    }

    return (
      <ComponentType 
        key={index}
        props={component.props}
      />
    );
  };

  return (
    <div className={styles.mcpContainer}>
      {renderedComponents.length > 0 ? (
        <div className={styles.componentsList}>
          {renderedComponents.map((component, index) => renderComponent(component, index))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="9" x2="15" y2="15"></line>
              <line x1="15" y1="9" x2="9" y2="15"></line>
            </svg>
          </div>
          <h3>No components to render</h3>
          <p>Components will appear here when created.</p>
        </div>
      )}
    </div>
  );
}
