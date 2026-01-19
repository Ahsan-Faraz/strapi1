import React, { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { Box, Typography, Flex, Loader } from '@strapi/design-system';

const TotalPagesWidget = () => {
  const [data, setData] = useState<{ totalPages: number; pagesThisWeek: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const { get } = useFetchClient();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('TotalPagesWidget: Fetching dashboard stats...');
        const response = await get('/api/dashboard/stats');
        console.log('TotalPagesWidget: Received data:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('TotalPagesWidget: Error fetching dashboard stats:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [get]);

  if (loading) {
    return (
      <Box padding={4} background="neutral0" hasRadius shadow="tableShadow">
        <Flex justifyContent="center" padding={4}>
          <Loader small>Loading content...</Loader>
        </Flex>
      </Box>
    );
  }
  if (!data) {
    return (
      <Box padding={4} background="neutral0" hasRadius shadow="tableShadow">
        <Typography textColor="neutral600">No data available</Typography>
      </Box>
    );
  }

  return (
    <Box padding={4} background="neutral0" hasRadius shadow="tableShadow">
      <Flex direction="column" gap={2}>
        <Typography variant="sigma" textColor="neutral600">
          Total Pages
        </Typography>
        <Typography variant="alpha" fontWeight="bold" textColor="neutral800" as="h2">
          {data.totalPages}
        </Typography>
        <Typography variant="pi" textColor="success600" fontWeight="semiBold">
          +{data.pagesThisWeek} this week
        </Typography>
      </Flex>
    </Box>
  );
};

export default TotalPagesWidget;
