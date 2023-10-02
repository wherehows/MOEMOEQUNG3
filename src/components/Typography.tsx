import { StrictPropsWithChildren } from '@/types/common';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { CSSProperties, ElementType } from 'react';

type Heading = 'h1' | 'h2' | 'h3';

const headings = ['h1', 'h2', 'h3'] as ArrayOfHeadings;

type ArrayOfHeadings = Heading[] & {
  includes(arg: Variant): arg is Heading;
};

type Variant = Heading | 'label' | 'subtitle' | 'body';

type TypographyProps = (
  | {
      as?: Exclude<ElementType, 'time'>;
    }
  | {
      as: 'time';
      dateTime: string;
    }
) & {
  variant: Variant;
  style?: CSSProperties;
};

const Typography = (props: StrictPropsWithChildren<TypographyProps>) => {
  const { as, children, variant, style } = props;
  const appliedStyle = style || {};

  if (as === 'time' && 'dateTime' in props) {
    const { dateTime } = props;

    return (
      <Time dateTime={dateTime} variant={variant} appliedStyle={appliedStyle}>
        {children}
      </Time>
    );
  }

  return (
    <Wrapper
      as={as || (headings.includes(variant) ? variant : 'div')}
      appliedStyle={appliedStyle}
      variant={variant}
    >
      {children}
    </Wrapper>
  );
};

export default Typography;

const Wrapper = styled('div')<{
  variant: Variant;
  appliedStyle: CSSProperties;
}>(({ appliedStyle, variant, theme }) => ({
  ...appliedStyle,
  ...getStyle(variant, theme),
}));

const Time = styled('time')<{ appliedStyle: CSSProperties; variant: Variant }>(
  ({ theme, variant, appliedStyle }) => ({
    ...appliedStyle,
    ...theme.typography[variant],
  }),
);

const getStyle = (variant: Variant, theme: Theme) =>
  theme.typography[variant] || {};
