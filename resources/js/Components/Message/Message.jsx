import React from "react";

const Message = ({message}) => {

    console.log(message)
    return (
            <div className="max-w-2xl mx-auto bg-white rounded pl-1 m-2  ">
                <span className="mr-1.5">{message.user.name}</span>
                <small>{new Date(message.created_at).toLocaleString()}</small>
                <p className="pl-3">
                    {message.text}
                </p>
            </div>
    )
}

export default Message;