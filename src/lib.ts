import fs from "fs/promises"
import { constants, PathLike } from "fs"
import path from "path"

const exists = async (path: PathLike): Promise<boolean> => await fs.access(path, constants.R_OK || constants.W_OK)
	.then(() => true)
	.catch(() => false)

export default async function run(directory: string) {

	const packageJSON = path.join(directory, "./package.json")

	if (!await exists(packageJSON)) {
		return
	}

	const data = JSON.stringify(fs.readFile(packageJSON)) as any

	const entryPoint = data?.main

	console.log(entryPoint)
}