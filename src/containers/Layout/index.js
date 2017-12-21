import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { withRouter } from 'react-router'
import Paper from 'material-ui/Paper'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'

@withRouter
export default class Layout extends PureComponent {
	static propTypes = {
		router: PropTypes.object.isRequired,
		children: PropTypes.element.isRequired,
	}

	@autobind handleShowFrontpage() { this.props.router.push('/') }
	@autobind handleShowOverview() { this.props.router.push('/About') }

	render() {
		const { children } = this.props
		return (
			<div>
				<Paper >
					<Drawer width={200}	type='persistent'	anchor='left' open elevation={4}>
						<List >
							<Button raised color='primary' onClick={this.handleShowFrontpage}>
									Forside
							</Button>
							<Button raised color='primary' onClick={this.handleShowOverview}>
									Underside
							</Button>
						</List>
						<Divider />
					</Drawer>
				</Paper>
				{children}
			</div>
		)
	}
}
