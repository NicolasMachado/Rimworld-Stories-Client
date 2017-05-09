import React from 'react';
import {connect} from 'react-redux';
import {fetchProfile, logOut, resetProfile, fetchUser} from '../actions';
import ProfileInfo from './profile-info';
import MyPublishedStores from './my-published-stories';
import UpdateUsername from './update-username';
import UploadImage from './upload-image';
import MyDrafts from './my-drafts';
import {buttonDisableOnLoading, buttonContent} from '../utils';

export class Profile extends React.Component {

    componentWillMount() {
        this.props.dispatch(resetProfile());
    }

    componentDidMount() {
        this.props.dispatch(fetchProfile(this.props.match.params.id));
        this.props.dispatch(fetchUser());
    }

    logOut() {
        if (!this.props.loading) {
            this.props.dispatch(logOut())
        }
    }

    render() {
        let profileInfo = '', profileTitle = '', logoutButton = '', updateUsername = '', myPublishedStories = '',
        uploadProfilePicture = '', avatar = '', myDrafts = '';
        // when profile fetched
        if (this.props.visitedProfile) {
            avatar = <div className="container col1"><img alt='' className="profile-avatar" id="profile-avatar" src={this.props.visitedProfile.avatarUrl} /></div>
            profileTitle = <div className="container col1"><h3>{this.props.visitedProfile.username}</h3></div>;
            myPublishedStories = <MyPublishedStores stories={this.props.visitedProfile.stories || []} />;
        }
        // when profile fetched AND if profile is mine
        if (this.props.visitedProfile && this.props.match.params.id === this.props.currentUser.id) {
            avatar = <UploadImage image={this.props.currentUser.avatarUrl} folder='avatars' />;
            profileTitle = <div className="container col1"><h3>{this.props.currentUser.username}</h3></div>;
            profileInfo = <ProfileInfo info={this.props.currentUser} />;
            logoutButton = <div className="container col1">
                    <div className={'button ' + buttonDisableOnLoading(this.props.loading)} onClick={e => this.logOut()}>
                        {buttonContent('Log out', this.props.loading)}
                    </div>
                </div>;
            updateUsername = <UpdateUsername />;
            myDrafts = <MyDrafts stories={this.props.currentUser.stories} />;
        }

        return (
            <div>
                {profileTitle}
                {avatar}
                {logoutButton}
                {profileInfo}
                {updateUsername}
                {uploadProfilePicture}
                {myDrafts}
                {myPublishedStories}
            </div>
        );
    }
}

export const mapStateToProps = state => (state.app);
export default connect(mapStateToProps)(Profile);
