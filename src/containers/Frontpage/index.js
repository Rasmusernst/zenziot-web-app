import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'

import { actions as frontPageActions } from '../../stores/Frontpage'

@connect(({ Frontpage }) => ({ Frontpage }), frontPageActions)

export default class Frontpage extends PureComponent {
	static propTypes = {
		Frontpage: PropTypes.object.isRequired,
		setPageName: PropTypes.func.isRequired,
	}

	componentDidMount() {
		this.props.setPageName()
	}

	state = {
		open: false,
	}

handleDrawerOpen = () => { this.setState({ open: true }) }

handleDrawerClose = () => { this.setState({ open: false }) }

	@autobind handlesetPageName() { this.props.setPageName('HEJ') }

	render() {
		const { Frontpage } = this.props

		return (
			<Grid container spacing={24}>

				<Grid item xs={12}>
					<Typography type='headline' gutterBottom>
						{Frontpage.pageName}
					</Typography>
				</Grid>

				<Grid item xs={12} md={4}>
					<Paper elevation={2}>
						<Typography type='body1' gutterBottom >
							sdgkl jsdkgj klsdfgj klsdjfgkl sdfgkl sjdgkl jsdklgj skldgj klsgj klsdfjg klsdjg klsjdfgkl sjdgkl sdfklg kls
						</Typography>
						<Button raised color='primary' onClick={this.handlesetPageName}>
								HEJ!
						</Button>
					</Paper>
				</Grid>

				<Grid item xs={12} md={4}>
					<Paper elevation={2}>
						<Typography type='body1' gutterBottom >
							sdgkl jsdkgj klsdfgj klsdjfgkl sdfgkl sjdgkl jsdklgj skldgj klsgj klsdfjg klsdjg klsjdfgkl sjdgkl sdfklg kls
						</Typography>
						<Button raised color='default' onClick={this.handlesetPageName}>
								HEJ!
						</Button>
					</Paper>
				</Grid>

				<Grid item xs={12} md={4}>
					<Paper elevation={2}>
						<Typography type='body1' gutterBottom >
							sdgkl jsdkgj klsdfgj klsdjfgkl sdfgkl sjdgkl jsdklgj skldgj klsgj klsdfjg klsdjg klsjdfgkl sjdgkl sdfklg kls
						</Typography>
						<Button raised color='primary' onClick={this.handlesetPageName}>
								HEJ!
						</Button>
					</Paper>
				</Grid>

				<Grid item xs={12} >
					<Grid container justify='flex-end' alignItems='flex-end' >
						<Button fab color='accent' aria-label='add'>
							<Icon className='material-icons' >add</Icon>
						</Button>
					</Grid>
				</Grid>

			</Grid>
		)
	}
}

// <img src={logo} alt='zenziot' />
