import React, { FC } from "react";
type TProps = {
	message: string
}


const Messages: FC<TProps> = (props) => {
	return (
		<div>
			<span><img src="#" /></span>
			{props.message}
		</div>
	);
};

export default Messages;