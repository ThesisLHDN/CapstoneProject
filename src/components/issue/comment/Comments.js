import { useMemo, useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';

import { useFirestore } from 'src/hooks/useFirestore';
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from 'src/firebase/firestoreServices';

const Comments = ({currentUser, issueId}) => {
  const [issuePath, setIssuePath] = useState(`issues/${issueId}`);

  useEffect(() => {
    const issuePath = `issues/${issueId}`;
    setIssuePath(issuePath);
  }, [issueId]);

  const refPath = 'issues/' + issueId;
  const currentUserId = currentUser.uid;
  const commentsCodition = useMemo(
    () => ({
      sort: 'desc',
      sortAttr: 'createdAt',
    }),
    [issueId],
  );
  const comments = useFirestore(issuePath + '/comments', commentsCodition);
  console.log(refPath + '/comments');

  const [activeComment, setActiveComment] = useState(null);
  const [activeAllBtn, setActiveAllBtn] = useState(false);
  const [activeCommentBtn, setActiveCommentBtn] = useState(true);

  const addComment = (content, parentId = null) => {
    // TODO
    const commentContent = {
      authorId: currentUser.uid,
      authorAvatar: currentUser.photoURL,
      authorName: currentUser.displayName,
      parentId: parentId,
      ...content,
    };
    const path = parentId ? `${refPath}/replies` : `${refPath}/comments`;
    // if (parentId) path = `${path}/replies`;

    addDocument(path, commentContent);
    setActiveComment(null);
  };

  const updateComment = (newComment, commentId, parentId = false) => {
    const path = parentId ? `${refPath}/replies` : `${refPath}/comments`;

    console.log(path, newComment, commentId, parentId);
    updateDocument(path, commentId, newComment);
    setActiveComment(null);
    // });
  };

  const deleteComment = (comment) => {
    const thisId = comment.id;
    const parentId = comment.parentId;
    // TODO
    const path = parentId ? `${refPath}/replies` : `${refPath}/comments`;

    if (window.confirm('Are you sure you want to remove comment?')) {
      deleteDocument(path, comment);
    }
  };

  return (
    <div className="mt-4">
      {activeCommentBtn ? (
        <div>
          <CommentForm
            currentUser={currentUser}
            handleSubmit={(newComment) => addComment(newComment)}
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
