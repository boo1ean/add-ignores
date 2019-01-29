#!/usr/bin/env node
const assert = require('assert')
const fs = require('fs')
const path = require('path')

const ignorefilesPath = path.resolve(__dirname, 'ignorefiles')
const availableIgnorefiles = fs.readdirSync(ignorefilesPath)
const ignores = process.argv.slice(2)

ignores.forEach(target => {
	const targetName = `.${target}ignore`

	assert(
		availableIgnorefiles.indexOf(targetName) !== -1,
		`Unknown target "${target}"`)

	fs.copyFile(
		path.resolve(ignorefilesPath, targetName),
		path.resolve(process.cwd(), targetName),
		(e) => e ? console.error(e) : console.log('Created %s', targetName))
})
