import React, { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { Box, Typography, Flex, Button, Badge, Loader } from '@strapi/design-system';
import { Link } from 'react-router-dom';

const SeoIssuesWidget = () => {
  const [data, setData] = useState<{
    missingSchemaPages: number;
    noindexPages: number;
    newNoindexPages: number;
    missingOgImages: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const { get } = useFetchClient();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get('/dashboard/stats');
        if (response && response.data) {
          setData(response.data);
        }
      } catch (error: any) {
        console.error('Error fetching dashboard stats:', error);
        setData({ missingSchemaPages: 0, noindexPages: 0, newNoindexPages: 0, missingOgImages: 0 });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [get]);

  if (loading) {
    return (
      <Box padding={6} background="neutral0" hasRadius shadow="tableShadow" style={{ minHeight: '300px' }}>
        <Flex justifyContent="center" alignItems="center" style={{ height: '100%' }}>
          <Loader small>Loading...</Loader>
        </Flex>
      </Box>
    );
  }

  const displayData = data || { missingSchemaPages: 0, noindexPages: 0, newNoindexPages: 0, missingOgImages: 0 };

  return (
    <Box padding={6} background="neutral0" hasRadius shadow="tableShadow" style={{ border: '1px solid #eaeaef' }}>
      <Flex direction="column" gap={4}>
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="sigma" textColor="neutral800" fontWeight="semiBold" style={{ fontSize: '14px', marginBottom: '4px' }}>
              Open SEO Issues
            </Typography>
            <Typography variant="pi" textColor="neutral600" style={{ fontSize: '12px' }}>
              Automatically flagged problems that need attention.
            </Typography>
          </Box>
          <Button variant="tertiary" size="S" style={{ fontSize: '12px' }}>
            View All
          </Button>
        </Flex>

        <Box padding={4} background="neutral100" hasRadius style={{ border: '1px solid #eaeaef' }}>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex direction="column" gap={1}>
              <Typography variant="pi" fontWeight="semiBold" style={{ fontSize: '14px' }}>
                Pages Missing Schema
              </Typography>
              <Typography variant="pi" textColor="neutral600" style={{ fontSize: '13px' }}>
                {displayData.missingSchemaPages} landing pages
              </Typography>
            </Flex>
            <Button variant="tertiary" size="S" style={{ fontSize: '12px', color: '#4945ff' }}>
              Fix now
            </Button>
          </Flex>
        </Box>

        <Box padding={4} background="neutral100" hasRadius style={{ border: '1px solid #eaeaef' }}>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex direction="column" gap={1}>
              <Flex alignItems="center" gap={2}>
                <Typography variant="pi" fontWeight="semiBold" style={{ fontSize: '14px' }}>
                  Noindex Pages
                </Typography>
                {displayData.newNoindexPages > 0 && (
                  <Badge textColor="warning700" backgroundColor="warning100" style={{ fontSize: '10px', padding: '2px 6px' }}>
                    {displayData.newNoindexPages} new
                  </Badge>
                )}
              </Flex>
              <Typography variant="pi" textColor="neutral600" style={{ fontSize: '13px' }}>
                {displayData.noindexPages} pages set to noindex
              </Typography>
            </Flex>
            <Button variant="secondary" size="S" style={{ fontSize: '12px', backgroundColor: '#f6f6f9', color: '#32324d' }}>
              Review
            </Button>
          </Flex>
        </Box>

        <Box padding={4} background="neutral100" hasRadius style={{ border: '1px solid #eaeaef' }}>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex direction="column" gap={1}>
              <Flex alignItems="center" gap={2}>
                <Typography variant="pi" fontWeight="semiBold" style={{ fontSize: '14px' }}>
                  OG Images Missing
                </Typography>
                <Badge textColor="danger700" backgroundColor="danger100" style={{ fontSize: '10px', padding: '2px 6px' }}>
                  High
                </Badge>
              </Flex>
              <Typography variant="pi" textColor="neutral600" style={{ fontSize: '13px' }}>
                {displayData.missingOgImages} social shares impacted
              </Typography>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default SeoIssuesWidget;
