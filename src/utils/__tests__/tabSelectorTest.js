
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TabSelector } from '../../components';

describe('TabSelector', () => {
  it('renders tabs correctly and responds to selection', () => {
    const mockSetActiveTab = jest.fn();
    const { getByText } = render(
      <TabSelector 
        activeTab="personal" 
        setActiveTab={mockSetActiveTab} 
        tabs={[
          { id: 'personal', label: 'Personal' },
          { id: 'bank', label: 'Bank' },
          { id: 'insurance', label: 'Insurance' },
          { id: 'sameday', label: 'Same Day' }
        ]} 
      />
    );
    
    // Check tabs are rendered
    expect(getByText('Personal')).toBeTruthy();
    expect(getByText('Bank')).toBeTruthy();
    
    // Test tab selection
    fireEvent.press(getByText('Bank'));
    expect(mockSetActiveTab).toHaveBeenCalledWith('bank');
  });
});
