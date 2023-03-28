import {useState} from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';

import {useFirestore} from 'src/hooks/useFirestore';
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from 'src/firebase/firestoreServices';

import {Button} from '@mui/material';

const Comments = ({currentUser, issueId}) => {
  const refPath = 'issues/' + issueId + '/comments';
  const currentUserId = currentUser.uid;
  const comments = useFirestore(refPath);
  
  const [activeComment, setActiveComment] = useState(null);
  const [activeAllBtn, setActiveAllBtn] = useState(false);
  const [activeCommentBtn, setActiveCommentBtn] = useState(true);
  const [activeHistoryBtn, setActiveHistoryBtn] = useState(false);

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
    updateDocument(path, commentId, {body: text});
    setActiveComment(null);
    // });
  };

  const deleteComment = (thisId, parentId = null) => {
    // TODO
    let path = refPath;
    if (parentId) path = path + '/' + parentId + '/replies/';

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
            handleCancel={() => {
              setActiveComment(false);
            }}
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
