import React, { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { Box, Typography, Flex, Button, Loader } from '@strapi/design-system';
import { Link } from 'react-router-dom';

const MissingMetaTitlesWidget = () => {
  const [data, setData] = useState<{ missingMetaTitles: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const { get } = useFetchClient();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get('/api/dashboard/stats');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
          Missing Meta Titles
        </Typography>
        <Typography variant="alpha" fontWeight="bold" textColor="danger600" as="h2">
          {data.missingMetaTitles}
        </Typography>
        <Button variant="tertiary" size="S" as={Link} to="/admin/content-manager/collection-types/api::page.page">
          Prioritize today
        </Button>
      </Flex>
    </Box>
  );
};

export default MissingMetaTitlesWidget;
