import React from 'react';
import './AdvancedSearchCheckboxBlock.scss';

type AdvancedSearchvaluesProps = {
	values: string[];
	checkboxHandler: (genre: string) => void;
	header: string;
	onCastSearch?: (search: string) => void;
};

type AdvancedSearchCheckboxBlockState = {
	valuesSearchValue: string;
	avaliableValues: string[];
};

class AdvancedSearchCheckboxBlock extends React.Component<
	AdvancedSearchvaluesProps,
	AdvancedSearchCheckboxBlockState
> {
	constructor(props) {
		super(props);
		this.state = {
			valuesSearchValue: '',
			avaliableValues: this.props.values
		};
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.generateValuesCheckbox = this.generateValuesCheckbox.bind(this);
	}

	handleSearchChange = e => {
		const filteredValues = this.props.values.filter(el =>
			el.toLowerCase().includes(e.target.value.toLowerCase().trim())
		);
		this.setState({
			avaliableValues: filteredValues,
			valuesSearchValue: e.target.value
		});
	};

	generateValuesCheckbox = (values: string[]) => {
		const valuesArray = values.map((el, index) => {
			return (
				<label key={index} className="container-checkbox">
					{el}
					<input
						onChange={() => {
							this.props.checkboxHandler(el);
						}}
						type="checkbox"
						value={el}
					/>
					<span className="checkmark-checkbox" />
				</label>
			);
		});
		return valuesArray;
	};

	render() {
		return (
			<div className="advanced-movie-search-block">
				<div className="checkbox-header">{this.props.header}</div>
				<input
					type="text"
					value={this.state.valuesSearchValue}
					onChange={this.handleSearchChange}
					className="checkbox-input"
					placeholder={`Search for a ${this.props.header}`}
				/>
				<div className="checkbox-block">
					{this.generateValuesCheckbox(this.state.avaliableValues)}
				</div>
			</div>
		);
	}
}

export default AdvancedSearchCheckboxBlock;
