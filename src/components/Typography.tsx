import { StrictPropsWithChildren } from '@customTypes/common';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { ElementType } from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'label' | 'body';

interface TypographyProps {
  variant?: Variant;
  as?: ElementType;
}

const Typography = ({
  children,
  as,
  variant = 'body',
}: StrictPropsWithChildren<TypographyProps>) => {
  return (
    <Wrapper as={as} variant={variant}>
      {children}
    </Wrapper>
  );
};

export default Typography;

const Wrapper = styled('div')<{ variant: Variant }>(({ variant, theme }) => ({
  ...getStyle(variant, theme),
}));

const getStyle = (variant: Variant, theme: Theme) =>
  theme.typography[variant] || {};
