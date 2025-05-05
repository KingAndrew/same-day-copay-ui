
import React from 'react';
import { screens } from '../screens/index.js.js.js.js.js';

export const screenRenderer = {
  /**
   * Renders the requested screen
   * @param {string} screenName - Name of the screen to render
   * @param {Object} props - Props to pass to the screen
   * @returns {React.Component} - The rendered screen component
   */
  renderScreen(screenName, props = {}) {
    try {
      if (!screenName) {
        console.error('No screen name provided to renderScreen');
        return null;
      }
      
      const ScreenComponent = screens[screenName];
      if (!ScreenComponent) {
        console.error(`Screen "${screenName}" not found in screens registry`);
        return null;
      }
      
      return <ScreenComponent {...props} />;
    } catch (error) {
      console.error('Error rendering screen:', error);
      return null;
    }
  }
};

export default screenRenderer;
