import { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import styled from '@emotion/styled';
import { isOnDevelopment } from '@utils/helpers';

interface ViewCounter {
  pathname: string;
}

const ViewCounter = ({ pathname }: ViewCounter) => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    if (isOnDevelopment()) {
      return;
    }

    const onViews = (newViews: firebase.database.DataSnapshot) => {
      setViewCount(newViews.val());
    };

    incrementViews(pathname);

    firebase.database().ref(`/views`).child(pathname).on(`value`, onViews);

    return () => {
      if (firebase.database()) {
        firebase.database().ref(`/views`).child(pathname).off(`value`, onViews);
      }
    };
  }, [pathname]);

  return <View>{viewCount} views</View>;
};

export default ViewCounter;

const incrementViews = async (pathname: ViewCounter['pathname']) => {
  const ref = firebase.database().ref(`/views`).child(pathname);

  ref.transaction(currentViews => {
    return currentViews + 1;
  });
};

const View = styled('div')(({ theme }) => ({
  ...theme.typography.label,
  color: '#7e7e7e',
}));
