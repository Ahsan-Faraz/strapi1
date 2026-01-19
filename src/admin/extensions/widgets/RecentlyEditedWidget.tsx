import React, { useState, useEffect } from 'react';
import { Widget } from '@strapi/admin/strapi-admin';
import { useFetchClient } from '@strapi/helper-plugin';
import { Box, Typography, Flex, Button, Badge } from '@strapi/design-system';
import { Link } from 'react-router-dom';

interface RecentActivity {
  id: number;
  title: string;
  slug: string;
  type: string;
  action: string;
  updatedBy: string;
  timeAgo: string;
}

const RecentlyEditedWidget = () => {
  const [data, setData] = useState<{ recentActivities: RecentActivity[] } | null>(null);
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
  if (!data || !data.recentActivities.length) return <Widget.NoData />;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Location':
        return { backgroundColor: 'success100', textColor: 'success700' };
      case 'Blog':
        return { backgroundColor: 'primary100', textColor: 'primary700' };
      default:
        return { backgroundColor: 'primary100', textColor: 'primary700' };
    }
  };

  const getCollectionTypePath = (type: string) => {
    switch (type) {
      case 'Page':
        return '/admin/content-manager/collection-types/api::page.page';
      case 'Location':
        return '/admin/content-manager/collection-types/api::location.location';
      case 'Blog':
        return '/admin/content-manager/collection-types/api::blog-post.blog-post';
      default:
        return '/admin/content-manager';
    }
  };

  return (
    <Box padding={4} background="neutral0" hasRadius shadow="tableShadow">
      <Flex direction="column" gap={3}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="sigma" textColor="neutral600">
              Recently Edited Pages
            </Typography>
            <Typography variant="pi" textColor="neutral600" style={{ marginTop: '4px' }}>
              Latest activities across teams.
            </Typography>
          </Box>
          <Button variant="tertiary" size="S">
            Activity Log
          </Button>
        </Flex>

        <Flex direction="column" gap={2}>
          {data.recentActivities.map((activity) => {
            const typeColors = getTypeColor(activity.type);
            return (
              <Box
                key={activity.id}
                padding={3}
                background="neutral100"
                hasRadius
                style={{ cursor: 'pointer' }}
                as={Link}
                to={`${getCollectionTypePath(activity.type)}/${activity.id}`}
              >
                <Flex direction="column" gap={1}>
                  <Flex alignItems="center" gap={2}>
                    <Badge
                      backgroundColor={typeColors.backgroundColor}
                      textColor={typeColors.textColor}
                    >
                      {activity.type}
                    </Badge>
                    <Typography variant="pi" fontWeight="semiBold" textColor="neutral800">
                      {activity.title}
                    </Typography>
                  </Flex>
                  <Typography variant="pi" textColor="neutral600" style={{ fontSize: '12px' }}>
                    /{activity.slug}
                  </Typography>
                  <Typography variant="pi" textColor="neutral500" style={{ fontSize: '11px' }}>
                    {activity.action} by {activity.updatedBy} · {activity.timeAgo}
                  </Typography>
                </Flex>
              </Box>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};

export default RecentlyEditedWidget;
