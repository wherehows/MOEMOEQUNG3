import styled from '@emotion/styled';
import {
  LAYOUT_PADDING,
  MAIN_LEFT_MARGIN_WIDTH,
  MAIN_PURE_WIDTH,
} from '@/utils/const';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// TODO: 활동한 후기 x 그래프로 만들기
// TODO: FontSize, Font
export const ChartsDetail = ({ data: beforeData }) => {
  const barChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 예제 데이터 배열
    const data = getInformation(beforeData);
    console.log(data);
    // 차트의 크기를 지정합니다.
    const width = 39 * 18; // SVG 컨테이너의 너비
    const height = 500; // SVG 컨테이너의 높이
    const marginTop = 20; // 상단 여백
    const marginRight = 0; // 오른쪽 여백
    const marginBottom = 56; // 하단 여백
    const marginLeft = 40; // 왼쪽 여백

    // 수평 축 스케일과 축 생성기를 만듭니다.
    const x = d3
      .scaleBand() // 범주형 데이터를 위한 스케일 생성
      .domain(
        data
          .sort((d1, d2) => new Date(d1.month) - new Date(d2.month))
          .map(d => d.month),
      ) // 데이터의 letter 값을 정렬하여 도메인으로 설정
      .range([marginLeft, width - marginRight]) // 스케일의 출력 범위를 설정 (여백을 고려)
      .padding(0.1); // 막대 사이의 여백 설정

    const xAxis = d3.axisBottom(x).tickSizeOuter(0); // x 축 생성기 (아래쪽에 위치) 및 외부 틱 크기를 0으로 설정

    // 수직 축 스케일을 만듭니다.
    const y = d3
      .scaleLinear() // 선형 스케일 생성
      .domain([0, d3.max(data, d => d.postCount)]) // 데이터의 최대값을 기반으로 도메인 설정
      .nice() // 도메인 값을 보기 좋은 값으로 자동 조정
      .range([height - marginBottom, marginTop]);

    // 툴팁을 생성합니다.
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.7)')
      .style('color', '#fff')
      .style('padding', '5px 10px')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    // SVG 컨테이너를 만들고 줌 동작을 호출합니다.
    const svg = d3
      .create('svg') // 새로운 SVG 요소 생성
      .attr('viewBox', [0, 0, width, height]) // viewBox 속성을 설정하여 반응형 스케일링 지원
      .attr('width', width) // SVG 요소의 너비 설정
      .attr('height', height) // SVG 요소의 높이 설정
      .attr('style', 'max-width: 100%; height: auto; font-size: 26px'); // CSS 스타일을 설정하여 반응형 디자인 지원

    svg
      .append('g')
      .attr('class', 'bars')
      .attr('fill', '#ababab')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => x(d.month))
      .attr('y', d => y(d.postCount))
      .attr('height', d => y(0) - y(d.postCount))
      .attr('width', x.bandwidth())
      .on('mouseover', function (event, d) {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`Month: ${d.month}<br>Posts: ${d.postCount}`)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');

        event.target.style.cssText = `
          transition: fill, 1.2s;
          fill: #5857ff;
        `;
      })
      .on('mousemove', function (event) {
        tooltip
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function (event) {
        tooltip.transition().duration(500).style('opacity', 0);
        event.target.style.cssText = '';
      });

    // x 축을 추가합니다.
    svg
      .append('g') // 새로운 그룹 요소 추가
      .attr('class', 'x-axis') // 그룹 요소에 "x-axis" 클래스 설정
      .attr('transform', `translate(0,${height - marginBottom})`) // x 축의 위치를 하단으로 이동
      .call(xAxis)
      .selectAll('text')
      .attr('text-anchor', 'middle')
      .attr('dx', '-26px')
      .attr('dy', '-6px')
      .attr('transform', 'rotate(-90)'); // x 축 생성기 호출

    // y 축을 추가합니다.
    svg
      .append('g') // 새로운 그룹 요소 추가
      .attr('class', 'y-axis') // 그룹 요소에 "y-axis" 클래스 설정
      .attr('transform', `translate(${marginLeft},0)`) // y 축의 위치를 왼쪽으로 이동
      .call(
        d3
          .axisLeft(y)
          .tickValues(d3.range(0, d3.max(data, d => d.postCount) + 1, 1))
          .tickFormat(d3.format('d')),
      ); // y 축 생성기 호출 (왼쪽에 위치)

    // 생성된 SVG 요소를 컨테이너에 추가합니다.
    barChartRef.current.append(svg.node());
  }, []);

  return (
    <Wrapper>
      <section>
        <div id="chart-container" ref={barChartRef} />
      </section>
    </Wrapper>
  );
};

const Wrapper = styled('main')(() => ({
  maxWidth: MAIN_PURE_WIDTH,
  paddingBottom: LAYOUT_PADDING,

  height: '100%',
  '@media only screen and (max-width: 960px)': {
    margin: '0 auto',
    padding: LAYOUT_PADDING,
  },
  '@media only screen and (min-width: 961px)': {
    marginLeft: MAIN_LEFT_MARGIN_WIDTH,
  },
}));

const getInformation = postsQueryData => {
  const res = [];
  const temp = {};

  for (let i = 0; i < postsQueryData.nodes.length; i++) {
    const [year, month] = convertUtcToKst(postsQueryData.nodes[i].publishedAt);

    res[`${year}-${month}`] = (res[`${year}-${month}`] || 0) + 1;
  }

  for (const [month, postCount] of Object.entries(res)) {
    res.push({
      month,
      postCount,
    });
  }

  return res;
};

function convertUtcToKst(utcTimeStr) {
  // UTC 시간 문자열을 Date 객체로 변환
  const utcDate = new Date(utcTimeStr);

  // 한국 시간대를 위한 옵션 설정
  const options = {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
  };

  // 한국 시간대로 변환
  const formatter = new Intl.DateTimeFormat('ko-KR', options);
  const parts = formatter.formatToParts(utcDate);

  // 년과 월 추출
  let year = '';
  let month = '';

  for (const part of parts) {
    if (part.type === 'year') {
      year = part.value;
    } else if (part.type === 'month') {
      month = part.value;
    }
  }

  return [year, month];
}
