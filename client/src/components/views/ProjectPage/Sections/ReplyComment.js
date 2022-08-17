import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    let commentNumber = 0;
    useEffect(()=>{        
        props.commentLists.map((comment)=>{
            if(comment.responseTo === props.parentCommentId){
                commentNumber ++
            }
        })
        setChildCommentNumber(commentNumber)

    },[ChildCommentNumber,props.refreshFunction])
    //parentCommentId : 모든 코멘트의 id
    //commentLists : 모든 코멘트 Object불러옴. 
    const renderReplyComment = (parentCommentId) => 
        props.commentLists.map((comment, index) => (
            <>
            {
                comment.responseTo === parentCommentId &&
                <div style={{width: '80%', marginLeft:'40px'}}>
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} projectId={props.projectId} />
                    <ReplyComment refreshFunction={props.refreshFunction} commentLists={props.commentLists} projectId={props.projectId} 
                    parentCommentId={comment._id}/>
                </div>
            }
            </>
        ))
    

    const onHandlChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

  return (
    <div>
        {ChildCommentNumber > 0 && 
            <p style={{fontSize:'14px', margin: 0, color:'gray'}} onClick={onHandlChange}>
                View {ChildCommentNumber} more comment(s)
            </p>
        }

        {OpenReplyComments &&
            renderReplyComment(props.parentCommentId)
        }
    </div>
  )
}

export default ReplyComment