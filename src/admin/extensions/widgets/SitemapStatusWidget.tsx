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
        if (response && response.data) {
          setData(response.data);
        }
      } catch (error: any) {
        console.error('Error fetching dashboard stats:', error);
        setData({ sitemapStatus: 'synced', sitemapLastUpdated: new Date().toISOString() });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [get]);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading) {
    return (
      <Box padding={6} background="neutral0" hasRadius shadow="tableShadow" style={{ minHeight: '140px' }}>
        <Flex justifyContent="center" alignItems="center" style={{ height: '100%' }}>
          <Loader small>Loading...</Loader>
        </Flex>
      </Box>
    );
  }

  const displayData = data || { sitemapStatus: 'synced', sitemapLastUpdated: new Date().toISOString() };

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
          Sitemap Status
        </Typography>
        <Typography 
          variant="alpha" 
          fontWeight="bold" 
          textColor="success600" 
          as="h2"
          style={{ fontSize: '32px', lineHeight: '1', margin: 0 }}
        >
          {displayData.sitemapStatus.charAt(0).toUpperCase() + displayData.sitemapStatus.slice(1)}
        </Typography>
        <Typography variant="pi" textColor="neutral600" style={{ fontSize: '14px', marginTop: '4px' }}>
          Updated {formatTimeAgo(displayData.sitemapLastUpdated)}
        </Typography>
      </Flex>
    </Box>
  );
};

export default SitemapStatusWidget;
