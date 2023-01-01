import React from "react";

const Notification = ({message, color}) => {

    if (message !== null) {
        const NotificationStyle = {
            border: `5px solid ${color}`,
            backgroundColor: '#d3d3d3',
            paddingLeft: 10,
            color: `${color}`,
            fontSize: '2rem'
        }
    
        return (
            <div style={NotificationStyle}>
                {message}
            </div>
        )
    }
}

export default Notification