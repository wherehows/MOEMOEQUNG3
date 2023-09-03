import { StrictPropsWithChildren } from '@customTypes/common';
import styled from '@emotion/styled';
import { CSSProperties, ElementType } from 'react';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'logo'
  | 'label'
  | 'subtitle'
  | 'body'
  | 'div';

interface TypographyProps {
  variant?: Variant;
  as: ElementType;
  style?: CSSProperties;
}

const Typography = ({
  children,
  as,
  style,
  variant = 'div',
}: StrictPropsWithChildren<TypographyProps>) => {
  return (
    <Wrapper as={as} variant={variant} style={style}>
      {children}
    </Wrapper>
  );
};

export default Typography;

const Wrapper = styled('div')<{ variant: Variant }>(({ variant }) => ({
  ...getStyle(variant),
}));

const getStyle = (variant: Variant) => {
  switch (variant) {
    case 'h1':
      return { fontSize: '30px', fontWeight: 700 };
    case 'h2':
      return { fontSize: '22px', fontWeight: 600 };
    case 'h3':
      return { fontSize: '18px', fontWeight: 500 };
    case 'logo':
      return { fontSize: '30px', fontWeight: 700 };
    case 'label':
      return { fontSize: '14px', fontWeight: 500 };
    case 'body':
      return { fontSize: '16px', fontWeight: 500 };
    default:
      return {};
  }
};
