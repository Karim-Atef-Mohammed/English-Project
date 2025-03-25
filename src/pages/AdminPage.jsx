import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { getSurveyResponses, getSurveyAnalytics } from '../firebase/firestore';
import PageTransition from '../components/animations/PageTransition';
import Button from '../components/ui/Button';

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
`;

const AdminPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
    // Create a CSV from the responses
    let csv = 'data:text/csv;charset=utf-8,';
    
    // Add headers
    const headers = ['ID', 'Submission Date', 'Age Group', 'Gender', 'Education', 'Field'];
    csv += headers.join(',') + '\r\n';
    
    // Add rows
    responses.forEach(response => {
      const row = [
        response.id,
        response.submittedAt,
        response.demographics?.age || '',
        response.demographics?.gender || '',
        response.demographics?.education || '',
        response.demographics?.field || ''
      ];
      csv += row.join(',') + '\r\n';
    });
    
    // Create download link
    const encodedUri = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'chromatic_shift_survey_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                <CardValue>92%</CardValue>
              </DashboardCard>
              
              <DashboardCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CardTitle>Avg. Completion Time</CardTitle>
                <CardValue>8:42</CardValue>
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
                    <th>Education</th>
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
                        <td>{response.demographics?.education || 'N/A'}</td>
                        <td>
                          <ActionButton variant="secondary" size="sm">
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
              <FilterSelect>
                <option value="">All Age Groups</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </FilterSelect>
              
              <FilterSelect>
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </FilterSelect>
              
              <FilterSelect>
                <option value="">Sort By</option>
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
                    <th>Education</th>
                    <th>Field</th>
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
                    responses.map(response => (
                      <tr key={response.id}>
                        <td>{response.id.substring(0, 8)}...</td>
                        <td>{new Date(response.submittedAt).toLocaleDateString()}</td>
                        <td>{response.demographics?.age || 'N/A'}</td>
                        <td>{response.demographics?.gender || 'N/A'}</td>
                        <td>{response.demographics?.education || 'N/A'}</td>
                        <td>{response.demographics?.field || 'N/A'}</td>
                        <td>
                          <ActionButton variant="secondary" size="sm">
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
        return (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <h2 style={{ marginBottom: '1rem', color: 'white' }}>Analytics Dashboard</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Advanced analytics visualizations will be implemented here, including:<br/>
              - Color preference distribution charts<br/>
              - Demographic breakdown of responses<br/>
              - Brand perception comparison results<br/>
              - Emotion response analysis
            </p>
          </div>
        );
        
      default:
        return null;
    }
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
    </PageTransition>
  );
};

export default AdminPage;