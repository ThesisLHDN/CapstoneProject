import {useMemo, useState} from 'react';
import CommentForm from './CommentForm';
import moment from 'moment/moment';

import {Avatar, Box, CircularProgress, Typography} from '@mui/material';
import {useFirestore} from 'src/hooks/useFirestore';

// import {addDocument, setDocument} from 'src/firebase/services';

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
  const [expand, setExpand] = useState(false);
  const repliesConditions = useMemo(
    () => ({
      fieldName: 'parentId',
      operator: '==',
      compareValue: comment.id,
      sort: 'desc',
      sortAttr: 'createdAt',
    }),
    // TODO
    [parentId],
  );
  const repliesPath = 'issues/' + issueId + '/replies';
  const rawReplies = useFirestore(repliesPath, repliesConditions);

  const authorIds = rawReplies ? rawReplies.map((rep) => rep.authorId) : [];
  const authorCondition = useMemo(
    () => ({fieldName: 'uid', operator: 'in', compareValue: authorIds}),
    [],
  );
  const authors = useFirestore('users', authorCondition);
  const replies =
    rawReplies && authors
      ? rawReplies.map((comment) => {
          const author = authors.find(
            (author) => author.uid === comment.authorId,
          );
          return {
            ...comment,
            authorName: author.displayName,
            authorAvatar: author.photoURL,
          };
        })
      : [];

  // console.log(replies);
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
  const canReply = Boolean(currentUserId) && !subcomment;

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
                    <Box
                      sx={{
                        border: 'solid black 1px',
                        borderRadius: 5,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        '&:hover': {
                          '& .imgContainer': {display: 'block'},
                        },
                        '&:hover .imgContainer': {
                          display: 'block',
                        },
                        ...(!expand && {maxHeight: 400}),
                      }}
                      onClick={() => setExpand(!expand)}
                    >
                      {' '}
                      <Box
                        className={'imgContainer'}
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#00000080',
                          display: 'none',
                        }}
                      >
                        <Typography
                          sx={{
                            width: '100%',
                            height: '100%',
                            textAlign: 'center',
                            paddingTop: '200px',
                            fontWeight: 'bold',
                            color: 'white',
                          }}
                        >
                          {expand ? 'Click to hide' : 'Click to expand'}
                        </Typography>
                      </Box>{' '}
                      <img
                        src={comment.file.downloadURL}
                        alt={'Error displaying image from: ' + comment.body}
                      ></img>
                    </Box>
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

            {isEditing && (
              <CommentForm
                currentUser={currentUser}
                isAvatar={false}
                initialText={comment.body}
                handleSubmit={(newComment) =>
                  updateComment(
                    newComment,
                    comment.id,
                    subcomment ? parentId : null,
                    // TODO replace with firestore doc id
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
                      // onClick={() =>
                      //   subcomment
                      //     ? deleteComment(comment.id, parentId)
                      //     : deleteComment(comment.id)
                      // }
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
            {!subcomment && replies && replies.length > 0 && (
              <div className="mt-5">
                {replies.map((reply, index) => (
                  <Comment
                    issueId={issueId}
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
        <CircularProgress />
      )}
    </div>
  );
};

export default Comment;
