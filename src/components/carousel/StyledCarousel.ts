import styled from 'styled-components';

const SlideImgWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  ul {
    height: 100%;
    display: flex;
    aspect-ratio: 1/1;
  }

  li {
    width: 100%;
    flex-shrink: 0;
    background-color: var(--gray-900);

    img {
      object-fit: contain;
    }
  }

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: content-box;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    padding: 4px 3.5px 4px 4.5px;
  }

  .ArrowBack {
    left: 8px;
    transform: translateY(-50%) rotate(180deg);
  }

  .ArrowRight {
    right: 8px;
    padding: 4px 3.5px 4px 4.5px;
  }
`;

const IndicatorList = styled.ul`
  width: 100%;
  margin-top: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IndicatorProps {
  active: boolean;
}

const IndicatorItem = styled.li<IndicatorProps>`
  width: 0.6rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? 'var(--gray-900)' : 'var(--gray-300)'};
  display: flex;
  gap: 2rem;
  margin-right: 0.6rem;
`;

export { SlideImgWrap, IndicatorList, IndicatorItem };
