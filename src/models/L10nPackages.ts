import Locale from "@models/Locale"
import type L10nPackage from "@models/L10nPackage"

type L10nPackages = { [key in Locale]: L10nPackage }

export default L10nPackages
