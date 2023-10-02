import styled from '@emotion/styled';
import { MAIN_LEFT_MARGIN_WIDTH, MAIN_PURE_WIDTH } from '@/utils/const';
import { useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import Typography from './Typography';
import Remove from '@/assets/remove.svg';

let isSubmittedByEnter = false;

export const WriterContent = () => {
  const [value, setValue] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [debts, setDebts] = useState<string[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const filenameRef = useRef<HTMLInputElement>(null);
  const hashtagRef = useRef<HTMLInputElement>(null);
  const debtRef = useRef<HTMLInputElement>(null);

  return (
    <Wrapper>
      <Typography variant="h1">md 생성 페이지</Typography>
      <Form
        onKeyDown={e => {
          isSubmittedByEnter =
            e.key === 'Enter' || e.keyCode === 13 ? true : false;
        }}
        onSubmit={e => {
          e.preventDefault();

          if (isSubmittedByEnter) {
            isSubmittedByEnter = true;
            return false;
          }

          const link = document.createElement('a');
          const title = titleRef.current?.value || '';
          const filename = filenameRef.current?.value || '';
          const today = new Date();

          const mdContent = `---
title: '${title}'
hashtags: '${JSON.stringify(hashtags)}'
date: '${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}'
debts: '${JSON.stringify(debts)}'
---

${value}
`;
          const file = new Blob([mdContent], { type: 'text/plain' });

          link.href = URL.createObjectURL(file);
          link.download = `${filename}.md`;
          link.click();
          URL.revokeObjectURL(link.href);
        }}
      >
        <FormControl>
          <label htmlFor="title">제목</label>
          <input ref={titleRef} id="title" />
        </FormControl>
        <FormControl>
          <label htmlFor="filename">파일명</label>
          <input ref={filenameRef} id="filename" />
        </FormControl>
        <FormControl>
          <label htmlFor="hashtag">해쉬테그</label>
          <input
            id="hashtag"
            ref={hashtagRef}
            onKeyDown={e => {
              const $input = hashtagRef.current as HTMLInputElement;

              if (
                (e.key === 'Enter' || e.keyCode === 13) &&
                !e.nativeEvent.isComposing
              ) {
                setHashtags([...hashtags, $input.value || '']);
                $input.value = '';
              }
            }}
          />
          <HashtagList>
            {hashtags.map((hashtag, index) => (
              <Hashtag key={index}>
                {hashtag}
                <DeleteButton
                  type="button"
                  onClick={() => {
                    setHashtags(hashtags.filter((_, i) => i !== index));
                  }}
                >
                  <RemoveIcon />
                </DeleteButton>
              </Hashtag>
            ))}
          </HashtagList>
        </FormControl>
        <FormControl>
          <label htmlFor="content">내용</label>
          <MDEditor
            id="content"
            preview="edit"
            value={value}
            onChange={value => setValue(value || '')}
            hideToolbar
          />
        </FormControl>
        <FormControl>
          <label htmlFor="debt">부채</label>
          <input
            id="debt"
            ref={debtRef}
            onKeyDown={e => {
              const $input = debtRef.current as HTMLInputElement;

              if (
                (e.key === 'Enter' || e.keyCode === 13) &&
                !e.nativeEvent.isComposing
              ) {
                setDebts([...debts, $input.value]);
                $input.value = '';
              }
            }}
          />
          <DebtList>
            {debts.map((debt, index) => (
              <Debt key={index}>
                {debt}
                <DeleteButton
                  type="button"
                  onClick={() => {
                    setDebts(debts.filter((_, i) => i !== index));
                  }}
                >
                  <RemoveIcon />
                </DeleteButton>
              </Debt>
            ))}
          </DebtList>
        </FormControl>
        <CreateButton type="submit">생성</CreateButton>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled('main')(() => ({
  width: MAIN_PURE_WIDTH,
  height: '100%',
  '@media only screen and (max-width: 960px)': {
    margin: '0 auto',
  },
  '@media only screen and (min-width: 961px)': {
    marginLeft: MAIN_LEFT_MARGIN_WIDTH,
  },
}));

const Form = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const FormControl = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '12px',
}));

const HashtagList = styled('ul')(() => ({
  display: 'flex',
  marginTop: '8px',
}));

const Hashtag = styled('li')(() => ({
  border: '0.8px solid',
  borderRadius: '24px',
  margin: '0 4px',
  padding: '0 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const DebtList = styled('ul')(() => ({
  marginTop: '8px',
}));

const Debt = styled('li')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const DeleteButton = styled('button')(() => ({
  cursor: 'pointer',
  marginLeft: '8px',
}));

const RemoveIcon = styled(Remove)(() => ({
  width: '16px',
  height: '16px',
  color: 'inherit',
}));

const CreateButton = styled('button')(() => ({
  width: '100%',
  color: '#ffffff',
  fontWeight: '700',
  padding: '9px 0',
  borderRadius: '8px',
  backgroundColor: '#ff9f49',
  cursor: 'pointer',
}));
