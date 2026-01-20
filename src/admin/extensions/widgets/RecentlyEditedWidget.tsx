import React, { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { Box, Typography, Flex, Button, Badge, Loader } from '@strapi/design-system';
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
        const response = await get('/dashboard/stats');
        if (response && response.data) {
          setData(response.data);
        }
      } catch (error: any) {
        console.error('Error fetching dashboard stats:', error);
        setData({ recentActivities: [] });
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

  const displayData = data || { recentActivities: [] };
  
  if (!displayData.recentActivities || displayData.recentActivities.length === 0) {
    return (
      <Box padding={6} background="neutral0" hasRadius shadow="tableShadow" style={{ border: '1px solid #eaeaef', width: '100%' }}>
        <Flex direction="column" gap={3} style={{ width: '100%' }}>
          <Flex justifyContent="space-between" alignItems="flex-start" style={{ width: '100%', gap: '16px' }}>
            <Box style={{ flex: '1', minWidth: 0 }}>
              <Typography variant="sigma" textColor="neutral800" fontWeight="semiBold" style={{ fontSize: '14px', marginBottom: '4px', display: 'block' }}>
                Recently Edited Pages
              </Typography>
              <Typography variant="pi" textColor="neutral600" style={{ fontSize: '12px', display: 'block' }}>
                Latest activities across teams.
              </Typography>
            </Box>
            <Button variant="tertiary" size="S" style={{ fontSize: '12px', flexShrink: 0, whiteSpace: 'nowrap' }}>
              Activity Log
            </Button>
          </Flex>
          <Typography textColor="neutral600" style={{ fontSize: '13px', padding: '20px 0', display: 'block', textAlign: 'center' }}>
            No recent activities
          </Typography>
        </Flex>
      </Box>
    );
  }

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
    <Box padding={6} background="neutral0" hasRadius shadow="tableShadow" style={{ border: '1px solid #eaeaef', width: '100%' }}>
      <Flex direction="column" gap={4} style={{ width: '100%' }}>
        <Flex justifyContent="space-between" alignItems="flex-start" style={{ width: '100%', gap: '16px' }}>
          <Box style={{ flex: '1', minWidth: 0 }}>
            <Typography variant="sigma" textColor="neutral800" fontWeight="semiBold" style={{ fontSize: '14px', marginBottom: '4px', display: 'block' }}>
              Recently Edited Pages
            </Typography>
            <Typography variant="pi" textColor="neutral600" style={{ fontSize: '12px', display: 'block' }}>
              Latest activities across teams.
            </Typography>
          </Box>
          <Button variant="tertiary" size="S" style={{ fontSize: '12px', flexShrink: 0, whiteSpace: 'nowrap' }}>
            Activity Log
          </Button>
        </Flex>

        <Flex direction="column" gap={3} style={{ width: '100%' }}>
          {displayData.recentActivities.map((activity: RecentActivity) => {
            const typeColors = getTypeColor(activity.type);
            return (
              <Box
                key={activity.id}
                padding={4}
                background="neutral100"
                hasRadius
                style={{ cursor: 'pointer', border: '1px solid #eaeaef', transition: 'all 0.2s ease', width: '100%' }}
                as={Link}
                to={`${getCollectionTypePath(activity.type)}/${activity.id}`}
              >
                <Flex direction="column" gap={1.5} style={{ width: '100%' }}>
                  <Flex alignItems="center" gap={2} style={{ flexWrap: 'wrap' }}>
                    <Badge
                      backgroundColor={typeColors.backgroundColor}
                      textColor={typeColors.textColor}
                      style={{ fontSize: '11px', padding: '2px 8px', fontWeight: '600', flexShrink: 0 }}
                    >
                      {activity.type}
                    </Badge>
                    <Typography 
                      variant="pi" 
                      fontWeight="semiBold" 
                      textColor="neutral800" 
                      style={{ fontSize: '14px', flex: '1', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {activity.title}
                    </Typography>
                  </Flex>
                  <Typography variant="pi" textColor="neutral600" style={{ fontSize: '12px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    /{activity.slug}
                  </Typography>
                  <Typography variant="pi" textColor="neutral500" style={{ fontSize: '12px', display: 'block' }}>
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
