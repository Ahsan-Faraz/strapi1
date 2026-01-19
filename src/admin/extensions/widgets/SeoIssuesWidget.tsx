import React, { useState, useEffect } from 'react';
import { Widget } from '@strapi/admin/strapi-admin';
import { useFetchClient } from '@strapi/helper-plugin';
import { Box, Typography, Flex, Button, Badge } from '@strapi/design-system';
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

  if (loading) return <Widget.Loading />;
  if (!data) return <Widget.NoData />;

  return (
    <Box padding={4} background="neutral0" hasRadius shadow="tableShadow">
      <Flex direction="column" gap={3}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="sigma" textColor="neutral600">
              Open SEO Issues
            </Typography>
            <Typography variant="pi" textColor="neutral600" style={{ marginTop: '4px' }}>
              Automatically flagged problems that need attention.
            </Typography>
          </Box>
          <Button variant="tertiary" size="S">
            View All
          </Button>
        </Flex>

        <Box padding={3} background="neutral100" hasRadius>
          <Flex justifyContent="space-between" alignItems="center" style={{ marginBottom: '8px' }}>
            <Flex direction="column" gap={1}>
              <Typography variant="pi" fontWeight="semiBold">
                Pages Missing Schema
              </Typography>
              <Typography variant="pi" textColor="neutral600">
                {data.missingSchemaPages} landing pages
              </Typography>
            </Flex>
            <Button variant="tertiary" size="S">
              Fix now
            </Button>
          </Flex>
        </Box>

        <Box padding={3} background="neutral100" hasRadius>
          <Flex justifyContent="space-between" alignItems="center" style={{ marginBottom: '8px' }}>
            <Flex direction="column" gap={1}>
              <Flex alignItems="center" gap={2}>
                <Typography variant="pi" fontWeight="semiBold">
                  Noindex Pages
                </Typography>
                {data.newNoindexPages > 0 && (
                  <Badge textColor="warning600" backgroundColor="warning100">
                    {data.newNoindexPages} new
                  </Badge>
                )}
              </Flex>
              <Typography variant="pi" textColor="neutral600">
                {data.noindexPages} pages set to noindex
              </Typography>
            </Flex>
            <Button variant="secondary" size="S">
              Review
            </Button>
          </Flex>
        </Box>

        <Box padding={3} background="neutral100" hasRadius>
          <Flex justifyContent="space-between" alignItems="center" style={{ marginBottom: '8px' }}>
            <Flex direction="column" gap={1}>
              <Flex alignItems="center" gap={2}>
                <Typography variant="pi" fontWeight="semiBold">
                  OG Images Missing
                </Typography>
                <Badge textColor="danger600" backgroundColor="danger100">
                  High
                </Badge>
              </Flex>
              <Typography variant="pi" textColor="neutral600">
                {data.missingOgImages} social shares impacted
              </Typography>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default SeoIssuesWidget;
