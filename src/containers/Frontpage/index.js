import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

import { actions as frontPageActions } from '../../stores/Frontpage'

import logo from './logo.png'
import classes from './style.scss'

@connect(({ Frontpage }) => ({ Frontpage }), frontPageActions)

export default class Frontpage extends PureComponent {
	static propTypes = {
		Frontpage: PropTypes.object.isRequired,
		setPageName: PropTypes.func.isRequired,
	}

	componentDidMount() {
		this.props.setPageName()
	}
	@autobind handlesetPageName() { this.props.setPageName('HEJ') }

	render() {
		const { Frontpage } = this.props

		return (
			<div className={classes.wrapper}>
				<h1>{Frontpage.pageName}</h1>
				<img src={logo} alt='zenziot' />
				<a href='#' onClick={this.handlesetPageName}>Change page name to HEJ</a>
			</div>
		)
	}
}
