import { useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import { StyledFeedItem } from './StyledGridFeed';
import EditIcon from '../../asset/icon/Edit.svg';
import useEditContext from '../../hooks/useEditContext';
import useSetFeedItemLayout from './useSetFeedItemLayout';
import usePageContext from '../../hooks/usePageContext';

export default function FeedItem({ feedData }: { feedData: DocumentData }) {
  const { setFeedIdtoEdit, setIsEditModalOpen } = useEditContext();
  const { imgRatio, setRatio, setGridRowEnd } = useSetFeedItemLayout();
  const { setPrevPath, prevPath } = usePageContext();
  const { id } = useParams();

  useEffect(() => {
    setRatio(feedData.imageUrl[0]);
  }, []);

  const setEditFeedContext = (feedId: string) => {
    setFeedIdtoEdit(feedId);
    setIsEditModalOpen(true);
  };

  const showHoverStyle = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.FocusEvent<HTMLAnchorElement>,
  ) => {
    if (e.currentTarget.firstElementChild) {
      e.currentTarget.firstElementChild.className = 'hover-wrap';
    }
  };

  const hiddenHoverStyle = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.FocusEvent<HTMLAnchorElement>,
  ) => {
    if (e.currentTarget.firstElementChild) {
      e.currentTarget.firstElementChild.className = 'a11y-hidden';
    }
  };

  return (
    <>
      {imgRatio.width && imgRatio.height && (
        <StyledFeedItem
          key={feedData.id}
          ref={(node) => {
            if (node) {
              setGridRowEnd(node);
            }
          }}
        >
          <Link
            to={`/feed/${feedData.id}`}
            onMouseOver={showHoverStyle}
            onFocus={showHoverStyle}
            onMouseLeave={hiddenHoverStyle}
            onBlur={hiddenHoverStyle}
            onClick={() => setPrevPath(id || null)}
          >
            <div className="a11y-hidden">
              <strong>{feedData.title}</strong>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setEditFeedContext(feedData.id);
                }}
              >
                <img src={EditIcon} alt="수정하기" />
              </button>
            </div>
            <img src={feedData.imageUrl[0]} alt="" />
          </Link>
        </StyledFeedItem>
      )}
    </>
  );
}
