import {useState, useContext} from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';

import {useFirestore, useFirestoreDoc} from 'src/hooks/useFirestore';
import {AuthContext} from 'src/Context/AuthProvider';

import {Button} from '@mui/material';
// const comments = [
//   {
//     id: '1',
//     body: 'Ad dolore elit reprehenderit do id excepteur officia qui officia aute cillum nulla laborum ipsum. Exercitation velit elit do mollit. Velit mollit cupidatat qui aute ea laborum proident non ad sit exercitation et. Exercitation proident minim sint do excepteur. Proident ex duis elit et commodo nulla.',
//     username: 'Lam Nguyen',
//     userId: '1',
//     parentId: null,
//     createdAt: '2021-08-16T23:00:33.010+02:00',
//   },
//   {
//     id: '2',
//     body: 'Second comment',
//     username: 'Dang Nguyen',
//     userId: '2',
//     parentId: null,
//     createdAt: '2021-08-16T23:00:33.010+02:00',
//   },
//   {
//     id: '3',
//     body: 'First comment first child',
//     username: 'Lam Nguyen',
//     userId: '1',
//     parentId: '1',
//     createdAt: '2022-08-16T23:00:33.010+02:00',
//   },
//   {
//     id: '4',
//     body: 'Second comment second child',
//     username: 'Dang Nguyen',
//     userId: '2',
//     parentId: '2',
//     createdAt: '2022-12-11T23:00:33.010+02:00',
//   },
// ];

const Comments = ({currentUserId, issueId}) => {
  const comments = useFirestore('issues/' + issueId + '/comments');

  const [backendComments, setBackendComments] = useState(comments);
  const [activeComment, setActiveComment] = useState(null);
  const [activeAllBtn, setActiveAllBtn] = useState(false);
  const [activeCommentBtn, setActiveCommentBtn] = useState(true);
  const [activeHistoryBtn, setActiveHistoryBtn] = useState(false);

  // const getReplies = (commentId) =>
  //   backendComments
  //     .filter((backendComment) => backendComment.parentId === commentId)
  //     .sort(
  //       (a, b) =>
  //         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  //     );

  const addComment = (text, parentId) => {
    const createComment = async (text, parentId = null) => {
      return {
        body: text,
        parentId,
        userId: currentUserId,
        username: 'John',
        createdAt: new Date().toISOString(),
      };
    };
    createComment(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    const updateComment = async (text) => {
      return {text};
    };
    updateComment(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return {...backendComment, body: text};
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    const deleteComment = async () => {
      return {};
    };
    // if (window.confirm("Are you sure you want to remove comment?"))
    {
      deleteComment().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId,
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  return (
    <div className="mt-4">
      {comments && (
        <div className="flex mb-8">
          <Button
            style={{
              display: 'flex',
              textTransform: 'none',
              height: 32,
              borderRadius: 4,
              marginRight: 10,
              color: !activeAllBtn ? 'black' : 'white',
              backgroundColor: !activeAllBtn ? '#EFEFEF' : '#686868',
            }}
            onClick={() => {
              setActiveAllBtn(true);
              setActiveCommentBtn(false);
              setActiveHistoryBtn(false);
            }}
          >
            All
          </Button>
          <Button
            style={{
              display: 'flex',
              textTransform: 'none',
              height: 32,
              borderRadius: 4,
              marginRight: 10,
              color: !activeCommentBtn ? 'black' : 'white',
              backgroundColor: !activeCommentBtn ? '#EFEFEF' : '#686868',
            }}
            onClick={() => {
              setActiveAllBtn(false);
              setActiveCommentBtn(true);
              setActiveHistoryBtn(false);
            }}
          >
            Comment
          </Button>
          <Button
            style={{
              display: 'flex',
              textTransform: 'none',
              height: 32,
              borderRadius: 4,
              marginRight: 10,
              color: !activeHistoryBtn ? 'black' : 'white',
              backgroundColor: !activeHistoryBtn ? '#EFEFEF' : '#686868',
            }}
            onClick={() => {
              setActiveAllBtn(false);
              setActiveCommentBtn(false);
              setActiveHistoryBtn(true);
            }}
          >
            History
          </Button>
        </div>
      )}

      {activeCommentBtn ? (
        <div>
          <CommentForm handleSubmit={addComment} />
          <div className="mt-8">
            {comments.map((comment) => (
              <Comment
                id={comment.id}
                key={comment.id}
                comment={comment}
                // replies={getReplies(comment.id)}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}
                deleteComment={deleteComment}
                updateComment={updateComment}
                currentUserId={currentUserId}
              />
            ))}
            {/* {rootComments.map((rootComment) => (
              <Comment
                key={rootComment.id}
                comment={rootComment}
                replies={getReplies(rootComment.id)}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}
                deleteComment={deleteComment}
                updateComment={updateComment}
                currentUserId={currentUserId}
              />
            ))} */}
          </div>
        </div>
      ) : activeAllBtn ? (
        <div></div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Comments;
