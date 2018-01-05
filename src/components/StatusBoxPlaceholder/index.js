import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import Overviewclasses from './style.scss'

const styles = theme => ({
	statusHeadline: {
		padding: '24px',
	},

})

class StatusBoxPlaceholder extends PureComponent {
	static propTypes = {
		classes: PropTypes.object.isRequired,
	}

	render() {
		const { classes } = this.props
		return (
			<Grid item xs={12} md={12} lg={4} xl={3}>
				<div className={Overviewclasses.statusBox}>
					<Paper >
						<Grid container spacing={0} >
							<Grid item xs>
								<Typography type='title' classes={{	root: classes.statusHeadline }}>
									<span className={Overviewclasses.placeholderText} />
								</Typography>
							</Grid>
						</Grid>
						<div className={Overviewclasses.placeholderIndicator} />
					</Paper>
				</div>
			</Grid>

		)
	}
}

export default withStyles(styles)(StatusBoxPlaceholder)
