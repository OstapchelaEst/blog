import { Skeleton, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/content-or-skeleton-animation.scss';

interface AnimationEvent<T = Element> extends React.SyntheticEvent<T> {
  animationName: string;
  elapsedTime: number;
  pseudoElement: string;
}

export const ContentOrSkeleton = (
  isLoading: boolean,
  value: string | number,
  width: string | number = '75%',
  height: string | number = 25
): JSX.Element => {
  const skeletonRef = useRef<HTMLElement>(null);
  const valueRef = useRef<HTMLElement>(null);
  const [switchContent, setSwitchContent] = useState<'skeleton' | 'content'>('skeleton');

  const handleAnimationEnd = (e: AnimationEvent<HTMLSpanElement>) => {
    if (e.animationName === 'fadeSkeleton') {
      setSwitchContent('content');
    }
  };

  useEffect(() => {
    const skeleton = skeletonRef.current;
    skeleton?.classList.add('fade-animation-skeleton');
  }, [isLoading]);

  useEffect(() => {
    if (valueRef.current) {
      if (switchContent === 'content') valueRef.current.classList.add('fade-animation-value');
    }
  }, [switchContent]);

  return (
    <>
      {switchContent === 'skeleton' && (
        <Skeleton
          ref={skeletonRef}
          width={width}
          height={height}
          animation="wave"
          onAnimationEnd={handleAnimationEnd}
        />
      )}
      {switchContent === 'content' && (
        <Typography minHeight={height} ref={valueRef}>
          {value}
        </Typography>
      )}
    </>
  );
};
