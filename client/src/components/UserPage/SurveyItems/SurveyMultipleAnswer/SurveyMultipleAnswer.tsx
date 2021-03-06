import React from 'react';
import './SurveyMultipleAnswer.scss';

interface IAnswer {
	questionId: string;
	optionId: string;
	value: boolean;
}

interface IReadyAnswer {
	id: string;
	question_id: string;
	option_id?: string;
	user_id: string;
	value: string;
}

interface IProps {
	questionInfo: {
		id: string;
		survey_id: string;
		title: string;
		firstLabel?: string;
		lastLabel?: string;
		type: string;
		image_link?: string;
		required: boolean;
		options?: Array<{
			index: number;
			id: string;
			question_id: string;
			value: string;
		}>;
	};
	setAnswer?: (data: IAnswer) => void;
	disable?: boolean;
	answers?: Array<IReadyAnswer>;
}

const SurveyCheckboxes = (props: IProps) => {
	const { questionInfo, disable, answers } = props;
	const { id, title, options, required, image_link } = questionInfo;

	return (
		<div className="multiple question-container">
			<p className={`survey-question required-${required}`}>{title}</p>
			{image_link && <img className="question-image" alt="" src={image_link} />}
			{options !== undefined &&
				options.map((option, i) => (
					<p key={i}>
						<label>
							<input
								type="checkbox"
								name={id}
								key={i}
								value={option.value}
								disabled={disable || false}
								checked={
									answers &&
									answers.some(answer => answer.option_id === option.id)
								}
								onChange={event => {
									if (!props.setAnswer) return;
									props.setAnswer({
										questionId: id,
										optionId: option.id,
										value: event.target.checked
									});
								}}
							/>
							<span className="checkmark"></span>
							{option.value}
						</label>
					</p>
				))}
		</div>
	);
};

export default SurveyCheckboxes;
