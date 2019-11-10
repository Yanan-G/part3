import React from 'react'

export default ({ message }) => {
	const style = {
		color: 'green',
		backgroud: 'lightgray',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}

	if (message === null) {
		return null
	}

	return <div style={style}>{message}</div>
}
