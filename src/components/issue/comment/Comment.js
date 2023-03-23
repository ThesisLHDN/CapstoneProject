import CommentForm from "./CommentForm";
import { Avatar } from "@mui/material";
import moment from "moment/moment";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {

  const isEditing = activeComment && activeComment.id === comment.id && activeComment.type === "editing";
  const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === "replying";
  const canChange = currentUserId === comment.userId;
  const canReply = Boolean(currentUserId);
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const timepassed = moment(createdAt, "MM/DD/YYYY").fromNow();

  return (
    <div key={comment.id} className="flex mb-5">
      {/* {console.log(createdAt)}
      {console.log(timepassed)} */}
      <Avatar
        src="X"
        sx={{ width: 40, height: 40, backgroundColor: "#8993A4", marginRight: 1 }}
        alt={comment.username}
      />
      <div className="w-full">
        <div className="flex">
          <div className="mr-3 text-sm font-bold">{comment.username}</div>
          <div className="mr-3 text-sm">{timepassed}</div>
        </div>
        {!isEditing && <div className="text-sm mt-2 text-ellipsis overflow-hidden text-justify">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            isAvatar={false}
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {setActiveComment(null)}}
          />
        )}

        {!isEditing &&
        <div className="flex text-sm cursor-pointer mt-2">
          {canReply && (
            <div
              className="mr-2 hover:underline font-bold"
              onClick={() => setActiveComment({ id: comment.id, type: "replying" })}
            >
              Reply
            </div>
          )}
          {canChange && (
            <div className="flex">
              <div
                className="mr-2 hover:underline font-bold"
                onClick={() => setActiveComment({ id: comment.id, type: "editing" })}
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
        </div>}

        {isReplying && (
          <div className="mt-4">
          <CommentForm
            handleSubmit={(text) => addComment(text, replyId)}
            handleCancel={() => {setActiveComment(null);}}
          />
          </div>
        )}
        
        {replies.length > 0 && (
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;