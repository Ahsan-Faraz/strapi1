import React, { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { Box, Typography, Flex, Loader } from '@strapi/design-system';

const TotalPagesWidget = () => {
  const [data, setData] = useState<{ totalPages: number; pagesThisWeek: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const { get } = useFetchClient();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await get('/api/dashboard/stats', { signal: controller.signal });
        if (isMounted && response && response.data) {
          setData(response.data);
        }
      } catch (error: any) {
        if (error?.name === 'AbortError' || controller.signal.aborted) return;
        console.error('TotalPagesWidget: Error fetching dashboard stats:', error);
        if (isMounted) setData({ totalPages: 0, pagesThisWeek: 0 });
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <Box padding={6} background="neutral0" hasRadius shadow="tableShadow" style={{ minHeight: '140px' }}>
        <Flex justifyContent="center" alignItems="center" style={{ height: '100%' }}>
          <Loader small>Loading...</Loader>
        </Flex>
      </Box>
    );
  }

  const displayData = data || { totalPages: 0, pagesThisWeek: 0 };

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
          Total Pages
        </Typography>
        <Typography 
          variant="alpha" 
          fontWeight="bold" 
          textColor="neutral800" 
          as="h2"
          style={{ fontSize: '48px', lineHeight: '1', margin: 0 }}
        >
          {displayData.totalPages}
        </Typography>
        {displayData.pagesThisWeek > 0 && (
          <Typography variant="pi" textColor="success600" fontWeight="semiBold" style={{ fontSize: '14px', marginTop: '4px' }}>
            +{displayData.pagesThisWeek} this week
          </Typography>
        )}
      </Flex>
    </Box>
  );
};

export default TotalPagesWidget;
