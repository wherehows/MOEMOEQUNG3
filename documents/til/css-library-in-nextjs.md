---
title: 'nextjs에서의 css 라이브러리 '
hashtags: '["css","library"]'
date: '2023-10-3'
debts: '["tailwind는 왜 design system 구축에 강력한가?"]'
---

### nextjs는 기본적으로 css-in-js 사용을 추천하지 않는다

https://nextjs.org/docs/app/building-your-application/styling/css-in-js

### post css

- https://www.freecodecamp.org/news/what-is-postcss/
  css 코드를 ast로 변환하고 이 ast를 분석 및 수정할 수 있는 API를 제공함. post css는 이 자체로서는 아무 기능도 없고, post css가 제공하는 다양한 plugins를 이용해서 린팅, 압축, 프리픽싱 등의 기능을 사용할 수 있음. sass, less, stylus와 같은 pre-processor와 같이 사용 가능하고, 단독으로도 사용 가능함. 참고로 post css는 pre-processor도 아니고 post-processor도 아니다.

### pre-processer and post-processor

- [블로그](https://appletree.or.kr/blog/web-development/css/post-processor%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EA%B9%94%EB%81%94%ED%95%98%EA%B3%A0-%EB%AF%B8%EB%9E%98-%EC%A7%80%ED%96%A5%EC%A0%81%EC%9D%B8-css-%EC%9E%91%EC%84%B1/)
  post-processor가 유용한 점은 vendor-prefixing을 삽입하는데 유용하다.

### nextjs13에서는 linaria는 선택지가 될 수 없을까?

- https://nextjs.org/docs/app/building-your-application/styling/css-in-js
- https://github.com/callstack/linaria/issues/1248

css in js고 zero runtime css인 linaria는 선택지가 될 수 없을까 싶었는데, 문서 어디에도 설명은 안나와있고, 누군가 nextjs13의 swc와 rsc와 함께 사용할 수 있도록 기능을 제공해야한다는 이슈를 열었지만 댓글도 없이 이슈는 closed돼있음.

### CSS Module vs Tailwind

- https://www.polytomic.com/blog-posts/goodbye-css-modules-hello-tailwindcss
- https://fe-developers.kakaoent.com/2022/220210-css-in-kakaowebtoon/?fbclid=IwAR10q4zhGGIdjdd7l9VyDC9Xn0AU0UkoGeDmTyoWotpt6cxn4T6WHLMPkGg
  CSS Module의 장점은 로컬 스코핑을 통해서 CSS 충돌이 나는 것을 막고, 전역으로 CSS가 적용되는 것을 막을 수 있지만 반복적인 CSS 사용이 존재할 수 있음(margin-top이 0인 스타일이 여러 곳에 반복적으로 사용되는 것). 가장 큰 단점은 디자인 시스템 유틸리티의 부족함임.
