import React, { useState, useRef, useEffect } from 'react';

import { DraggerContainer, BoxContainer } from './styles';

type Props = {
  children: React.ReactNode;
};
const Dragger: React.FC<Props> = ({ children }) => {
  const [styles, setStyles] = useState<object>({});
  const [diffX, setDiffX] = useState<number | null>(0);
  const [diffY, setDiffY] = useState<number | null>(0);
  const [dragging, SetDragging] = useState<boolean>(false);
  const box = useRef<HTMLInputElement>();
  //window의 리사이즈에 대비) 리사이즈 후에 박스가 바깥쪽에 있는경우를 대비하여 리사이즈 할 때마다 style값을 초기화해줌
  useEffect(() => {
    window.addEventListener('resize', () => {
      setStyles({});
    });
  }, []);
  const dragStart = (e: React.MouseEvent) => {
    //원안에 마우스 클릭시 드레그 시작
    e.preventDefault();
    setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left);
    setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top);
    SetDragging(true);
  };
  const dragEnd = (e: React.MouseEvent) => {
    //원안에 마우스 다시 클릭시 드레그 끝
    SetDragging(false);
  };

  const valueCompare = (newValue: number, max: number): number => {
    if (newValue < 0) {
      return -1;
    } else if (newValue > max) {
      return 1;
    } else {
      return 0;
    }
  };
  //원 밖에서도 드레그 할 수 있도록 원 상위 요소에 moving 이벤트 위치
  const moving = (e: React.MouseEvent) => {
    if (dragging) {
      //드레그에 의해 계산된 left, top 값
      const leftValue = e.screenX - diffX;
      const topValue = e.screenY - diffY;
      //벗어나면 안되는 최대 위치값
      const maxHeight = window.innerHeight - box.current.offsetHeight;
      const maxWidth = window.innerWidth - box.current.offsetWidth;
      //윈도우 창안에 위치해 있는 지 검사.
      //ex) top 위치가 마이너스 값이면 -1, 정상 위치면 0, 아래로 벗어났으면 1
      const widthCompare = valueCompare(leftValue, maxWidth);
      const heightCompare = valueCompare(topValue, maxHeight);

      //자연스러운 움직임을 위해서 마우스가 윈도우 안에 있는 경우와 없는 경우를 모두 고려.
      //ex)마우스 x좌표는 윈도우 창 안쪽인데, y좌표는 윈도우에서 벗어나 있다면 x 좌표만 바뀌고 y좌표는 윈도우 창 끝에 위치
      if (widthCompare === 0 && heightCompare === 0) {
        setStyles({
          top: topValue,
          left: leftValue,
        });
      } else if (widthCompare === -1) {
        setStyles({
          ...styles,
          left: 0,
        });
      } else if (widthCompare === 1) {
        setStyles({
          ...styles,
          left: maxWidth,
        });
      } else if (heightCompare === -1) {
        setStyles({
          ...styles,
          top: 0,
        });
      } else if (heightCompare === 1) {
        setStyles({
          ...styles,
          top: maxHeight,
        });
      }
    }
  };

  return (
    <DraggerContainer onMouseMove={moving}>
      <BoxContainer
        className='drag-box'
        style={styles}
        onMouseDown={dragStart}
        onMouseUp={dragEnd}
        ref={box}
      >
        {children}
      </BoxContainer>
    </DraggerContainer>
  );
};
export default Dragger;
