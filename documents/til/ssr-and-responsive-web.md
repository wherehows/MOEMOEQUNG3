---
title: '서버 사이드 렌더링 조건에서 반응형 웹 개발하는 방법'
hashtags: '["SEO","반응형 웹"]'
date: '2023-10-1'
debts: '[]'
---

내 블로그는 사이드바의 존재로 인해 반응형 구현이 어렵고 중요한 사이트다. 데스크탑에 푸터와 헤더가 보여지는 사이트의 경우 모바일에서도 푸터와 헤더를 남겨놓는데, 본 블로그는 데스크탑에 보여지는 사이드바가 화면 제약으로 인해 모바일에서 보여질 수 없기 때문이다.

본 블로그는 SSR이 적용된 사이트다. 그러므로 서버에서 HTML이 그려져서 내려올 수 있다. 서버는 유저의 viewport를 알고 이에 맞는 HTML을 내려줄 수 있을까? 모른다면 어떻게 SSR을 구현해야 할까?

@artsy/fresnel을 쓸 필요는 없어보인다. artsy/fresnel이 해결하는 점은 보여지지 않아도 되는 반응형 요소까지 마운팅돼서 내부 로직이 실행된다는 점인데, 반응형이 적용되는 사이드바는 오로지 네비게이션만을 위해 사용되어 병목을 일으킬만한 요소가 존재하지 않는다. 만약 리렌더링이 문제라고 한다면 React.memo를 통해 완화가 가능해보인다.

### gatsby는 기본적으로 개발 모드에서 SSR로 동작하지 않음

https://stackoverflow.com/questions/73171646/gatsby-ssr-js-doesnt-seem-to-be-running

### 다크모드 토글도 Client에 의존적인 feature로 flicker 이슈가 있는데, visibility를 이용하여 이슈 해결 가능

https://brianlovin.com/writing/adding-dark-mode-with-next-js

### head 태그에 Client에 의존적인 로직을 먼저 실행해서 flicker 이슈 해결 (이 방향이 진짜 똑똑한듯)

https://victorzhou.com/blog/dark-mode-gatsby/

### media query와 display: none으로 처리하기 (하지만 사용되지 않는 dom 태그들이 mount 된다.)

https://nitayneeman.com/posts/combining-server-side-rendering-and-responsive-design-using-react/

### @artsy/fresenel을 사용하여 퍼포먼스 향상시키기

https://artsy.github.io/blog/2019/05/24/server-rendering-responsively/
display: none인 경우, react 컴포넌트는 어떻게 동작하는지에 대해 처음으로 고민하게 됐다.

display: none인 경우, children으로 react 컴포넌트가 존재한다면 해당 컴포넌트는 mount가 된다. 그리고 해당 컴포넌트 내에 존재하는 useEffect가 의존하는 prop이 변경되는 경우, useEffect 내부 로직이 들어간다.

PureCSS를 쓴다는 말은 display: none을 사용하고, mount와 rerendering 이슈가 발생한다는 의미이다.

@artsy/fresnel는 display: none을 이용하고, mount와 rerendering 이슈를 발생하지 않는다는 점에서 의미가 있는 라이브러리이다.

### display: none이 react에서 어떤 의미를 갖는지는 아래 링크를 확인한다.

https://ssangq.netlify.app/posts/conditional-rendering-vs-diplay-none

https://lovemewithoutall.github.io/it/at-css-display-change-what-happen-in-react/

### 서버에서는 breakpoints를 전부 그리고, 클라이언트에서는 언마운트 하는 것을 추천하고 있다.

https://stackoverflow.com/questions/56229860/conditionally-rendering-markup-jsx-vs-css-display-none-which-is-better-p

### react-responsive는 SSR 상황을 고려하지 않는다

https://medium.com/@houwei.shen/react-02-ssr-vs-responsive-design-f6a90e58c669

https://artsy.github.io/blog/2019/05/24/server-rendering-responsively/

### react-media는 user-agent에 의존하는 신뢰성이 떨어지는 방법을 제안

https://github.com/ReactTraining/react-media

### h1 태그가 두개존재하고 하나는 display: hidden 처리되어있는 경우에 대한 SEO의 처리

https://webmasters.stackexchange.com/questions/81655/two-duplicated-h1-tags-and-one-hidden

### Optional Rendering vs display: none

- https://stackoverflow.com/questions/69009266/react-hiding-vs-removing-components
- https://stackoverflow.com/questions/69915561/performance-and-memory-difference-between-re-mounting-vs-setting-display-none

### 반응형 웹 구현 방법

- https://itnext.io/3-ways-to-implement-responsive-design-in-your-react-app-bcb6ee7eb424
