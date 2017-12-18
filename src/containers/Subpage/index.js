import React, { PureComponent } from 'react'

import logo from './logo.png'
import classes from './style.scss'

export default class Subpage extends PureComponent {
	render() {
		return (
			<div className={classes.wrapper}>
				<h1>Le Subpage!</h1>
				<img src={logo} alt='zenziot' />
				<a href='#'>Le LINK!</a>
			</div>
		)
	}
}
