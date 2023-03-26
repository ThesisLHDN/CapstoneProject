import {useState} from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';

import {useFirestore} from 'src/hooks/useFirestore';
import {
  addDocument,
  setDocument,
  deleteDocument,
  updateDocument,
} from 'src/firebase/services';

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

const Comments = ({currentUser, issueId}) => {
  const refPath = 'issues/' + issueId + '/comments';
  const currentUserId = currentUser.uid;
  const comments = useFirestore(refPath);
  // console.log(comments);

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

  // const addCommentHandler = (text) => {};
  const addComment = (content, parentId = null) => {
    // TODO
    // console.log(issueId, content, parentId);
    const commentContent = {
      authorId: currentUser.uid,
      authorAvatar: currentUser.photoURL,
      authorName: currentUser.displayName,
      //todo check content la kieu gi
      ...content,
    };
    let path = refPath;
    if (parentId) path = path + '/' + parentId + '/replies';
    // console.log(path);

    addDocument(path, commentContent);
    setActiveComment(null);
  };

  const updateComment = (text, commentId, parentId = false) => {
    let path = refPath;
    if (parentId) {
      path = refPath + '/' + parentId + '/replies/';
    }
    console.log(path, text, commentId, parentId);
    updateDocument(path, {body: text}, commentId);

    // TODO Update comment to Firestore using setDocument
    // const updateComment = async (text) => {
    //   return {text};
    // };
    // updateComment(text).then(() => {
    //   const updatedBackendComments = backendComments.map((backendComment) => {
    //     if (backendComment.id === commentId) {
    //       return {...backendComment, body: text};
    //     }
    //     return backendComment;
    //   });
    //   setBackendComments(updatedBackendComments);
    setActiveComment(null);
    // });
  };

  const deleteComment = (thisId, parentId = null) => {
    // TODO
    let path = refPath;
    if (parentId) path = path + '/' + parentId + '/replies/';
    // console.log(parentId, thisId, path);

    if (window.confirm('Are you sure you want to remove comment?')) {
      deleteDocument(path, thisId);
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
          <CommentForm
            currentUser={currentUser}
            handleSubmit={(text) => addComment({body: text, type: 'text'})}
          />
          <div className="mt-8">
            {comments.map((comment) => (
              <Comment
                issueId={issueId}
                currentUser={currentUser}
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
