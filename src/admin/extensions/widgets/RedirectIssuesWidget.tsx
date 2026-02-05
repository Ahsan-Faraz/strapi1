import React, { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { Box, Typography, Flex, Loader } from '@strapi/design-system';

const RedirectIssuesWidget = () => {
  const [data, setData] = useState<{ redirectIssues: number; redirectLoops: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const { get } = useFetchClient();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get('/api/dashboard/stats');
        if (response && response.data) {
          setData(response.data);
        }
      } catch (error: any) {
        console.error('Error fetching dashboard stats:', error);
        setData({ redirectIssues: 0, redirectLoops: 0 });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [get]);

  if (loading) {
    return (
      <Box padding={6} background="neutral0" hasRadius shadow="tableShadow" style={{ minHeight: '140px' }}>
        <Flex justifyContent="center" alignItems="center" style={{ height: '100%' }}>
          <Loader small>Loading...</Loader>
        </Flex>
      </Box>
    );
  }

  const displayData = data || { redirectIssues: 0, redirectLoops: 0 };

  return (
    <Box 
      padding={6} 
      background="neutral0" 
      hasRadius 
      shadow="tableShadow"
      style={{ 
        minHeight: '140px',
        border: '1px solid #eaeaef',
        transition: 'all 0.2s ease'
      }}
    >
      <Flex direction="column" gap={3} style={{ height: '100%' }}>
        <Typography variant="sigma" textColor="neutral600" fontWeight="semiBold" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Redirect Issues
        </Typography>
        <Typography 
          variant="alpha" 
          fontWeight="bold" 
          textColor="warning600" 
          as="h2"
          style={{ fontSize: '48px', lineHeight: '1', margin: 0 }}
        >
          {displayData.redirectIssues}
        </Typography>
        {displayData.redirectLoops > 0 && (
          <Typography variant="pi" textColor="warning700" style={{ fontSize: '14px', marginTop: '4px' }}>
            {displayData.redirectLoops} loops detected
          </Typography>
        )}
      </Flex>
    </Box>
  );
};

export default RedirectIssuesWidget;
