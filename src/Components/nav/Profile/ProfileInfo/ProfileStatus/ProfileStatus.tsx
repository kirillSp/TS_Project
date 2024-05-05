import React from "react";

type PropsType = {
    updateStatus: (status: string) => void
    status: string
};
type LocalStateType = {
    editMode: boolean
    status: string
};

class ProfileStatus extends React.Component<PropsType, LocalStateType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({ editMode: true });
    }

    deactivateEditMode = () => {
        this.setState({ editMode: false });
        this.props.updateStatus(this.state.status);
    }

    onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ status: e.target.value })
    }

    componentDidUpdate(prevProps: PropsType, prevState: LocalStateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({ status: this.props.status });
        }
    }

    render() {
        return <div>{
            this.state.editMode
                ? <input onChange={this.onChangeStatus} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
                : <p onDoubleClick={this.activateEditMode}>{this.props.status}</p>
        }</div>
    }
}

export default ProfileStatus;