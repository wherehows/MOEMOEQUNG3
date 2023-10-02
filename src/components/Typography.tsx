import { StrictPropsWithChildren } from '@/types/common';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { ElementType } from 'react';

type Heading = 'h1' | 'h2' | 'h3';

type Variant = Heading | 'label' | 'subtitle' | 'body';

interface TypographyProps {
  variant?: Variant;
  as?: ElementType;
}

const semantic = ['h1', 'h2', 'h3'];

const Typography = ({
  children,
  as,
  variant = 'body',
}: StrictPropsWithChildren<TypographyProps>) => {
  return (
    <Wrapper
      as={as || (semantic.includes(variant) ? (variant as Heading) : 'div')}
      variant={variant}
    >
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
