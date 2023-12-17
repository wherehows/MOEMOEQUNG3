import { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import styled from '@emotion/styled';
import { isOnDevelopment } from '@/utils/helpers';

interface ViewCounter {
  slug: string;
}

const ViewCounter = ({ slug }: ViewCounter) => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    if (isOnDevelopment()) {
      return;
    }

    const onViews = (newViews: firebase.database.DataSnapshot) => {
      setViewCount(newViews.val());
    };

    incrementViews(slug);

    firebase.database().ref(`/views`).child(slug).on(`value`, onViews);

    return () => {
      if (firebase.database()) {
        firebase.database().ref(`/views`).child(slug).off(`value`, onViews);
      }
    };
  }, [slug]);

  return <View>{viewCount} views</View>;
};

export default ViewCounter;

const incrementViews = async (slug: ViewCounter['slug']) => {
  const ref = firebase.database().ref(`/views`).child(slug);

  ref.transaction(currentViews => {
    return currentViews + 1;
  });
};

const View = styled('div')(({ theme }) => ({
  ...theme.typography.label,
  color: 'var(--colors-grey-03)',
}));
