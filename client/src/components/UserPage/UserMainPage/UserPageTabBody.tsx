import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserPosts from '../UserPosts/UserPosts';
import UserReviews from '../UserReviews/UserReviews';
import UserEvents from '../UserEvents/UserEvents';
import UserSurveys from '../UserSurveys/UserSurveys';
import UserTops from '../UserTops/UserTops';
import UserLists from '../UserLists/UserLists';
import UserWatchList from '../UserWatchList/UserWatchList';
import ProfileComponent from '../ProfileComponent/ProfileComponent';

type ProfileProps = {
	id: string;
	name: string;
	male: boolean;
	female: boolean;
	location: string;
	aboutMe: string;
	avatar: string;
};

const profileInfo: ProfileProps = {
	id: '7f13634d-c353-433c-98fe-ead99e1252c7',
	name: 'Sofi Dub',
	male: false,
	female: true,
	location: 'KIev',
	aboutMe: 'Give me films',
	avatar:
		'https://s3-alpha-sig.figma.com/img/919e/1a5a/da4f250d469108191ad9d4af68b2a639?Expires=1566172800&Signature=Kou41Z8bd8ig~9nLibgCH5gfaOc0K~9Io82-umabjJnomveXbPcqMWfD911bHy6h77reHT6ecNYFHCzmXkQNy3vEF-OzgJYgV875TI2rX~cPt1FaSJC5wCeybEfTrlBlCcdzSFn8iVcP~C8GTx-l6CIjyugGAhvr7xJ-hfAdlf~5Mll0Sy92dSKn8q7OkJdfsMvEEFVQ3rGHn8GGQZg1a60gif0VaQhuVX1gcRgwrsak~cerS1bnDvo93B1lFOIk85wlhY2hPwQrmCtI9A-qaAtbIxmzmxkRpuVUpDrX6Jd4hXpksbd7urSJ91Dg7tv9WzRZvIkLnPXflCfmPw~slw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
};

interface IProps {
	mainPath: string;
}

const UserPageTabs: React.SFC<IProps> = ({ mainPath }) => {
	return (
		<div className="user-tab-body">
			<Switch>
				<Route
					exact
					path={`${mainPath}`}
					render={() => (
						<ProfileComponent
							profileInfo={profileInfo}
							croppedSaved={false}
							saveCropped={() => {}}
						/>
					)}
				/>
				<Route path={`${mainPath}/posts`} component={UserPosts} />
				<Route path={`${mainPath}/reviews`} component={UserReviews} />
				<Route path={`${mainPath}/events`} component={UserEvents} />
				<Route path={`${mainPath}/surveys`} component={UserSurveys} />
				<Route path={`${mainPath}/tops`} component={UserTops} />
				<Route path={`${mainPath}/lists`} component={UserLists} />
				<Route path={`${mainPath}/watch-list`} component={UserWatchList} />
			</Switch>
		</div>
	);
};

export default UserPageTabs;
