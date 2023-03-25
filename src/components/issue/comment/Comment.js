import CommentForm from './CommentForm';
import moment from 'moment/moment';

import {Avatar} from '@mui/material';

const Comment = ({
  id,
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
  console.log('replies: ', comment.replies);
  // if (comment) {
  //   setCommentData(comment);
  //   console.log('setComment', comment);
  // } else console.log('setComment not done');
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === 'editing';
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === 'replying';
  if (comment) {
    var canChange = currentUserId === comment.authorId;
  }
  const canReply = Boolean(currentUserId) && !subcomment;
  const replyId = parentId ? parentId : id;

  const start = moment(comment.createdAt.toDate());
  const timepassed = moment(start, 'MM/DD/YYYY').fromNow();

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
              {/* <div className="mr-3 text-sm">
                {Date(comment.createdAt).toLocaleString('it-IT', {
                  dateStyle: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}
              </div> */}
            </div>
            {!isEditing && comment.type === 'text' && (
              <div className="text-sm mt-2 text-ellipsis overflow-hidden text-justify">
                {comment.body}
              </div>
            )}
            {!isEditing && comment.type === 'image' && (
              <div className="text-sm mt-2 text-ellipsis overflow-hidden text-justify">
                <img src={comment.body} alt={'Error displaying image from: ' + comment.body} />
              </div>
            )}
            {isEditing && (
              <CommentForm
                isAvatar={false}
                initialText={comment.body}
                handleSubmit={(text) => updateComment(text, comment.id)}
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
                {canChange && (
                  <div className="flex">
                    <div
                      className="mr-2 hover:underline font-bold"
                      onClick={() =>
                        setActiveComment({id: comment.id, type: 'editing'})
                      }
                    >
                      Edit
                    </div>
                    <div
                      className="mr-2 hover:underline font-bold"
                      onClick={() => deleteComment(comment.id)}
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            )}

            {isReplying && (
              <div className="mt-4">
                <CommentForm
                  handleSubmit={(text) => addComment(text, replyId)}
                  handleCancel={() => {
                    setActiveComment(null);
                  }}
                />
              </div>
            )}

            {/* {replies.length > 0 && (
              <div className="mt-5">
                {replies.map((reply) => (
                  <Comment
                    comment={reply}
                    key={reply.id}
                    setActiveComment={setActiveComment}
                    activeComment={activeComment}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                    addComment={addComment}
                    parentId={comment.id}
                    replies={[]}
                    currentUserId={currentUserId}
                    subcomment
                  />
                ))}
              </div>
            )} */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-5">
                {comment.replies.map((reply, index) => (
                  <Comment
                    comment={reply}
                    key={index}
                    setActiveComment={setActiveComment}
                    activeComment={activeComment}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                    addComment={addComment}
                    parentId={comment.id}
                    replies={[]}
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
