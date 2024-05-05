import React, { FC } from "react";

type TProps = {
	message: string
}

const Messages: FC<TProps> = (props) => {
	return (
		<div className="message">
			{props.message}
		</div>
	);
};

export default Messages;