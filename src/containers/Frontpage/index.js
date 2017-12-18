import React, { PureComponent } from 'react'

import logo from './logo.png'
import classes from './style.scss'

export default class Frontpage extends PureComponent {
	render() {
		return (
			<div className={classes.wrapper}>
				<h1>h1 rect react!</h1>
				<img src={logo} alt='zenziot' />
				<a href='#'>LINK!</a>
			</div>
		)
	}
}
