import React from 'react';
import '../RecommendItem.scss';
import config from '../../../../config';
import Image from '../../../shared/Image/Image';

type RecommendItemProps = {
	survey: {
		id: string;
		title: string;
		image: string;
		description: string;
	};
};

const RecommendItemSurvey = ({
	survey: { id, title, image, description }
}: RecommendItemProps) => {
	return (
		<div className="recommend-item">
			<div className="recommend-item-header">
				<div className="recommend-item-header-text">
					<strong>Survey</strong>
				</div>
			</div>
			<div className="recommend-item-wrp">
				<Image
					className="recommend-item-image"
					src={image}
					defaultSrc={config.DEFAULT_SURVEY_IMAGE}
					alt="event"
				/>
			</div>
			<div className="recommend-item-info">
				<div className="recommend-item-row">
					<div className="recommend-item-name">{title}</div>
				</div>
				<div className="recommend-item-row">
					<div className="recommend-item-description">{description}</div>
				</div>
			</div>
		</div>
	);
};

export default RecommendItemSurvey;
