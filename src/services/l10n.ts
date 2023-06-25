import { inject, injectable } from "inversify"
import type L10nConfig from "@models/L10nConfig"
import type L10nPackages from "@models/L10nPackages"
import type L10nPackage from "@models/L10nPackage"
import DIContainerToken from "@models/DIContainerToken"

@injectable()
export default class L10n {
    constructor(@inject(DIContainerToken.L10N_PACKAGES) private readonly packages: L10nPackages,
                @inject(DIContainerToken.L10N_CONFIG) private readonly config: L10nConfig) {
    }

    get currentPackage(): L10nPackage {
        return this.packages[this.config.l10n];
    }
}
