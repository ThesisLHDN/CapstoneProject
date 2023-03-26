import CommentForm from './CommentForm';
import moment from 'moment/moment';

import {Avatar} from '@mui/material';
import {useFirestore} from 'src/hooks/useFirestore';

import {addDocument, setDocument} from 'src/firebase/services';

const Comment = ({
  issueId,
  currentUser,
  comment,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
  subcomment = false,
}) => {
  // if (comment) {
  //   setCommentData(comment);
  //   console.log('setComment', comment);
  // } else console.log('setComment not done');
  const repliesPath =
    'issues/' + issueId + '/comments/' + comment.id + '/replies';
  const replies = useFirestore(repliesPath);

  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === 'editing';
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === 'replying';
  const canEdit = currentUserId === comment.authorId && comment.type === 'text';
  const canDelete = currentUserId === comment.authorId;
  const canReply = Boolean(currentUserId) && !subcomment;
  // const replyId = parentId ? parentId : id;

  // const start = moment(comment.createdAt.toDate());
  // const timepassed = moment(start, 'MM/DD/YYYY').fromNow();
  const timepassed = '';

  const addCommentHandler = (text) => {
    const commentData = {
      body: text,
      type: 'text',
    };
    addComment(commentData, comment.id);
  };

  return (
    <div>
      {comment ? (
        <div className="flex mb-5">
          <Avatar
            src={comment.authorAvatar}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: '#8993A4',
              marginRight: 1,
            }}
            alt={comment.authorName}
          />
          <div className="w-full">
            <div className="flex">
              <div className="mr-3 text-sm font-bold">{comment.authorName}</div>
              <div className="mr-3 text-sm">{timepassed}</div>
            </div>
            {!isEditing && comment.type === 'text' && (
              <div className="text-sm mt-2 text-ellipsis overflow-hidden text-justify">
                {comment.body}
              </div>
            )}
            {!isEditing && comment.type === 'image' && (
              <div className="text-sm mt-2 text-ellipsis overflow-hidden text-justify">
                <img
                  src={comment.body}
                  alt={'Error displaying image from: ' + comment.body}
                />
              </div>
            )}
            {isEditing && (
              <CommentForm
                currentUser={currentUser}
                isAvatar={false}
                initialText={comment.body}
                handleSubmit={(text) =>
                  updateComment(
                    text,
                    comment.id,
                    subcomment ? parentId : null, // TODO replace with firestore doc id
                  )
                }
                handleCancel={() => {
                  setActiveComment(null);
                }}
              />
            )}

            {!isEditing && (
              <div className="flex text-sm cursor-pointer mt-2">
                {canReply && (
                  <div
                    className="mr-2 hover:underline font-bold"
                    onClick={() =>
                      setActiveComment({id: comment.id, type: 'replying'})
                    }
                  >
                    Reply
                  </div>
                )}

                <div className="flex">
                  {canEdit && (
                    <div
                      className="mr-2 hover:underline font-bold"
                      onClick={() =>
                        setActiveComment({id: comment.id, type: 'editing'})
                      }
                    >
                      Edit
                    </div>
                  )}
                  {canDelete && (
                    <div
                      className="mr-2 hover:underline font-bold"
                      onClick={() =>
                        subcomment
                          ? deleteComment(comment.id, parentId)
                          : deleteComment(comment.id)
                      }
                    >
                      Delete
                    </div>
                  )}
                </div>
              </div>
            )}

            {isReplying && (
              <div className="mt-4">
                <CommentForm
                  currentUser={currentUser}
                  handleSubmit={addCommentHandler}
                  handleCancel={() => {
                    setActiveComment(null);
                  }}
                />
              </div>
            )}
            {replies && replies.length > 0 && (
              <div className="mt-5">
                {replies.map((reply, index) => (
                  <Comment
                    comment={{index, ...reply}}
                    key={index}
                    setActiveComment={setActiveComment}
                    activeComment={activeComment}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                    addComment={addComment}
                    parentId={comment.id}
                    currentUserId={currentUserId}
                    subcomment
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default Comment;
