import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { getSurveyResponses, getSurveyAnalytics } from '../firebase/firestore';
import PageTransition from '../components/animations/PageTransition';
import Button from '../components/ui/Button';
// Add these imports at the top of your file
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
} from 'chart.js';
import { Bar, Pie, Line, Radar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);


const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
`;

const PageTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const PageDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const DashboardCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
`;

const CardValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #0c87e8, #d712ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
`;

const Tab = styled.button`
  background: ${props => props.active ? 'rgba(12, 135, 232, 0.2)' : 'transparent'};
  color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(12, 135, 232, 0.1);
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  th {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
    background: rgba(0, 0, 0, 0.2);
  }
  
  td {
    color: rgba(255, 255, 255, 0.7);
  }
  
  tbody tr:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;

const ActionButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
`;

const ExportButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  
  /* Fix dropdown styling */
  option {
    background-color: #333;
    color: white;
  }
`;

  const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: rgba(30, 30, 40, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  h2 {
    color: white;
    margin: 0;
    background: linear-gradient(90deg, #0c87e8, #d712ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  
  &:hover {
    color: white;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  max-height: calc(85vh - 130px);
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: flex-end;
`;

const ResponseSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  span {
    margin-right: 8px;
  }
`;

const DetailItem = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 0.75rem;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.div`
  width: 200px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  padding-right: 1rem;
`;

const DetailValue = styled.div`
  flex: 1;
  color: white;
  min-width: 250px;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const AnalyticsSection = styled.div`
  margin-bottom: 3rem;
`;

const AnalyticsTitle = styled.h2`
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResponseDetailsModal = ({ response, isOpen, onClose }) => {
  if (!isOpen || !response) return null;
  
  // Helper function to format keys into readable labels
  const formatLabel = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/Coca Cola/g, 'Coca-Cola')
      .replace(/(\w)(\s+)([AB])(\s+)(\d+)/g, '$1 $3-$5');
  };
  
  // Update the renderValue function in your ResponseDetailsModal component
const renderValue = (value) => {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  
  // Handle object data (like your Pepsi/Coca-Cola ratings)
  if (typeof value === 'object' && value !== null) {
    // For brand rating objects
    if (Object.keys(value).some(k => k.includes('pepsi_') || k.includes('coca_cola_'))) {
      // Sort the keys for consistent ordering
      const sortedEntries = Object.entries(value).sort((a, b) => a[0].localeCompare(b[0]));
      
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {sortedEntries.map(([key, rating]) => {
            // Format the key nicely (e.g., "pepsi_b_4" -> "B-4")
            const formattedKey = key
              .replace(/pepsi_|coca_cola_/g, '')
              .replace(/(\w)_(\d+)/g, '$1-$2')
              .toUpperCase();
              
            return (
              <div key={key} style={{ 
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.1)', 
                padding: '8px',
                borderRadius: '4px'
              }}>
                <div style={{ width: '40px', fontWeight: 'bold' }}>{formattedKey}</div>
                <div style={{ 
                  flex: 1,
                  display: 'flex',
                  height: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(rating / 7) * 100}%`,
                    background: key.includes('pepsi') ? '#0066cc' : '#ff0000',
                    height: '100%'
                  }}/>
                </div>
                <div style={{ marginLeft: '8px', width: '20px', textAlign: 'right' }}>{rating}</div>
              </div>
            );
          })}
        </div>
      );
    }
    
    // For other objects
    try {
      return (
        <pre style={{
          background: 'rgba(0,0,0,0.2)',
          padding: '0.5rem',
          borderRadius: '4px',
          overflowX: 'auto',
          fontSize: '0.85rem'
        }}>
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    } catch (e) {
      return '[Complex Object]';
    }
  }
  
  // For other types
  return String(value);
};

  // Extract brand-related fields
  const cocaColaFields = {};
  const pepsiFields = {};
  
  // Loop through response properties to find brand ratings
  Object.keys(response).forEach(key => {
    if (key.includes('coca_cola_')) {
      cocaColaFields[key] = response[key];
    } else if (key.includes('pepsi_')) {
      pepsiFields[key] = response[key];
    }
  });
  
  // For debugging - check if we have brand data
  console.log('Coca-Cola fields:', cocaColaFields);
  console.log('Pepsi fields:', pepsiFields);
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Survey Response Details</h2>
          <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
        </ModalHeader>
        
        <ModalBody>
          <ResponseSection>
            <SectionTitle>
              <span role="img" aria-label="info">📋</span> Submission Info
            </SectionTitle>
            <DetailItem>
              <DetailLabel>ID:</DetailLabel>
              <DetailValue>{response.id || '-'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Submitted:</DetailLabel>
              <DetailValue>
                {response.submittedAt ? new Date(response.submittedAt).toLocaleString() : '-'}
              </DetailValue>
            </DetailItem>
          </ResponseSection>
          
          {/* Demographics Section */}
          {response.demographics && Object.keys(response.demographics).length > 0 && (
            <ResponseSection>
              <SectionTitle>
                <span role="img" aria-label="demographics">👤</span> Demographics
              </SectionTitle>
              {Object.entries(response.demographics).map(([key, value]) => (
                <DetailItem key={key}>
                  <DetailLabel>{formatLabel(key)}:</DetailLabel>
                  <DetailValue>{renderValue(value)}</DetailValue>
                </DetailItem>
              ))}
            </ResponseSection>
          )}
          
          {/* Coca-Cola Ratings Section */}
          {Object.keys(cocaColaFields).length > 0 && (
            <ResponseSection>
              <SectionTitle>
                <span role="img" aria-label="coca-cola">🔴</span> Coca-Cola Ratings
              </SectionTitle>
              {Object.entries(cocaColaFields).map(([key, value]) => (
                <DetailItem key={key}>
                  <DetailLabel>{formatLabel(key)}:</DetailLabel>
                  <DetailValue>{renderValue(value)}</DetailValue>
                </DetailItem>
              ))}
            </ResponseSection>
          )}
          
          {/* Pepsi Ratings Section */}
          {Object.keys(pepsiFields).length > 0 && (
            <ResponseSection>
              <SectionTitle>
                <span role="img" aria-label="pepsi">🔵</span> Pepsi Ratings
              </SectionTitle>
              {Object.entries(pepsiFields).map(([key, value]) => (
                <DetailItem key={key}>
                  <DetailLabel>{formatLabel(key)}:</DetailLabel>
                  <DetailValue>{renderValue(value)}</DetailValue>
                </DetailItem>
              ))}
            </ResponseSection>
          )}
          
          {/* Open Ended Responses Section */}
          {response.open_ended_responses && Object.keys(response.open_ended_responses).length > 0 && (
            <ResponseSection>
              <SectionTitle>
                <span role="img" aria-label="open-ended">💬</span> Open Ended Responses
              </SectionTitle>
              {Object.entries(response.open_ended_responses).map(([key, value]) => (
                <DetailItem key={key}>
                  <DetailLabel>{formatLabel(key)}:</DetailLabel>
                  <DetailValue>{renderValue(value)}</DetailValue>
                </DetailItem>
              ))}
            </ResponseSection>
          )}
          
          {/* Other Properties Section - for anything we might have missed */}
          <ResponseSection>
            <SectionTitle>
              <span role="img" aria-label="other">📊</span> Other Properties
            </SectionTitle>
            {Object.entries(response)
              .filter(([key]) => 
                !key.includes('coca_cola_') && 
                !key.includes('pepsi_') && 
                key !== 'id' && 
                key !== 'submittedAt' &&
                key !== 'demographics' &&
                key !== 'open_ended_responses'
              )
              .map(([key, value]) => (
                <DetailItem key={key}>
                  <DetailLabel>{formatLabel(key)}:</DetailLabel>
                  <DetailValue>{renderValue(value)}</DetailValue>
                </DetailItem>
              ))}
          </ResponseSection>
        </ModalBody>
        
        <ModalFooter>
          <Button onClick={onClose} variant="secondary">Close</Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

// Add this function before your AdminPage component
function processAnalyticsData(responses) {
  // Age distribution data
  const ageGroups = {};
  responses.forEach(response => {
    const age = response.demographics?.age || 'Unknown';
    ageGroups[age] = (ageGroups[age] || 0) + 1;
  });

  const ageDistribution = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: 'Number of Responses',
        data: Object.values(ageGroups),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Gender distribution data
  const genderGroups = {};
  responses.forEach(response => {
    const gender = response.demographics?.gender || 'Unknown';
    genderGroups[gender] = (genderGroups[gender] || 0) + 1;
  });

  const genderDistribution = {
    labels: Object.keys(genderGroups),
    datasets: [
      {
        data: Object.values(genderGroups),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Brand ratings data - improved calculation
  const pepsiRatings = {};
  const cokeRatings = {};

  // Find all Pepsi and Coca-Cola rating fields
  responses.forEach(response => {
    Object.keys(response).forEach(key => {
      let brand, variant;
      
      if (key.startsWith('pepsi_')) {
        brand = 'pepsi';
        variant = key.replace('pepsi_', '');
      } else if (key.startsWith('coca_cola_')) {
        brand = 'coca_cola';
        variant = key.replace('coca_cola_', '');
      }
      
      if (brand && variant) {
        // Initialize if needed
        if (brand === 'pepsi' && !pepsiRatings[variant]) {
          pepsiRatings[variant] = { sum: 0, count: 0 };
        } else if (brand === 'coca_cola' && !cokeRatings[variant]) {
          cokeRatings[variant] = { sum: 0, count: 0 };
        }
        
        // Add this rating to the sum if it's a valid number
        const rating = Number(response[key]);
        if (!isNaN(rating)) {
          if (brand === 'pepsi') {
            pepsiRatings[variant].sum += rating;
            pepsiRatings[variant].count++;
          } else {
            cokeRatings[variant].sum += rating;
            cokeRatings[variant].count++;
          }
        }
      }
    });
  });

  // Calculate averages
  Object.keys(pepsiRatings).forEach(variant => {
    const { sum, count } = pepsiRatings[variant];
    pepsiRatings[variant] = count > 0 ? sum / count : 0;
  });

  Object.keys(cokeRatings).forEach(variant => {
    const { sum, count } = cokeRatings[variant];
    cokeRatings[variant] = count > 0 ? sum / count : 0;
  });

  // Format variant labels for readability
  const allVariants = [...new Set([...Object.keys(pepsiRatings), ...Object.keys(cokeRatings)])];
  const variantLabels = allVariants.map(v => v.toUpperCase().replace(/_/g, '-'));

  // Create dataset with consistent variants
  const brandRatings = {
    labels: variantLabels,
    datasets: [
      {
        label: 'Coca-Cola',
        data: variantLabels.map(label => {
          const variant = label.toLowerCase().replace(/-/g, '_');
          return cokeRatings[variant] || 0;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Pepsi',
        data: variantLabels.map(label => {
          const variant = label.toLowerCase().replace(/-/g, '_');
          return pepsiRatings[variant] || 0;
        }),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  // Brand perception radar chart - calculate actual data
  const perceptionDimensions = ['taste', 'value', 'quality', 'innovation', 'branding', 'trustworthiness'];
  const perceptionData = {
    'coca_cola': Array(perceptionDimensions.length).fill(0),
    'pepsi': Array(perceptionDimensions.length).fill(0)
  };
  const perceptionCounts = {
    'coca_cola': Array(perceptionDimensions.length).fill(0),
    'pepsi': Array(perceptionDimensions.length).fill(0)
  };

  // Collect perception data
  responses.forEach(response => {
    perceptionDimensions.forEach((dimension, index) => {
      // Look for fields like "coca_cola_taste" or "pepsi_quality"
      ['coca_cola', 'pepsi'].forEach(brand => {
        const fieldName = `${brand}_${dimension}`;
        if (response[fieldName] !== undefined) {
          const rating = Number(response[fieldName]);
          if (!isNaN(rating)) {
            perceptionData[brand][index] += rating;
            perceptionCounts[brand][index]++;
          }
        }
      });
    });
  });

  // Calculate averages
  const cokePerception = perceptionDimensions.map((dim, i) => 
    perceptionCounts['coca_cola'][i] > 0 
      ? perceptionData['coca_cola'][i] / perceptionCounts['coca_cola'][i] 
      : 0
  );

  const pepsiPerception = perceptionDimensions.map((dim, i) => 
    perceptionCounts['pepsi'][i] > 0 
      ? perceptionData['pepsi'][i] / perceptionCounts['pepsi'][i] 
      : 0
  );

  // Use actual data or fall back to defaults if insufficient data
  const brandPerception = {
    labels: perceptionDimensions.map(dim => dim.charAt(0).toUpperCase() + dim.slice(1)),
    datasets: [
      {
        label: 'Coca-Cola',
        data: cokePerception.some(val => val > 0) ? cokePerception : [5.2, 4.8, 5.5, 4.7, 6.1, 5.8],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Pepsi',
        data: pepsiPerception.some(val => val > 0) ? pepsiPerception : [5.4, 5.1, 5.2, 5.3, 5.7, 5.2],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };
  
  // Response trend over time
  // Group responses by day
  const responsesByDay = {};
  responses.forEach(response => {
    if (response.submittedAt) {
      const date = new Date(response.submittedAt).toISOString().split('T')[0];
      responsesByDay[date] = (responsesByDay[date] || 0) + 1;
    }
  });
  
  // Sort dates
  const sortedDates = Object.keys(responsesByDay).sort();
  
  const responseTrend = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Responses',
        data: sortedDates.map(date => responsesByDay[date]),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        fill: true,
      }
    ],
  };

  // Calculate device distribution
  const deviceGroups = {};
  responses.forEach(response => {
    const device = response.device || response.deviceType || 'Unknown';
    deviceGroups[device] = (deviceGroups[device] || 0) + 1;
  });

  const deviceDistribution = {
    labels: Object.keys(deviceGroups),
    datasets: [
      {
        label: 'Device Usage',
        data: Object.values(deviceGroups),
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };

  return {
    ageDistribution,
    genderDistribution,
    brandRatings,
    brandPerception,
    responseTrend,
    deviceDistribution,
  };
}

const AdminPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ageFilter, setAgeFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [sortOption, setSortOption] = useState('date-desc');

  const handleViewDetails = (response) => {
    setSelectedResponse(response);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch analytics data
        const analyticsData = await getSurveyAnalytics();
        setAnalytics(analyticsData);
        
        // Fetch responses
        const responsesData = await getSurveyResponses({ limit: 100 });
        setResponses(responsesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  const handleExportData = () => {
    // Get all responses (use unfiltered data for complete export)
    const dataToExport = responses;
    
    if (!dataToExport.length) {
      alert('No data to export');
      return;
    }
    
    // Analyze all responses to find all possible fields
    const allFields = new Set(['id', 'submittedAt']);
    const demographicFields = new Set();
    const questionFields = new Set();
    
    // First pass - collect all possible field names
    dataToExport.forEach(response => {
      Object.keys(response).forEach(key => {
        if (key !== 'demographics' && key !== 'answers' && key !== 'questions') {
          allFields.add(key);
        }
      });
      
      // Collect demographics fields
      if (response.demographics) {
        Object.keys(response.demographics).forEach(key => {
          demographicFields.add(key);
        });
      }
      
      // Collect question/answer fields
      ['answers', 'questions'].forEach(section => {
        if (response[section]) {
          Object.keys(response[section]).forEach(key => {
            questionFields.add(key);
          });
        }
      });
    });
    
    // Build headers
    const headers = Array.from(allFields);
    
    // Add demographics headers
    Array.from(demographicFields).forEach(field => {
      headers.push(`demographic_${field}`);
    });
    
    // Add question headers
    Array.from(questionFields).forEach(field => {
      headers.push(`question_${field}`);
    });
    
    // Build rows
    const rows = dataToExport.map(response => {
      const row = [];
      
      // Add base fields
      headers.forEach(header => {
        if (header.startsWith('demographic_')) {
          const field = header.replace('demographic_', '');
          const value = response.demographics && response.demographics[field];
          row.push(formatCellValue(value));
        } 
        else if (header.startsWith('question_')) {
          const field = header.replace('question_', '');
          let value = null;
          
          // Check in multiple possible locations
          if (response.answers && response.answers[field] !== undefined) {
            value = response.answers[field];
          } 
          else if (response.questions && response.questions[field] !== undefined) {
            value = response.questions[field];
          }
          
          row.push(formatCellValue(value));
        }
        else {
          // Regular fields
          row.push(formatCellValue(response[header]));
        }
      });
      
      return row;
    });
    
    // Helper function to format cell values
    function formatCellValue(value) {
      if (value === null || value === undefined) {
        return '';
      }
      
      // Format dates
      if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)))) {
        try {
          return new Date(value).toISOString();
        } catch (e) {
          // If date parsing fails, continue with default formatting
        }
      }
      
      // Format arrays
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      
      // Format objects
      if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
      }
      
      // Default case - convert to string
      return String(value);
    }
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => {
        const cellStr = String(cell);
        return cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')
          ? `"${cellStr.replace(/"/g, '""')}"`
          : cellStr;
      }).join(','))
    ].join('\n');
    
    // Download logic
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `complete-survey-data-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log(`Exported ${rows.length} records with ${headers.length} fields`);
  };

  
  
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <DashboardGrid>
              <DashboardCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CardTitle>Total Responses</CardTitle>
                <CardValue>{loading ? '...' : analytics?.totalResponses || 0}</CardValue>
              </DashboardCard>
              
              <DashboardCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <CardTitle>Today's Responses</CardTitle>
                <CardValue>{loading ? '...' : analytics?.todayResponses || 0}</CardValue>
              </DashboardCard>
              
              <DashboardCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CardTitle>Completion Rate</CardTitle>
                <CardValue>N/A</CardValue>
              </DashboardCard>
              
              <DashboardCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CardTitle>Avg. Completion Time</CardTitle>
                <CardValue>N/A</CardValue>
              </DashboardCard>
            </DashboardGrid>
            
            <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>Recent Responses</h2>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Age Group</th>
                    <th>Gender</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center' }}>Loading...</td>
                    </tr>
                  ) : responses.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center' }}>No responses yet</td>
                    </tr>
                  ) : (
                    responses.slice(0, 10).map(response => (
                      <tr key={response.id}>
                        <td>{response.id.substring(0, 8)}...</td>
                        <td>{new Date(response.submittedAt).toLocaleDateString()}</td>
                        <td>{response.demographics?.age || 'N/A'}</td>
                        <td>{response.demographics?.gender || 'N/A'}</td>
                        <td>
                        <ActionButton 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleViewDetails(response)}
                        >
                          View Details
                        </ActionButton>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </TableContainer>
          </>
        );
        
      case 'responses':
        return (
          <>
            <ExportButtonContainer>
              <Button 
                onClick={handleExportData} 
                variant="secondary"
              >
                Export Data (CSV)
              </Button>
            </ExportButtonContainer>
            
            <FilterContainer>
            <FilterSelect 
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
              >
                <option value="">All Age Groups</option>
                <option value="18-">18-</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </FilterSelect>

              <FilterSelect 
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </FilterSelect>

              <FilterSelect 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="date-desc">Date (Newest)</option>
                <option value="date-asc">Date (Oldest)</option>
              </FilterSelect>
            </FilterContainer>
            
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Age Group</th>
                    <th>Gender</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center' }}>Loading...</td>
                    </tr>
                  ) : responses.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center' }}>No responses yet</td>
                    </tr>
                  ) : (
                    getFilteredResponses().map(response => (
                      <tr key={response.id}>
                        <td>{response.id.substring(0, 8)}...</td>
                        <td>{new Date(response.submittedAt).toLocaleDateString()}</td>
                        <td>{response.demographics?.age || 'N/A'}</td>
                        <td>{response.demographics?.gender || 'N/A'}</td>
                        <td>
                        <ActionButton 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleViewDetails(response)}
                        >
                          View Details
                        </ActionButton>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </TableContainer>
          </>
        );
        
        case 'analytics':
          // Skip rendering if no data
          if (loading || !responses || responses.length === 0) {
            return (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <h2 style={{ marginBottom: '1rem', color: 'white' }}>
                  {loading ? 'Loading analytics...' : 'No data available for analysis'}
                </h2>
              </div>
            );
          }
        
          // Process data for analytics
          const processedData = processAnalyticsData(responses);
          
          return (
            <>
              <AnalyticsSection>
                <AnalyticsTitle>Demographics Overview</AnalyticsTitle>
                <ChartGrid>
                  <ChartContainer>
                    <ChartTitle>Age Distribution</ChartTitle>
                    <Bar data={processedData.ageDistribution} options={{
                      plugins: {
                        legend: { position: 'top', labels: { color: 'rgba(255,255,255,0.8)' } },
                        title: { display: false }
                      },
                      responsive: true,
                      scales: {
                        x: { ticks: { color: 'rgba(255,255,255,0.7)' } },
                        y: { ticks: { color: 'rgba(255,255,255,0.7)' } }
                      }
                    }} />
                  </ChartContainer>
                  
                  <ChartContainer>
                    <ChartTitle>Gender Distribution</ChartTitle>
                    <Pie data={processedData.genderDistribution} options={{
                      plugins: {
                        legend: { position: 'right', labels: { color: 'rgba(255,255,255,0.8)' } }
                      },
                      responsive: true
                    }} />
                  </ChartContainer>
                </ChartGrid>
              </AnalyticsSection>
              
              <AnalyticsSection>
                <AnalyticsTitle>Brand Comparison</AnalyticsTitle>
                <ChartGrid>
                  <ChartContainer>
                    <ChartTitle>Average Ratings</ChartTitle>
                    <Bar data={processedData.brandRatings} options={{
                      plugins: {
                        legend: { position: 'top', labels: { color: 'rgba(255,255,255,0.8)' } },
                      },
                      responsive: true,
                      scales: {
                        x: { ticks: { color: 'rgba(255,255,255,0.7)' } },
                        y: { 
                          ticks: { color: 'rgba(255,255,255,0.7)' },
                          min: 0,
                          max: 7
                        }
                      }
                    }} />
                  </ChartContainer>
                  
                  <ChartContainer>
                    <ChartTitle>Brand Perception</ChartTitle>
                    <Radar data={processedData.brandPerception} options={{
                      plugins: {
                        legend: { position: 'top', labels: { color: 'rgba(255,255,255,0.8)' } },
                      },
                      responsive: true,
                      scales: {
                        r: { 
                          ticks: { color: 'rgba(255,255,255,0.7)' },
                          min: 0,
                          max: 7,
                          pointLabels: { color: 'rgba(255,255,255,0.8)' }
                        }
                      }
                    }} />
                  </ChartContainer>
                </ChartGrid>
              </AnalyticsSection>
              
              <AnalyticsSection>
                <AnalyticsTitle>Response Trends</AnalyticsTitle>
                <ChartContainer>
                  <ChartTitle>Responses Over Time</ChartTitle>
                  <Line data={processedData.responseTrend} options={{
                    plugins: {
                      legend: { position: 'top', labels: { color: 'rgba(255,255,255,0.8)' } },
                    },
                    responsive: true,
                    scales: {
                      x: { ticks: { color: 'rgba(255,255,255,0.7)' } },
                      y: { ticks: { color: 'rgba(255,255,255,0.7)' } }
                    }
                  }} />
                </ChartContainer>
              </AnalyticsSection>
            </>
          );
        
      default:
        return null;
    }
  };

  

  const getFilteredResponses = () => {
    return responses
      .filter(response => {
        // Age filter
        if (ageFilter && response.demographics?.age !== ageFilter) {
          return false;
        }
        
        // Gender filter
        if (genderFilter && response.demographics?.gender !== genderFilter) {
          return false;
        }// Add this function before your AdminPage component
function processAnalyticsData(responses) {
  // Age distribution data
  const ageGroups = {};
  responses.forEach(response => {
    const age = response.demographics?.age || 'Unknown';
    ageGroups[age] = (ageGroups[age] || 0) + 1;
  });

  const ageDistribution = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: 'Number of Responses',
        data: Object.values(ageGroups),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Gender distribution data
  const genderGroups = {};
  responses.forEach(response => {
    const gender = response.demographics?.gender || 'Unknown';
    genderGroups[gender] = (genderGroups[gender] || 0) + 1;
  });

  const genderDistribution = {
    labels: Object.keys(genderGroups),
    datasets: [
      {
        data: Object.values(genderGroups),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Brand ratings data
  const pepsiRatings = {};
  const cokeRatings = {};
  
  // Check first response for brand rating fields
  const firstResponse = responses[0] || {};
  const brandFields = Object.keys(firstResponse)
    .filter(key => key.includes('pepsi_') || key.includes('coca_cola_'));
  
  // Group brand fields by variant
  brandFields.forEach(field => {
    let brand, variant;
    
    if (field.includes('pepsi_')) {
      brand = 'pepsi';
      variant = field.replace('pepsi_', '');
    } else if (field.includes('coca_cola_')) {
      brand = 'coca_cola';
      variant = field.replace('coca_cola_', '');
    }
    
    if (brand && variant) {
      // Calculate average rating
      let sum = 0;
      let count = 0;
      
      responses.forEach(response => {
        if (response[field] !== undefined) {
          sum += Number(response[field]);
          count++;
        }
      });
      
      const avg = count > 0 ? sum / count : 0;
      
      if (brand === 'pepsi') {
        pepsiRatings[variant] = avg;
      } else {
        cokeRatings[variant] = avg;
      }
    }
  });
  
  // Format variant labels for readability
  const variantLabels = Object.keys(pepsiRatings).map(v => 
    v.toUpperCase().replace(/_/g, '-')
  );
  
  const brandRatings = {
    labels: variantLabels,
    datasets: [
      {
        label: 'Coca-Cola',
        data: Object.values(cokeRatings),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Pepsi',
        data: Object.values(pepsiRatings),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  // Brand perception radar chart
  const brandPerception = {
    labels: ['Taste', 'Value', 'Quality', 'Innovation', 'Branding', 'Trustworthiness'],
    datasets: [
      {
        label: 'Coca-Cola',
        data: [5.2, 4.8, 5.5, 4.7, 6.1, 5.8], // Replace with actual average values
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Pepsi',
        data: [5.4, 5.1, 5.2, 5.3, 5.7, 5.2], // Replace with actual average values
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };
  
  // Response trend over time
  // Group responses by day
  const responsesByDay = {};
  responses.forEach(response => {
    if (response.submittedAt) {
      const date = new Date(response.submittedAt).toISOString().split('T')[0];
      responsesByDay[date] = (responsesByDay[date] || 0) + 1;
    }
  });
  
  // Sort dates
  const sortedDates = Object.keys(responsesByDay).sort();
  
  const responseTrend = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Responses',
        data: sortedDates.map(date => responsesByDay[date]),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        fill: true,
      }
    ],
  };

  return {
    ageDistribution,
    genderDistribution,
    brandRatings,
    brandPerception,
    responseTrend,
  };
}
        
        return true;
      })
      .sort((a, b) => {
        // Sort by date
        if (sortOption === 'date-asc') {
          return new Date(a.submittedAt) - new Date(b.submittedAt);
        } else {
          return new Date(b.submittedAt) - new Date(a.submittedAt);
        }
      });
  };
  
  return (
    <PageTransition>
      <AdminContainer>
        <PageHeader>
          <PageTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Admin Dashboard
          </PageTitle>
          <PageDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Monitor survey responses, analyze results, and export data for your research.
          </PageDescription>
        </PageHeader>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Tab>
          <Tab 
            active={activeTab === 'responses'} 
            onClick={() => setActiveTab('responses')}
          >
            All Responses
          </Tab>
          <Tab 
            active={activeTab === 'analytics'} 
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </Tab>
        </TabsContainer>
        
        {renderActiveTab()}
      </AdminContainer>
      <ResponseDetailsModal 
        response={selectedResponse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </PageTransition>
  );
};

export default AdminPage;