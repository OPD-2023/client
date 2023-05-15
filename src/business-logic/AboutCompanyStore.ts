import {inject, injectable} from "inversify";
import {makeObservable, observable, runInAction} from "mobx";

import HistoryData from "@models/HistoryData";
import Partner from "@models/Partner";
import Direction from "@models/Direction";
import Service from "@models/Service";
import ApiClient from "@api/client";

@injectable()
export default class AboutCompanyStore {
    @observable
    directions: Direction[] = []
    @observable
    services: Service[] = []
    @observable
    historyData: HistoryData[] = []
    @observable
    partners: Partner[] = []
    @observable
    areDirectionsLoading: boolean = false
    @observable
    areServicesLoading: boolean = false
    @observable
    isHistoryDataLoading: boolean = false
    @observable
    arePartnersLoading: boolean = false

    constructor(@inject(ApiClient) private readonly api: ApiClient) {
        makeObservable(this)
    }

    fetchDirections = async () => {
        this.areDirectionsLoading = true
        try {
            const directions = await this.api.get<Direction[]>("directions")
            console.log(directions)
            runInAction(() => {
                this.directions = directions
            })
        } catch {
            // TODO: добавить обработку ошибок через контроллер
        } finally {
            this.areDirectionsLoading = false
        }
    }

    fetchServices = async () => {
        this.areServicesLoading = true
        try {
            const services = await this.api.get<Service[]>("services")
            runInAction(() => {
                this.services = services
            })
        } catch {
            // TODO: добавить обработку ошибок через контроллер
        } finally {
            this.areServicesLoading = false
        }
    }

    fetchHistory = async () => {
        this.isHistoryDataLoading = true
        try {
            const historyData = await this.api.get<HistoryData[]>("history")
            console.log(historyData)
            runInAction(() => {
                this.historyData = historyData
            })
        } catch {
            // TODO: добавить обработку ошибок через контроллер
        } finally {
            this.isHistoryDataLoading = false
        }
    }

    fetchPartners = async () => {
        this.arePartnersLoading = true
        try {
            const partners = await this.api.get<Partner[]>("partners")
            console.log(partners)
            runInAction(() => {
                this.partners = partners
            })
        } catch {
            // TODO: добавить обработку ошибок через контроллер
        } finally {
            this.arePartnersLoading = false
        }
    }
}