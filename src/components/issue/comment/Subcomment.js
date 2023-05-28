import CommentForm from './CommentForm';
import moment from 'moment/moment';

import {Avatar, CircularProgress, Typography} from '@mui/material';

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
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === 'editing';
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === 'replying';
  const canEdit = currentUserId === comment.authorId;
  const canDelete = currentUserId === comment.authorId;

  var timepassed = '';
  if (comment.createdAt) {
    const start = moment(comment.createdAt.toDate());
    timepassed = moment(start, 'MM/DD/YYYY').fromNow();
  }

  const addCommentHandler = (newComment) => {
    const commentData = {
      ...newComment,
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
            {!isEditing && (
              <div className="text-sm mt-2 text-ellipsis overflow-hidden text-justify">
                <Typography sx={{mb: 1}}>{comment.body}</Typography>

                {comment.file &&
                  ((comment.file.type.split('/')[0] === 'image' && (
                    <img
                      src={comment.file.downloadURL}
                      alt={'Error displaying image from: ' + comment.body}
                    />
                  )) ||
                    (comment.file.type.split('/')[0] === 'video' && (
                      <video controls>
                        <source
                          type={comment.file.type}
                          src={comment.file.downloadURL}
                        ></source>
                      </video>
                    )))}
              </div>
            )}

            {!isEditing && (
              <div className="flex text-sm cursor-pointer mt-2">
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
                      onClick={() => deleteComment(comment)}
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
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Comment;
