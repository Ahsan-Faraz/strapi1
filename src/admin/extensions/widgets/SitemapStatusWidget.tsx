import React, { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { Box, Typography, Flex, Loader } from '@strapi/design-system';

const SitemapStatusWidget = () => {
  const [data, setData] = useState<{ sitemapStatus: string; sitemapLastUpdated: string } | null>(null);
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

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Box padding={4} background="neutral0" hasRadius shadow="tableShadow">
      <Flex direction="column" gap={2}>
        <Typography variant="sigma" textColor="neutral600">
          Sitemap Status
        </Typography>
        <Typography variant="alpha" fontWeight="bold" textColor="success600" as="h2">
          {data.sitemapStatus.charAt(0).toUpperCase() + data.sitemapStatus.slice(1)}
        </Typography>
        <Typography variant="pi" textColor="neutral600">
          Updated {formatTimeAgo(data.sitemapLastUpdated)}
        </Typography>
      </Flex>
    </Box>
  );
};

export default SitemapStatusWidget;
